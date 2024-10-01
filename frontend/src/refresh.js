import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function Refresh({setIsAuthanticated}) {
    const location=useLocation();
    const Navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
       setIsAuthanticated(true);
       if(location.pathname==='/' || location.pathname==='/login' || location.pathname==='/signup'){
         Navigate('/home',{ replace:false});
       }
    }
  },[location,Navigate,setIsAuthanticated])

  return (
   null
  )
}

export default Refresh

