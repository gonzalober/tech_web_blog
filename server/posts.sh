#!/bin/sh
echo "Setting variables"
echo $1


url1=$1
# url2="https://academy-project-blogs.s3-eu-west-1.amazonaws.com/IDC.md"
# file2="IDC.md"
# url3="https://academy-project-blogs.s3-eu-west-1.amazonaws.com/milestones.txt"
# file3="milestones.txt"

dire="blogs"

echo "Checking / Creating directory"

mkdir -p $dire;
cd $dire

File_size=$(curl -X HEAD -sI $url1 | grep -i Content-Length | awk '{printf "%.0f\n", $2}') 
echo $File_size
Size_max=100000
# echo $(($File_size + $Size_max))

if (( File_size > Size_max)); then
  echo "wrong file size" 
  exit 1
fi

echo "Downloading files"

File1=$(curl -O $url1 --silent -w "%{filename_effective}")


# curl $url2 --output $file2 --silent
# curl $url3 --output $file3 --silent

# Validations on the file size, naming and file extension should be made as part of your shell script.
# file size en bytes

# validation file ending with .exe .bin .dmg
if (( File1 doens't end)); then
  echo "wrong file extension" 
  exit 1
fi


Content1=$(cat $File1)
Username1=$2
Title1=$3
# Content2=$(cat $file2)
# Username2="Eloisa Tovee"
# Title2="IDC DevOps Conference Key Takeaways"
# Content3=$(cat $file3)
# Username3="Olwen Davies"
# Title3="5 Milestones Since Being at ECS"

echo "INSERT INTO posts (username, title, content) VALUES ('"$Username1"', '"$Title1"', '"$Content1"')" | psql tech_blog