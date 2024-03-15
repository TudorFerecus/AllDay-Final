import { useContext } from 'react'
import { alertError } from '../../features/Alerts/alerts'
import './style.css'
import {Link} from 'react-router-dom'
import { AppContext } from '../../features/Context/Context'

function SignupBtn({relLinkToPage = ''})
{
    let canMove = false
    const {LOCAL_LINK} = useContext(AppContext)
    fetch(LOCAL_LINK)
    .then((response)=> {
        if(response.status === 200)
            canMove = true
    })
    .catch((error) => {
        console.log('network error: ' + error);
    })

    function onClickSignIn()
    {
        if(canMove)
        {
            window.location.replace(relLinkToPage)
        }
        else
        {
            alertError("You are not connected to the right WI-FI, plase contact an admin")
        }
    }

    return (
    <div className="log sign-up" onClick={onClickSignIn}>Sign-up/</div>
    )
}

function LoginBtn({relLinkToPage = ''})
{
    return (
    <Link className="log log-in" to={relLinkToPage}>Log-in</Link>
    )
}

function LoginOptions({relLinkToSignup = '', relLinkToLogin = ''})
{
    return (
        <div className="login-options">
            <SignupBtn relLinkToPage= {relLinkToSignup} />
            <LoginBtn relLinkToPage= {relLinkToLogin} />
        </div>
    )
}


export {LoginBtn, SignupBtn, LoginOptions}