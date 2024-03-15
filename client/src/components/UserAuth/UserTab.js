import { useContext } from "react";
import {LoginOptions} from "./LogBtns"
import UserPageBtn from "./UserPageBtn";
import { AppContext } from "../../features/Context/Context";

function UserTab({isLoggedIn = false})
{
    const {LOCAL_LINK} = useContext(AppContext)
    const {REMOTE_LINK} = useContext(AppContext)
    return (
        <div className="user-wrapper">
        {isLoggedIn? <UserPageBtn relLinkToPage="/profile-page"/>:
                <LoginOptions 
                relLinkToSignup= {`${LOCAL_LINK}/signup`} 
                relLinkToLogin= {`${REMOTE_LINK}/login`}  />}
        </div>
    )
}

export default UserTab