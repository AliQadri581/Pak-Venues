// import React, { useContext } from 'react'
// import { Outlet } from 'react-router-dom'
// import Foot from '../Foot'
// import { UserContext } from '../UserContext'

// export default function AdminLayout() {
//   const {user} = useContext(UserContext)
//   console.log('admin layout', user)
//   return (
//     <div>
      
//         <Outlet />
        
//     </div>
//   )
//}

import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AdminLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not an admin, navigate to the home page
    if (user?.name !== 'Admin') {
      navigate('/'); // Redirect to the general user route
    }

  }, [user]); // Dependency array includes 'user' and 'navigate'

  if (user?.name === 'Admin') {
    return <Outlet />; // Allow admin access
  }

  // Return null or some fallback UI while redirection happens
  return <div>No user</div>;
}