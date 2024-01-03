import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FirstPage from './AllPages/FirstPage'
import { Outlet, Route, Routes } from 'react-router-dom'

import Logging from './AllPages/Logging'
import Structure from './Structure'
import Signup from './AllPages/Signup'
import axios from 'axios'
import UserContextProvider from './UserContext'
import Account from './AllPages/Account'
import Contact from './AllPages/Contact'
import About from './AllPages/About'
import { ToastContainer } from 'react-toastify'
import ProfileDetail from './ProfileDetail'
import Ads from './AllPages/Ads'
import Venues from './AllPages/Venues'
import VenueForm from './AllPages/VenueForm'
import AdDetails from './AllPages/AdDetails'
import Inbox from './AllPages/Inbox'





axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials= true;

function App() {
  

  return (
    
    <>
  <UserContextProvider> 
   <Routes>
    
  
    <Route path='/' element={<Structure />}>
   <Route path='' element={<FirstPage />}/>
   <Route path='/logging' element={<Logging />}/>
   <Route path='/ads' element={<Ads />}/>
   <Route path='/ads/:id' element={<AdDetails />}/>
   <Route path='/signup' element={<Signup />}/>
   <Route path='/accPage' element={<Account />}/>
   <Route path='/accPage/venues/new' element={<VenueForm />}/>
   <Route path='/venues' element={<Venues/>}/>
   <Route path='/accPage/:nestPage' element={<Account />}/>   
   <Route path='/accPage/:nestPage/:event' element={<Account />}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/about' element={<About/>}/>
   <Route path='/inbox' element={<Inbox/>}/>
   <Route path='/inbox/:id' element={<Inbox/>}/>

   </Route>
   
   </Routes>
   <ToastContainer />
  </UserContextProvider>    
   </>
  )
}

export default App
