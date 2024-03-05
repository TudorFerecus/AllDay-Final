import {LoginOptions} from "./LogBtns"
import UserPageBtn from "./UserPageBtn";

function UserTab({isLoggedIn = false})
{
    return (
        <div className="user-wrapper">
        {isLoggedIn? <UserPageBtn relLinkToPage="/profile-page"/>:
                <LoginOptions relLinkToSignup= '/signup' relLinkToLogin= '/login' />}
        </div>
    )
}

export default UserTab