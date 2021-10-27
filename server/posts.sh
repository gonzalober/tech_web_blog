#!/bin/bash

curl -O "https://academy-project-blogs.s3-eu-west-1.amazonaws.com/teaching_code.doc"
curl -O "https://academy-project-blogs.s3-eu-west-1.amazonaws.com/IDC.md"
curl -O "https://academy-project-blogs.s3-eu-west-1.amazonaws.com/milestones.txt"

# Validations on the file size, naming and file extension should be made as part of your shell script.



psql -U postgres -d tech_blog -c set content `cat teaching_code.doc` "INSERT INTO posts (username, title, content) VALUES ($1, $2, $3)"