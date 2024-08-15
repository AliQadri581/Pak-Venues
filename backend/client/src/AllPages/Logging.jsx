import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { toast} from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserContext } from '../UserContext';
import 'react-toastify/dist/ReactToastify.css';
import '../Login.css'



function Logging() {
const navigatee = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(UserContext); //destructuring setUser from UserContext.Provider in value prop
    
  if(user){
    console.log("USer found", user);
     navigatee('/')
     if(user.email == 'admin@gmail.com'){
      navigatee('/admin')
     }
    
  }
  else{
    console.log("USer not found");
  }



  
  
  const showToastMessage = (isSuccess) => {
    if (isSuccess === true) {
      toast.success( "Success Notification !", { position: toast.POSITION.TOP_CENTER })
      console.log("IsSuccess",isSuccess);
      
    } if(isSuccess === false ) {
      toast.error("Login unsuccessful", { position: toast.POSITION.TOP_CENTER });
    }
  };
  async function Login(ev){
    ev.preventDefault()
  try {

    
   const LoginInfo = await axios.post('/logging', {email,password}) //putting the data that we are getting from api response into login info which puts it in the User Context
   
   setUser(LoginInfo.data);
   console.log("Logging in", LoginInfo.data);
   console.log("login successfull")

   
   
   showToastMessage(true)
  } catch (error) {
    showToastMessage(false)
    console.log("login unsuccessfull")
    
  }
}



  return (
  
  <div className='login'>
    <div className="row">
    <div className="col-md-6 parnt-1">
      <div className='child1-login'>

      </div>
    </div>
    <div className="col-md-6 parnt-1">
    <div className="wrapper">
      <form onSubmit={Login}>
        <h1 className=''>Login</h1>
        <div className="input-box">
          <input type="email" placeholder='Email'
              value={email}
              onChange={(ev)=>setEmail(ev.target.value)}
              required
          />
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder='Password'
                value={password}
                onChange={(ev)=>setPassword(ev.target.value)}
                required
          />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button className='btn' >
             Login 
             
        </button>

        <div className='register-link'> 
          <p>Not registered?<Link to={'/signup'} className='ml-2 underline font-bold'>Sign up here.</Link></p>
        </div>
      </form>
    </div>
    </div>
    </div>
   
        
  </div>
  )
}

export default Logging
