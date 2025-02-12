# All Day - Device monitoring through local network

## Overview
This project fully implements, from backend to frontend and middleware, a very cheap way of seeing the state of your devices. It scans the router for incoming requests and retrieves the local IP of the sender.

## Features
- **modern frameworkd** using ReactJS for Frontend; Node.js, MongoDB and Express for Backend, Python for the device connection scanner
- **automatically recognised local IP address** by creating a local connection with the server and retrieving information otherwise inaccesible simply through the browser 
- **documented proof of concept**: the website acts as a wrapper and as a proof of the method's capability. I documented it in a scientific paper presented in the PRODUCTICA Conference 2024. The link can be found [here](https://drive.google.com/file/d/1xo7-fY-k1EoPWIVH_C28A4cvOtUCqHxK/view?usp=drive_link)
