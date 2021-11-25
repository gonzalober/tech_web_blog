variable "region" {
  default = "us-east-1"
}
provider "aws" {
  region = "us-east-1"
}
resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "Terraform VPC"
  }
}
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id
}
resource "aws_subnet" "pub_subnet_adgb" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.1.0/24"
}
resource "aws_route_table" "public_adgb" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}
resource "aws_route_table_association" "route_table_association_adgb" {
  subnet_id      = aws_subnet.pub_subnet_adgb.id
  route_table_id = aws_route_table.public_adgb.id
}
resource "aws_security_group" "ecs_sg_adgb" {
  vpc_id = aws_vpc.vpc.id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "rds_sg-adgb" {
  vpc_id = aws_vpc.vpc.id
  ingress {
    protocol        = "tcp"
    from_port       = 3306
    to_port         = 3306
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.ecs_sg_adgb.id]
  }
  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
data "aws_iam_policy_document" "ecs_agent_adgb" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
# resource "aws_iam_role" "ecs_agent_adgb" {
#   name               = "ecs-agent"
#   assume_role_policy = jsonencode({ Version : "2012-10-17", Statement : [{ Effect : "Allow", Action : ["ecr:*", "cloudtrail:LookupEvents"], Resource : "*" }, { Effect : "Allow", Action : ["iam:CreateServiceLinkedRole"], Resource : "*", Condition : { StringEquals : { "iam:AWSServiceName" : ["replication.ecr.amazonaws.com"] } } }] })
# }
# resource "aws_iam_role_policy_attachment" "ecs_agent_adgb" {
#   role       = "aws_iam_role.ecs_agent.name"
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
# }
# resource "aws_iam_instance_profile" "ecs_agent_adgb" {
#   name = "ecs-agent"
#   role = aws_iam_role.ecs_agent_adgb.name
# }
resource "aws_launch_configuration" "ecs_launch_config_adgb" {
  image_id        = "ami-0a01a5636f3c4f21c"
  security_groups = [aws_security_group.ecs_sg_adgb.id]
  user_data       = "#!/bin/bash\necho ECS_CLUSTER=my-cluster >> /etc/ecs/ecs.config"
  instance_type   = "t2.micro"
}
resource "aws_autoscaling_group" "failure_analysis_ecs_asg_adgb" {
  name                 = "asg-adgb"
  vpc_zone_identifier  = [aws_subnet.pub_subnet_adgb.id]
  launch_configuration = aws_launch_configuration.ecs_launch_config_adgb.name
  desired_capacity          = 2
  min_size                  = 1
  max_size                  = 10
  health_check_grace_period = 300
  health_check_type         = "EC2"
}
resource "aws_ecr_repository" "adamgonzalo" {
  name = "adamgonzalo"
}
resource "aws_ecs_cluster" "ecs_cluster_adgb" {
  name = "adam-gonzalo-cluster"
}
resource "aws_ecs_task_definition" "task_definition_adgb" {
  family = "adamgonzalo"
  container_definitions = jsonencode([
    {
      "essential" : true,
      "memory" : 512,
      "name" : "adamgonzalo",
      "cpu" : 2,
      "image" : "603825719481.dkr.ecr.eu-west-1.amazonaws.com/adamgonzalo:latest",
      "environment" : []
    }
  ])
}
resource "aws_ecs_service" "adamgonzalo" {
  name            = "adamgonzalo"
  cluster         = aws_ecs_cluster.ecs_cluster_adgb.id
  task_definition = aws_ecs_task_definition.task_definition_adgb.arn
  desired_count   = 2
}
output "ecr_repository_worker_endpoint" {
  value = aws_ecr_repository.adamgonzalo.repository_url
}