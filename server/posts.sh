#!/bin/sh
echo "Setting variables"

url1=$1
echo $1


dire="blogs"

echo "Checking / Creating directory"

mkdir -p $dire;
cd $dire

File_size=$(curl -X HEAD -sI $url1 | grep -i Content-Length | awk '{printf "%.0f\n", $2}') 
echo $File_size
Size_max=100000

if (( File_size > Size_max)); then
  echo "wrong file size" 
  exit 1
fi

echo "Downloading files"

File1=$(curl -O $url1 --silent -w "%{filename_effective}")
echo $File1

# Validations on the file size, naming and file extension should be made as part of your shell script.
# file size en bytes

# validation file ending with .exe .bin .dmg

# if (( $File1 doens't end)); then
#   echo "wrong file extension" 
#   exit 1
# fi


Content1=$(cat $File1)
Username1=$2
Title1=$3

echo "INSERT INTO posts (username, title, content) VALUES ('"$Username1"', '"$Title1"', '"$Content1"')" | psql tech_blog