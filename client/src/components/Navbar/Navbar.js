import NavbarItem from "./Navbar-item"
import UserTab from "../UserAuth/UserTab"
import './style.css'

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

function Navbar()
{
    const isAuthenticated = useIsAuthenticated()
    return (
        <div className="Navbar">
            <div className="categories-wrapper">
            <ul className="nav">
                <NavbarItem name="Analytics" relLinkToPage="/calendar"/>
                <NavbarItem name="Presence" relLinkToPage="/presence"/>
                <NavbarItem name="Tasks" relLinkToPage="/tasks"/>
            </ul>
            <UserTab isLoggedIn={isAuthenticated()? true : false}/>
            </div>
            <div className="break-line"></div>
        </div>
        
    )
}

export default Navbar