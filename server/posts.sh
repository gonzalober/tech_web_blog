#!/bin/sh
echo "Setting variables"

url1="https://academy-project-blogs.s3-eu-west-1.amazonaws.com/teaching_code.doc"
file1="teaching_code.doc"
url2="https://academy-project-blogs.s3-eu-west-1.amazonaws.com/IDC.md"
file2="IDC.md"
url3="https://academy-project-blogs.s3-eu-west-1.amazonaws.com/milestones.txt"
file3="milestones.txt"

dire="blogs"

echo "Checking / Creating directory"

if [ -d $dire ]; then
  rm -rf $dire
fi

mkdir -p $dire;
cd $dire


echo "Downloading files"

curl $url1 --output $file1 --silent
curl $url2 --output $file2 --silent
curl $url3 --output $file3 --silent

# Validations on the file size, naming and file extension should be made as part of your shell script.
# file size en bytes
File_size=$(curl -sI $url1 | grep -i Content-Length | awk '{printf "%.0f\n", $2}') 
echo $File_size
Size_max=100000
# echo $(($File_size + $Size_max))

if (( File_size > Size_max)); then
  echo "wrong file size" 
  exit 1
fi

Content1=$(cat $file1)
Username1="Emma Frame"
Title1="ECS Core Values - Case Study"
Content2=$(cat $file2)
Username2="Eloisa Tovee"
Title2="IDC DevOps Conference Key Takeaways"
Content3=$(cat $file3)
Username3="Olwen Davies"
Title3="5 Milestones Since Being at ECS"


echo "INSERT INTO posts (username, title, content) VALUES ('"$Username1"', '"$Title1"', '"$Content1"')" | psql tech_blog
echo "INSERT INTO posts (username, title, content) VALUES ('"$Username2"', '"$Title2"', '"$Content2"')" | psql tech_blog
echo "INSERT INTO posts (username, title, content) VALUES ('"$Username3"', '"$Title3"', '"$Content3"')" | psql tech_blog