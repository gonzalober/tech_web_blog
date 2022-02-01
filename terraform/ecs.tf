resource "aws_ecs_cluster" "cluster" {
  name               = "${var.name}-ECS"
  capacity_providers = [aws_ecs_capacity_provider.provider.name]
  tags = {
    Owner = var.name
  }
}

resource "aws_ecs_capacity_provider" "provider" {
  name = "${var.name}-provider"
  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.autogroup.arn
    managed_termination_protection = "ENABLED"
    managed_scaling {
      maximum_scaling_step_size = 1
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 50
    }
  }
}

resource "aws_ecs_task_definition" "container" {
  family = "${var.name}-web-app"
  container_definitions = jsonencode([
    {
      name      = "${var.name}-app"
      image     = "603825719481.dkr.ecr.us-east-1.amazonaws.com/adamgonzalo:latest"
      cpu       = 100
      memory    = 100
      essential = true
      portMappings = [{
        containerPort = 3000
      }]
    }
  ])
  network_mode = "bridge"
  tags = {
    Name  = "${var.name}-webapp"
    Owner = var.name
  }
}

resource "aws_ecs_service" "service" {
  name                               = "${var.name}-service"
  cluster                            = aws_ecs_cluster.cluster.id
  task_definition                    = aws_ecs_task_definition.container.arn
  desired_count                      = 6
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  ordered_placement_strategy {
    type  = "spread"
    field = "instanceId"
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target.arn
    container_name   = "${var.name}-app"
    container_port   = 3000
  }

  launch_type = "EC2"
  depends_on = [
    aws_lb_listener.listener
  ]
  lifecycle {
    ignore_changes = [desired_count]
  }
}
