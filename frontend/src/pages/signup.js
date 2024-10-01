import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../util'
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const [signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    
    const Navigate =useNavigate();



const handlechange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copysignupInfo ={...signupInfo};
        copysignupInfo[name]=value;
        setSignupInfo(copysignupInfo);
}
console.log('signupInfo->',signupInfo)
const handlesignup=async (e)=>{
    e.preventDefault();
    const {name,email,password}=signupInfo;
    if(!name||!email||!password){
        return handleError('All fields are required')
    }
    try{
           const url="https://auth-deploy-api.vercel.app/auth/signup"
           const response = await fetch(url,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(signupInfo)
           })
           const result=await response.json();
           const {success,message,error}=result;
           if(success){
            handleSuccess(message);
            setTimeout(()=>{
                Navigate('/login')
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
        <h1> Signup </h1>
        <form onSubmit={handlesignup}>
            <div>
                <label htmlFor='name'> Name </label>
                <input onChange={handlechange} type='text' name='name' autoFocus placeholder='Enter your name..' value={signupInfo.name} />
            </div>
            <div>
                <label htmlFor='email'> Email </label>
                <input onChange={handlechange} type='email' name='email' autoFocus placeholder='Enter your email..' value={signupInfo.email} />
            </div>
            <div>
                <label htmlFor='password'> password </label>
                <input onChange={handlechange} type='password' name='password'  placeholder='Enter your password..' value={signupInfo.password}/>
            </div>
            <button type='submit'> Signup</button>
            <span> Already have an Account ? <Link to ="/Login"> Login </Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
