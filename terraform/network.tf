# Create a VPC
resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name  = "${var.name}_VPC"
    Owner = var.name
  }
}

# Create subnet number 1 pub
resource "aws_subnet" "main_pub" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.region}a"

  tags = {
    Name  = "${var.name}_SN_PUB_AZA"
    Owner = var.name
  }
}

# Create subnet number 1 pri
resource "aws_subnet" "main_pri" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.region}a"

  tags = {
    Name  = "${var.name}_SN_PRI_AZA"
    Owner = var.name
  }
}
# Create subnet number 2 pub
resource "aws_subnet" "second_pub" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.region}b"

  tags = {
    Name  = "${var.name}_SN_PUB_AZB"
    Owner = var.name
  }
}

# Create subnet number 2 pri
resource "aws_subnet" "second_pri" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.region}b"

  tags = {
    Name  = "${var.name}_SN_PRI_AZB"
    Owner = var.name
  }
}

# Internet gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name  = "${var.name}_GW"
    Owner = var.name
  }
}

resource "aws_eip" "nat_AZA" {
  vpc = true
}

resource "aws_eip" "nat_AZB" {
  vpc = true
}

resource "aws_nat_gateway" "nat_AZA" {
  allocation_id = aws_eip.nat_AZA.id
  subnet_id     = aws_subnet.main_pub.id

  tags = {
    Name  = "${var.name}_NAT_AZA"
    Owner = var.name
  }
  depends_on = [aws_internet_gateway.gw]
}

resource "aws_nat_gateway" "nat_AZB" {
  allocation_id = aws_eip.nat_AZB.id
  subnet_id     = aws_subnet.second_pub.id

  tags = {
    Name  = "${var.name}_NAT_AZB"
    Owner = var.name
  }
  depends_on = [aws_internet_gateway.gw]
}

resource "aws_route_table" "route_pub" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name  = "${var.name}_RT_PUB"
    Owner = var.name
  }
}

resource "aws_route_table" "route_pri_AZA" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_AZA.id
  }

  tags = {
    Name  = "${var.name}_RT_PRI_AZA"
    Owner = var.name
  }
}

resource "aws_route_table" "route_pri_AZB" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_AZB.id
  }

  tags = {
    Name  = "${var.name}_RT_PRI_AZB"
    Owner = var.name
  }
}

resource "aws_route_table_association" "main_pri" {
  subnet_id      = aws_subnet.main_pri.id
  route_table_id = aws_route_table.route_pri_AZA.id
}

resource "aws_route_table_association" "main_pub" {
  subnet_id      = aws_subnet.main_pub.id
  route_table_id = aws_route_table.route_pub.id
}

resource "aws_route_table_association" "second_pri" {
  subnet_id      = aws_subnet.second_pri.id
  route_table_id = aws_route_table.route_pri_AZB.id
}

resource "aws_route_table_association" "second_pub" {
  subnet_id      = aws_subnet.second_pub.id
  route_table_id = aws_route_table.route_pub.id
}