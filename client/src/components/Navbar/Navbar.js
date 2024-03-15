import NavbarItem from "./Navbar-item"
import UserTab from "../UserAuth/UserTab"
import './style.css'

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useContext } from "react"
import { AppContext } from "../../features/Context/Context"

function Navbar()
{
    const isAuthenticated = useIsAuthenticated()

    const {REMOTE_LINK} = useContext(AppContext)

    return (
        <div className="Navbar">
            <div className="categories-wrapper">
            <ul className="nav">
                <NavbarItem name="Analytics" relLinkToPage={`${REMOTE_LINK}/calendar`}/>
                <NavbarItem name="Presence" relLinkToPage={`${REMOTE_LINK}/presence`}/>
                <NavbarItem name="Tasks" relLinkToPage={`${REMOTE_LINK}/tasks`}/>
            </ul>
            <UserTab isLoggedIn={isAuthenticated()? true : false}/>
            </div>
            <div className="break-line"></div>
        </div>
        
    )
}

export default Navbar