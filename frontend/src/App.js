
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import { useState } from 'react';
import Refresh from './refresh';


function App() {

  const [isAuthanticated,setIsAuthanticated]=useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthanticated?element:<Navigate to ='/Login' />
  }

  return (
    <div className="App">
      <Refresh setIsAuthanticated={setIsAuthanticated} />
        <Routes>
         <Route path='/' element={isAuthanticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path='/login' element={isAuthanticated ? <Navigate to="/home" /> : <Login />} />
        <Route path='/signup' element={isAuthanticated ? <Navigate to="/home" /> : <Signup />} />
          <Route path='/home' element={ <PrivateRoute element = {<Home setIsAuthanticated={setIsAuthanticated}/>} />} />
        </Routes>
    </div>
  );
}

export default App;
