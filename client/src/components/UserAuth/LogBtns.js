import './style.css'
import {Link} from 'react-router-dom'

function SignupBtn({relLinkToPage = ''})
{
    return (
    <Link className="log sign-up" to={relLinkToPage}>Sign-up/</Link>
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