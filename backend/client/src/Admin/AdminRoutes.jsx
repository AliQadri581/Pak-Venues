import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import AdminLayout from './AdminLayout'
import AdminHome from './AdminHome'
import AdminVenues from './AdminVenues'
import AdminBookings from './AdminBookings'
import UserContextProvider from '../UserContext'
import AdminEditUser from './AdminEditUser'
import AdminEditVenue from './AdminEditVenue'
import AdminEditBooking from './AdminEditBooking'


export default function AdminRoutes() {
  return (
    <div>
      <UserContextProvider>
        <Routes> 
            {/* <Route path='/' element={App}/> */}
            <Route path='/' element={<AdminLayout />}>
              <Route index element={<AdminHome/>} />
              <Route path='adminvenues' element={<AdminVenues/>}/>
              <Route path='adminbookings' element={<AdminBookings/>} />
              <Route path='adminedituser/:id' element={<AdminEditUser/>} />
              <Route path='adminvenues/:id' element={<AdminEditVenue/>}/>
              <Route path='adminbookings/:id' element={<AdminEditBooking/>}/>
            </Route>
        </Routes>
        </UserContextProvider> 
    </div>
  )
}
