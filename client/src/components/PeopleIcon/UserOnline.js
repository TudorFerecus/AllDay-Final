import onlineStyle from './style.module.css';

function UserOnline({userName, url})
{
    return (
        <div className={onlineStyle.online_user_wrapper}>
            <img className={onlineStyle.online_photo} src={url}/>
            <div className={onlineStyle.online_title}> {userName} </div>
        </div>
    )
}   

export default UserOnline;