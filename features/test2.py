import scapy.all as scapy
from time import sleep
import requests

def getIPs():
    users = requests.get(urlUsers).json()
    for user in users["users"]:
        ips.append(user["IP"])

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

def scan(ip):
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    clients_list = []
    for element in answered_list:
        clients_list.append({"ip": element[1].psrc, "mac": element[1].hwsrc})
    return clients_list

def display_result(results):
    for client in results:
        if client["ip"] in ips and client["ip"] not in found_ips:
            found_ips.append(client["ip"])
            print(client["ip"] + "\t\t" + client["mac"])


urlUsers = 'http://localhost:10000/api/v1/users/getAllUsers'

target_ip = "192.168.0.0/24" # IP address of the localhost and it's mash
ips = [] # IP addresses of the users

nrOfTries = 30 # the bigger the better, but it takes longer
sleep_sec = 0 # sleep between entries
sleep_wifi_error = 10 # if the network is down, sleep for this amount of time

tries = 1
found_ips = []

getIPs()
print(ips)

while True:
    found_ips = []
    if check_wifi_connection():
        print(tries)
        for i in range(nrOfTries):
            display_result(scan(target_ip))
        if len(found_ips) != len(ips):
            break
        tries += 1
        sleep(sleep_sec)

    else:
        sleep(sleep_wifi_error)

print(f"Took {tries} attempts to fail")