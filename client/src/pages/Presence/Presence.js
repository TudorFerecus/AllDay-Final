import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"

import presenceCSS from './style.module.css'

import UserOnline from "../../components/PeopleIcon/UserOnline"
import UserOffline from "../../components/PeopleIcon/UserOffline"

import { useEffect, useState } from "react"
import { GetLastConnection, GetUser, GetAllUsersAPI } from "../../features/API/API"

function Presence()
{
    const [onlineUsers, setOnlineUsers] = useState([])
    const [offlineUsers, setOfflineUsers] = useState([])

    function onResponse(users)
    {
        GetAllUsersAPI( 
            (allUsers) => {
                let currUsers = [...onlineUsers];
                let currOfflineUsers = [...offlineUsers];
                for(let responseUser of allUsers)
                {
                    let found = false;
                    for(let user of users)
                    {
                        if(user === responseUser.IP)
                        {
                            found = true;
                            currUsers.push({name: responseUser.name, url: responseUser.profilePhoto})
                        }
                    }
                    if(!found) 
                    {
                        currOfflineUsers.push({name: responseUser.name, url: responseUser.profilePhoto})
                    }
                }
                setOnlineUsers(currUsers)
                setOfflineUsers(currOfflineUsers)
            }, 
            () => console.log("Error"))
        
    }

    function onError()
    {
        alert("Error")
    }

    useEffect(() => {
        GetLastConnection(onResponse, onError);
    }, [])

    return (
        <div>
            <Head pageTitle="Presence"/>
            <Navbar /> 
            <div className={presenceCSS.online_wrapper}>
                { 
                    onlineUsers.map(user => (
                        <UserOnline className={presenceCSS.user}key={user.name} userName={user.name} url={user.url}/>
                    ))
                }
            </div>
            <div className={presenceCSS.offline_wrapper}>
                {
                    offlineUsers.map(user => (
                        <UserOffline className={presenceCSS.user}key={user.name} userName={user.name} url={user.url}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Presence