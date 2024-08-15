import React from 'react'
import Head from './Head'
import { Outlet } from 'react-router-dom'
import Foot from './Foot'

function Structure() {
  return (
    <div>
      <Head />
      <Outlet />
      <Foot/>

      {/* When a route matches the path "/", 
      the <Structure /> component will be rendered, and the <Outlet /> tag is a placeholder for rendering the child routes within it. */}
    </div>
  )
}

export default Structure
