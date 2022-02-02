data "aws_ami" "image" {
  most_recent = true
  filter {
    name   = "name"
    values = ["amzn-ami*amazon-ecs-optimized"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["amazon", "self"]
}

resource "aws_launch_configuration" "template" {
  name                 = "${var.name}-launch-config"
  image_id             = data.aws_ami.image.id
  instance_type        = "t2.micro"
  iam_instance_profile = aws_iam_instance_profile.ecs.name
  security_groups      = [aws_security_group.allow_http.id, aws_security_group.docker.id]

  user_data = <<EOF
      #! /bin/bash
    sudo apt-get update
    sudo echo "ECS_CLUSTER=${var.name}-ECS" >> /etc/ecs/ecs.config
EOF
}

resource "aws_autoscaling_group" "autogroup" {
  name                      = "${var.name}-asg"
  launch_configuration      = aws_launch_configuration.template.name
  desired_capacity          = 2
  min_size                  = 0
  max_size                  = 2
  health_check_type         = "ELB"
  health_check_grace_period = 120
  vpc_zone_identifier       = [aws_subnet.main_pri.id, aws_subnet.second_pri.id]
  protect_from_scale_in     = true
  depends_on = [
    aws_nat_gateway.nat_AZA, aws_nat_gateway.nat_AZB
  ]
  lifecycle {
    ignore_changes = [
      desired_capacity
    ]
  }
  tag {
    key                 = "AmazonECSManaged"
    value               = ""
    propagate_at_launch = true
  }
}
