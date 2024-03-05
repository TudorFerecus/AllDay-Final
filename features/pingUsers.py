import requests
from datetime import datetime
import time
from who_is_on_my_wifi import *
import keyboard


#asteapta apasarea tastei "esc" pentru a iesi din program
def on_key_event(e):
    if e.name == 'esc':
        print("Closing the program.")
        keyboard.unhook_all()
        exit()
 
# functia ce extrage ip-ul local din raspunsul de la functia who()
def getLocalIp(information):
	localIP = information.split("\n")[1].split(' ')[2]
	ips = []
	ips.append(localIP)
	return ips


urlConnection = 'http://localhost:10000/api/v1/connections/postConnection'
urlUsers = 'http://localhost:10000/api/v1/users/getAllUsers'

keyboard.hook(on_key_event)

allUsers = []
activeUsers = []
noOfIterations = 1
users = requests.get(urlUsers).json()

# realizeaza un request de tip get la baza de date hostata online
for user in users["users"]:
    allUsers.append(user["IP"])

# itereaza de "noOfIterations" ori
while True:
    currentUsers = []
    for i in range(noOfIterations):
        # "who()" returneaza lista tuturor device-urilor conectate
        WHO = who()

        for j in range(0, len(WHO)):

            # procesarea informatiei primite 
            comm = f"\n{WHO[j][0]} {WHO[j][1]}\n{WHO[j][2]} {WHO[j][3]}\n{WHO[j][4]} {WHO[j][5]}\n"
            currentUsers.extend(getLocalIp(comm))

            # retine ip-urile care se regasesc in lista de currentUsers 
            activeUsers = [element for element in currentUsers if element in allUsers]

            # retine instantele unice de users 
            for element in currentUsers:
                 if element in allUsers and element not in activeUsers:
                    activeUsers.append(element)


    current_time = datetime.now()
    formatted_time = current_time.strftime("%Y-%m-%d %H:%M")
    if len(activeUsers) > 0:
        x = requests.post(urlConnection, json={"users": activeUsers, "dateTime": str(formatted_time)})
        print(x.json())
    time.sleep(60)