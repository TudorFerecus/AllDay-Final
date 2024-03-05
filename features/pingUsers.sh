#!/bin/bash

# in fisierul "lastUsers" sunt stocati utilizatorii
# se formateaza "lastUsers"
> lastUsers.txt

# se itereaza ip-urile userilor
while read -r ip; do
	if ping -W 0.5 -c 1 "$ip" > /dev/null; then
		echo -n "\"${p}\", " >> lastUsers.txt # retinerea utilizatorilor
	fi

done < users.txt




# cat lastUsers.txt
# truncate -s -2 lastUsers.txt
# echo '{ "users": ['"$(cat lastUsers.txt)"'], "dateTime": "2023-01-01T12:" }' > tmp_json.txt
# curl -X POST -H "Content-Type: application/json" -d "$(cat tmp_json.txt)" https://all-day-service.onrender.com/api/v1/connections/postConnection
