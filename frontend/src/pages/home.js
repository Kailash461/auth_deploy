import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

function Home({setIsAuthanticated}) {
  const [loggedInUser,setLoggedInUser]=useState('');
  const [products,setProducts]=useState([]);
  const Navigate =useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User nikal liya ')
    setIsAuthanticated(false);
    setTimeout(()=>{
          Navigate('/login')
    },1000)
}
const fetchProducts=async ()=>{
  try{
     const url ="http://localhost:1024/products";
     const headers={
      headers:{
        'Authorization':localStorage.getItem('token')
      }
     }
     const response =await fetch(url,headers);
     const result= await response.json();
     console.log(result);
     setProducts(result);
  }catch(err){
    handleError(err);
  }
}

useEffect (()=>{
   fetchProducts()
},[])

  return (
    <div>
      <h1> {loggedInUser}</h1>
      <div> 
        {
          products && products.map((item,index)=>(
            <ul key={index}> 
              <span> {item.name} :{item.price} </span>
            </ul>
          ))
        }
      </div>
      <button onClick={handleLogout}> Log-out</button>
      <ToastContainer/>
    </div>
  )
}

export default Home
