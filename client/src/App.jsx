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


axios.defaults.baseURL = 'http://localhost:4000';


function App() {
  

  return (
    
    <>
   <Routes>

    <Route path='/' element={<Structure />}>
   <Route path='' element={<FirstPage />}/>
   <Route path='/logging' element={<Logging />}/>
   <Route path='/signup' element={<Signup />}/>
   </Route>
   </Routes>
      
   </>
  )
}

export default App
