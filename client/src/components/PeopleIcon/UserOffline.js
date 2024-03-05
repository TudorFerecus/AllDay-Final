import onlineStyle from './style.module.css';

function UserOffline({userName, url})
{
    return (
        <div className={onlineStyle.offline_user_wrapper}>
            <img className={onlineStyle.offline_photo} src={url}/>
            <div className={onlineStyle.offline_title}> {userName} </div>
        </div>
    )
}   

export default UserOffline;