import styleCSS from './style.module.css'

import genericPhoto from './generic-photo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

import Button1 from '../../../components/Buttons/Button1';
import { GetUser, PostPhoto, UpdateUser } from '../../../features/API/API';
import { alertError } from '../../../features/Alerts/alerts';


function ProfileSection()
{
    const signOut = useSignOut()
    const navigate = useNavigate()

    const [username, setUsername] = useState('Placeholder')
    const [email, setEmail] = useState('Placeholder')
    const [team, setTeam] = useState('Placeholder')
    const [profilePhoto, setProfilePhoto] = useState(genericPhoto)

    console.log(localStorage.getItem('mail'))

    const userEmail = localStorage.getItem('mail')

    GetUser({mail: userEmail}, (res) => {

        setUsername(res.name)
        setEmail(res.mail)
        setTeam(res.team)
        setProfilePhoto(res.profilePhoto);
    }, () => { alertError("Something went wrong!") })

    function changePhoto(event)
    {

        function onResponse(data)
        {
            let mail = localStorage.getItem('mail')
            let token = Cookies.get('_auth');
            UpdateUser({mail:mail, token:token, profilePhoto:data.data.url},
                (res) => {
                    token = Cookies.set('_auth', res.token)
                    window.location.reload(false);
                }, (error) => {
                    alertError("Something went wrong!")
                })
        }

        function onError(error)
        {
            alertError("Something went wrong!")
        }

        const image = event.target.files[0];

        const formData = new FormData();
        formData.append('file', image);

        PostPhoto(formData, onResponse, onError)

    }

    return (
        <div className={styleCSS.profile_section}>
            <div className={styleCSS.photo_wrapper}>
                <img src={profilePhoto} alt="profile" className={styleCSS.profile_photo}/>
                <div className={styleCSS.add_photo_wrapper}>
                    <input className={styleCSS.photo_upload} type="file" accept=".png, .jpg, .jpeg"onChange={changePhoto}/>
                    <FontAwesomeIcon icon={faPlus} className={styleCSS.icon}/>
                </div>
            </div>
            <div className={styleCSS.profile_title}>
                Profile Page
            </div>
            <div className={styleCSS.username}>
                Username: 
                <span className={styleCSS.bold}> {username} </span>
            </div>
            <div className={styleCSS.email}>
                Email: 
                <span className={styleCSS.bold}> {email} </span>
            </div>
            <div className={styleCSS.team}>
                Team: 
                <span className={styleCSS.bold}> {team} </span>
            </div>
            <div style={{marginTop: '50px'}}>
                <Button1 buttonText="Sign Out"
                onClick={() => { localStorage.clear(); signOut(); navigate('/login')}}/>
            </div>
        </div>
    )
}   

export default ProfileSection