import scapy.all as scapy
from time import sleep
import requests
from datetime import datetime

# realizeaza un request de tip get la baza de date hostata online 
def getIPs():
    users = requests.get(urlUsers).json()
    for user in users["users"]:
        ips.append(user["IP"])

# O aditie fata de algoritmii precedenti este verificarea conexiunii la internet
# inainte de fiecare cautare, printr-un request de tip get , 
#proces ce adauga algoritmului ~1s per proces de cautare.
def check_wifi_connection():
    url = "http://www.google.com"
    timeout = 2

    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()
        print("Device has a working Wi-Fi connection.")
        return True
    
    except requests.ConnectionError:
        print("\nDevice does not have a working Wi-Fi connection.")
        return False
    
    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return False

# Functia scan() realizeaza un request de tip ARP pentru a obtine adresele 
# Localse si MAC ale device-urilor conectate la retea
def scan(ip):
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    # creaza o lista de dictionare ce contine adresele MAC si IP ale device-urilor
    clients_list = []
    for element in answered_list:
        clients_list.append({"ip": element[1].psrc, "mac": element[1].hwsrc})
    return clients_list

# functia display_result() afiseaza adresele MAC si IP ale device-urilor
# modifica found_ips pentru a retine adresele IP locale ale device-urilor
def display_result(results):
    clientsFound = 0
    for client in results:
        if client["ip"] in ips and client["ip"] not in found_ips:
            found_ips.append(client["ip"])
            print(client["ip"] + "\t\t" + client["mac"])
            clientsFound += 1
    return clientsFound


urlUsers = 'http://localhost:10000/api/v1/users/getAllUsers'
urlConnection = 'http://localhost:10000/api/v1/connections/postConnection'
target_ip = "192.168.0.0/24" # adresa IP a retelei, cu tot cu masca sa de retea
ips = [] # toate adresele IP ale userilor

nrOfTries = 100 # cu cat mai mare cu atat mai exact algoritmul, dar ii scade viteza
sleep_sec = 720 # delay intre cautari
sleep_wifi_error = 10 # dace server-ul nu are WI-FI stabil, asteapta un numar de secunde

tries = 1
found_ips = []

getIPs()
print(ips)

try:
    while True:

        # reseteaza found_ips intre cautari si verifica numarul de adrese IP de cautat
        found_ips = []
        cntIpsToSeek = len(ips)

        # verifica daca exista o conexiune la internet
        if check_wifi_connection():
            print(tries)

            # realizeaza "nrOfTries" cautari de tip scan()
            for i in range(nrOfTries):
                clientsFound = display_result(scan(target_ip))

                # pentru eficienta verifica daca a gasit toti utilizatorii
                cntIpsToSeek -= clientsFound
                if cntIpsToSeek <= 0:
                    break

            # daca a gasit macar o adresa IP, face un request POST la server    
            if len(found_ips) > 0:
                current_time = datetime.now()
                formatted_time = current_time.strftime("%Y-%m-%d %H:%M")
                x = requests.post(urlConnection, json={"users": found_ips, "dateTime": str(formatted_time)})
                print(x.json())
            
            sleep(sleep_sec)

        else:
            sleep(sleep_wifi_error)
except KeyboardInterrupt:
    pass