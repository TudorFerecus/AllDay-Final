# !/bin/bash

link="https://all-day-service.onrender.com/api/v1/users/getAllUsers"

if [ -e "users.txt" ]; then
	nothing=nothing
else
	touch users.txt
fi

#curl $link | jq '.' | grep "IP" | awk '{print $2}' | tr -d '",'
curl $link | jq -r '.users[] | .IP' > users.txt
