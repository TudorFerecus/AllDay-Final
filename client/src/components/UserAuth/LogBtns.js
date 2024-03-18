import { useContext } from 'react'
import { alertError } from '../../features/Alerts/alerts'
import './style.css'
import {Link} from 'react-router-dom'
import { AppContext } from '../../features/Context/Context'

function SignupBtn({relLinkToPage = ''})
{
    const {LOCAL_LINK} = useContext(AppContext)
    function canChange()
    {
        fetch(LOCAL_LINK)
        .then((response)=> {
            if(response.status === 200)
            {
                window.location.replace(relLinkToPage)
            }

            else  
            {
                alertError("You are not connected to the right WI-FI, plase contact an admin")
            }

        })
        .catch((error) => {
            console.log('network error: ' + error);
        })
    }

    return (
    <div className="log sign-up" onClick={canChange}>Sign-up/</div>
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
            <SignupBtn relLinkToPage= {relLinkToSignup}/>
            <LoginBtn relLinkToPage= {relLinkToLogin} />
        </div>
    )
}


export {LoginBtn, SignupBtn, LoginOptions}