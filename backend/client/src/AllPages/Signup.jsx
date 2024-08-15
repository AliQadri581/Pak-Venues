import React, { useState, useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../UserContext';


function Signup() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [navigate, setNavigate] = useState(false)

const {user} = useContext(UserContext)

const navigatee = useNavigate();

if (user){
navigatee('/')
}



async function Signing(ev){
    ev.preventDefault();
    try {
      await axios.post('/signup', {
        name,
        email,
        password
    })
    
    alert('Registration Completed');
    setNavigate(true)
    } catch (error) {
      alert('There was a problem in registration')
    }
  
    
    
  }
  
  if(navigate){
    return <Navigate to={'/logging'} />
  }
// axios.get('/test')


  return (
//     function comment(){
//    <div className=' mt-20 grow flex justify-around items-center'> 
//     <div className='ml-15'>
//       <h1 className='mt-8 text-center text-3xl'>Sign Up</h1>
//       <form className='mt-5 max-w-xs mx-auto' onSubmit={Signing}>
        
//         <div>
//         Name     
//         <input type="text" placeholder='Enter your name' value={name} onChange={(event)=>setName(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]' required />    
//         Email Address 
//         <input type="email" placeholder='Enter your email' value={email} onChange={(event)=>setEmail(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]' required />
//         Password
//         <input type="password" placeholder='Enter your password' value={password} onChange={(event)=>setPassword(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]' required />
//         </div>
//         <button className='bg-primary w-full border rounded-full mt-3 py-2' >
//             Signup
//         </button>
//         <div className='mt-3'> 
//         Already have an Account?
//         <Link to={'/logging'} className='ml-2 underline font-bold'>Login here.</Link>
//         </div>
//       </form>
//     </div>
//     </div> 

//   <div className='signup'>
//   <div className="wrapper">
//     <form onSubmit={Signing}>
//       <h1 className=''>Signup</h1>
//       <div className="input-box">

//         <input type="text" placeholder='Name'
//             value={name} onChange={(event)=>setName(event.target.value)}
//             required
//         />

//         <input type="email" placeholder='Email'
//             value={email} onChange={(event)=>setEmail(event.target.value)}
//             required
//         />
//         <i class='bx bxs-user'></i>
//       </div>

//       <div className="input-box">
//         <input type="password" placeholder='Password'
//               value={password} onChange={(event)=>setPassword(event.target.value)}
//               required
//         />
//         <i class='bx bxs-lock-alt'></i>
//       </div>

//       <button className='btn'>
//            Login 
//       </button>

//       <div className='register-link'> 
//         <p>Already have an account?<Link to={'/logging'} className='ml-2 underline font-bold'>Login here.</Link></p>
//       </div>
//     </form>
//   </div>
// </div>
// }


    <div className="signup">
      <div>
<div className="singup2"></div>
      </div>
      <div className="wrapper ">
       <div>
       <h1>Sign Up</h1>
       
        <form onSubmit={Signing}>
          <div className='inpt'>
            <input type="text" placeholder='Name'
               value={name} onChange={(event)=>setName(event.target.value)}
               required
            />
          </div>
          <div className='inpt'>
            <input type="email" placeholder='Email' 
               value={email} onChange={(event)=>setEmail(event.target.value)}
               required
            />
          </div>
          <div className='inpt'>
            <input type="password" placeholder='Password' 
               value={password} onChange={(event)=>setPassword(event.target.value)}
               required
            />
          </div>
          <button className='btn'>Sign Up</button>
          <div className='register-link'> 
          <p>Already have an account?<Link to={'/logging'} className='ml-2 underline font-bold'>Login here.</Link></p>
          </div>
        </form>
       </div>
      </div>
      
      
      
    </div>
  )
}

export default Signup