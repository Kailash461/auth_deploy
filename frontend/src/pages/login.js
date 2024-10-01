import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../util'
import 'react-toastify/dist/ReactToastify.css';
//import { login } from '../../../backend/Controllers/AuthController';

function Login() {

    const [loginInfo,setLoginInfo]=useState({
      
        email:'',
        password:''
    })
    
    const Navigate =useNavigate();



const handlechange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copyloginInfo ={...loginInfo};
        copyloginInfo[name]=value;
        setLoginInfo(copyloginInfo);
}
console.log('loginInfo->',loginInfo)
const handlelogin=async (e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email||!password){
        return handleError('All fields are required')
    }
    try{
           const url="http://localhost:1024/auth/login"
           const response = await fetch(url,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loginInfo)
           })
           const result=await response.json();
           const {success,message,jwtToken,name,error}=result;
           if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{
                Navigate('/home')
            },1000)
           }
           else if(error){
            const details=error?.details[0].message;
            handleError(details);
           }
           else if(!success){
            handleError(message);
           }
           console.log(result)
    }
    catch(err){
      handleError(err);
    }
}

  return (
    <div className='container'>
        <h1> Login </h1>
        <form onSubmit={handlelogin}>
            
            <div>
                <label htmlFor='email'> Email </label>
                <input onChange={handlechange} type='email' name='email' autoFocus placeholder='Enter your email..' value={loginInfo.email} />
            </div>
            <div>
                <label htmlFor='password'> password </label>
                <input onChange={handlechange} type='password' name='password'  placeholder='Enter your password..' value={loginInfo.password}/>
            </div>
            <button type='submit'> Login</button>
            <span> don't have an Account ? <Link to ="/Signup"> Signup </Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login
