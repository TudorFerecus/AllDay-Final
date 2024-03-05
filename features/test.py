from who_is_on_my_wifi import *

def getLocalIp(information):
	localIP = information.split("\n")[1].split(' ')[2]
	ips = []
	ips.append(localIP)
	return ips

allUers = []
noOfIterations = 1

for i in range(noOfIterations):
	WHO = who()
	for j in range(0, len(WHO)):
		comm = f"\n{WHO[j][0]} {WHO[j][1]}\n{WHO[j][2]} {WHO[j][3]}\n{WHO[j][4]} {WHO[j][5]}\n"
		allUers.extend(getLocalIp(comm))
		print(comm)

#print(allUers)

# import requests
# from datetime import datetime
# import subprocess
# import time

# from who_is_on_my_wifi import *

# def is_ping_successful(host):
#     command = ['ping', '-n', '1', '-w', str(4000), host]
    
#     process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     stdout, stderr = process.communicate()

#     return not "Destination host unreachable" in stdout.decode()

# urlConnection = 'https://all-day-service.onrender.com/api/v1/connections/postConnection'
# urlUsers = 'https://all-day-service.onrender.com/api/v1/users/getAllUsers'

# allUsers = []
# activeUsers = []
# users = requests.get(urlUsers).json()

# for user in users["users"]:
#     allUsers.append(user["IP"])

# while True:
#     activeUsers = []
#     for user in allUsers:
#         if is_ping_successful(user):
#             activeUsers.append(user.split('\n')[0])

#     current_time = datetime.now()
#     formatted_time = current_time.strftime("%Y-%m-%d %H:%M")
#     if len(activeUsers) > 0:
#         x = requests.post(urlConnection, json={"users": activeUsers, "dateTime": str(formatted_time)})
#         print(x.json())
#     time.sleep(100)