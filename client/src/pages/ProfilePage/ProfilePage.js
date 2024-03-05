import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

function ProfilePage()
{
    const signOut = useSignOut()
    const navigate = useNavigate()

    return (
        <>
        <Head pageTitle="Login"/>
        <Navbar />
        <button onClick={() => {signOut(); navigate('/login')}}>Sign Out</button>
        
        </>
    )
}

export default ProfilePage