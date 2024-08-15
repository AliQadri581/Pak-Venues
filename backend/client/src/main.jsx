import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./index.css";
import FirstPage from './AllPages/FirstPage.jsx';
import Logging from './AllPages/Logging.jsx';
import AdminRoutes from './Admin/AdminRoutes.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
   <BrowserRouter>
    <Routes>
      <Route path='*' element={<App/>} />
      <Route path='/admin/*' element={<AdminRoutes/>} />
    </Routes>
  
   </BrowserRouter>
  </React.StrictMode>
);
