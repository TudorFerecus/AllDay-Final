import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import Title from "../../components/Titles/Titles"
import Input from "../../components/Input/Input"
import Button1 from "../../components/Buttons/Button1"

import { alertSuccessful, alertError } from "../../features/Alerts/alerts"
import { useContext, useState } from "react"
import { RegisterAPI, NewStatAPI } from '../../features/API/API'
import styleCSS from './style.module.css'
import { AppContext } from "../../features/Context/Context"

function checkEmail(str)
{
    return String(str)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function Signup()
{

    const [formData, setFormData] = 
        useState({name:'', mail:'', password:'', confirmPassword:''})
    const {REMOTE_LINK} = useContext(AppContext)
    
    function onResponse(res)
    {
        const data = {mail:formData.mail, token: res.data.token}
        if(res.data.success === true)
            NewStatAPI(data, () => { 
            alertSuccessful("Sign-up Successful! Now you just have to log in")
            window.location.replace(`${REMOTE_LINK}/login`)
            }, onError);
        else
        {
            if(res.data.message)
                alertError(res.data.message)
            else
                alertError("Something went wrong, try again");
        }
            
    }

    function onError(res)
    {
        alertError("Something Went Wrong, try again and do not close the window untill redirected to login page")
    }

    function onSubmit(e)
    {
        e.preventDefault();

        let inputs = document.querySelectorAll('.input-form');

        for(let i = 0; i < inputs.length; i++)
            inputs[i].value = ''

        if(formData.name && formData.mail && formData.password && formData.confirmPassword)
        {
            if(!checkEmail(formData.mail))
            {
                alertError("Email is not valid")
                return
            }

            if(formData.password === formData.confirmPassword)
            {

                if(formData.password.length < 8)
                {
                    alertError("Password is too weak, try at least 8 characters")
                    return
                }

                delete formData.confirmPassword
                RegisterAPI(formData, onResponse, onError);
            }
            else
                alertError("Passwords Do Not Match")
        }
        else
            alertError("Please Complete All Fields")
    }

    return (
        <div className={styleCSS.main}>
            <Head pageTitle="SignUp"/>
            <Navbar />
            <div className={styleCSS.main_section}>
                <div className={styleCSS.wrapper}>
                    <div style={{marginTop: "2dvh"}}>
                        <Title titleText="Sign-up" marginBottomTitle="40px"/>
                    </div>
                    <form className={styleCSS.signup_form} onSubmit={onSubmit}>
                        <div className={styleCSS.inputs}>
                            <Input inputName="Name" inputPlaceholder="Enter your name here"
                                onChange={(e)=> setFormData({...formData, name:e.target.value})} />
                            <Input  inputName="Email" inputPlaceholder="Enter your email here" 
                                onChange={(e)=> setFormData({...formData, mail:e.target.value})}/>
                            <Input  inputName="Password" inputPlaceholder="Enter your email here" inputType="password"
                                onChange={(e)=> setFormData({...formData, password:e.target.value})}/>
                            <Input  inputName="Repeat Password" inputPlaceholder="Enter your password here" inputType="password"
                                onChange={(e)=> setFormData({...formData, confirmPassword:e.target.value})}/>
                        </div>
                        <div style={{marginTop: "2dvh"}}>
                            <Button1 buttonText="Join us!" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup