import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import Title from "../../components/Titles/Titles"
import Input from "../../components/Input/Input"
import Button1 from "../../components/Buttons/Button1"

import useSignIn from 'react-auth-kit/hooks/useSignIn'
import {LoginAPI} from '../../features/API/API'
import { useNavigate } from 'react-router-dom';

import styleCSS from './style.module.css'
import { useState } from "react"
import { alertSuccessful, alertError } from "../../features/Alerts/alerts"

function Login()
{
    const signIn = useSignIn()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({mail:'', password:''})
    const onResponse = (res) => {
        if(res.data.success === true && signIn({
            auth: {
                token: res.data.token,
                type: "Bearer"
            },
            userState:{...res.data.user}}))
            {   
                localStorage.setItem("mail", res.data.user.mail)
                localStorage.setItem("team", res.data.user.team)
                alertSuccessful("Login Successful!")
                navigate('/presence')
            }
        else
            alertError("Bad username/password")
    }

    const onError = (res) => {
        alertError("Something went wrong, please try again")
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let inputs = document.querySelectorAll('.input-form');

        for(let i = 0; i < inputs.length; i++)
            inputs[i].value = ''


        if(formData.mail && formData.password)
        {
            LoginAPI(formData, onResponse, onError)
        }
        else
        {
            alertError("Please Enter Email and Password")
        }
    }

    return (
        <div className={styleCSS.main}>
            <Head pageTitle="Login"/>
            <Navbar />
            <div className={styleCSS.main_section}>
                <div className={styleCSS.wrapper}>
                    <div style={{marginTop: "2dvh"}}>
                        <Title titleText="Log-in" marginBottomTitle="40px"/>
                    </div>

                    <form className={styleCSS.login_form} onSubmit={onSubmit}>
                        <div className={styleCSS.inputs}>
                            <Input inputName="Email" 
                                inputPlaceholder="Enter your email here" onChange={(e)=> setFormData({...formData, mail:e.target.value})}/>
                            <Input inputName="Password" inputType="password"
                                inputPlaceholder="Enter your password here" onChange={(e)=> setFormData({...formData, password:e.target.value})}/>
                        </div>
                        <div>
                            <Button1 buttonText="Log-in" />
                        </div>
                        <div className={styleCSS.forgot_password}> forgot password? </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login