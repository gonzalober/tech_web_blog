resource "aws_security_group" "allow_http" {
  name        = "${var.name}_allow_http"
  description = "Allow http inbound traffic"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description = "http access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name  = "${var.name}_allow_http"
    Owner = var.name
  }
}

resource "aws_security_group" "docker" {
  name        = "${var.name}_allow_docker"
  description = "Allow docker inbound traffic"
  vpc_id      = aws_vpc.vpc.id
  //default docker ports
  ingress {
    description = "docker access"
    from_port   = 49153
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name  = "${var.name}_allow_docker"
    Owner = var.name
  }
}
