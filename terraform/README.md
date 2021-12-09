### Creating the Infrastructure using Terraform

- Go to AWS and in the ECR service create a Repo
- Github Actions takes care of building and pushing the Docker image to the ECR.

- In the terminal run:

```
1 - Go into the terraform dir:
    (don't forget first to replace the image URI in the ecs.tf file)
    a) terraform init
    b) terraform plan to see that the execution will be ok.
    c) terraform apply
2 - Go into S3 folder to store terraform state in a remote backend s3
    a) terraform init
    b) terraform apply
```
