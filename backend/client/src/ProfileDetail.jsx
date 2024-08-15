import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Link,  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Account from "./AllPages/Account";
import './Account.css'

function ProfileDetail() {
 
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useContext(UserContext);
  // const [navigate, setNavigate] = useState(false);
  const navigate = useNavigate()
  const [name1, setName1] = useState('')
  const [password1, setPassword1] = useState('')



    async function Save() {

        const edit = await axios.post('/editProfile',{name1,password1} )
        if(edit){
          alert("Profile Updated!")
          setEdit(false)
          console.log()
        }
        else{
          alert("Error")
        }
    
      }
      
      function EditProfile(){
        setEdit(true);
    
      }
    
      async function Logout() {
        await axios.post("/logout");
        setUser(null);
        navigate("/logging")
      }
    
      

    return (
      <div className="w-full text-center mt-20">
      {edit == true ? 
      <div className="form-parent-edit">
        <div className="form-label">
      <label htmlFor="" className="edit-label-name"> Enter New Name</label>
       <input type="text" className="w-1/2  border rounded-full shadow-lg p-3 name-input " value={name1} onChange={(ev)=>setName1(ev.target.value)}/>
       <label htmlFor="" className="edit-label-name"> Enter New Password</label>
        <input type="password" className="w-1/2 border rounded-full shadow-lg p-3 name-input" value={password1} onChange={(ev)=>setPassword1(ev.target.value)} />
        <div className="w-1/2 btn-parent2">
          <button className="bg-purple-500 text-white p-4 rounded-full" onClick={Save}>Save</button>
          </div>
        </div> 
      </div>
         : (
        <>
        <div className="container mb-10">
              <div className="mx-auto right-0 mt-2  accountbody">
                <div className="bg-white rounded overflow-hidden shadow-lg">
                    <div className="text-center p-6 accback bg-gray-800 border-b">
                    <i className="fa-regular fa-user userpng" ></i>
                    <p className="pt-2 accname font-semibold text-gray-50">{user.name}</p>
                    <p className=" text-gray-100 accemail">{user.email}</p>
                    <div className="mt-5 buttons">
                        <button className='edit-btn' onClick={EditProfile}>
                            Edit Account
                        </button>
                        <button className='edit-btn' onClick={Logout} >
                            Logout
                        </button>
                    </div>
                    </div>
                    <div className="border-b">
                        <Link to="/accPage/venues" >
                            <a className="btn-parent px-4 py-2 hover:bg-gray-100 flex">
                                <div className="text-green-600">
                                <i className="fa-solid fa-eye eyefont" ></i>
                                </div>
                                <div className="pl-3">
                                <p className="viewadd-btn font-bold text-gray-800 bookingdesign leading-none">
                                  Venue
                                </p>
                                <p className="viewadd-btn-child text-gray-500">View your <b>Venue</b></p>
                                </div>
                            </a>
                        </Link>
                        <Link to="/accPage/bookings" >
                            <a className="btn-parent px-4 py-2 flex">
                                <div className="text-gray-800">
                                <i className="fa-regular fa-calendar-days eyefont"></i>
                                </div>
                                <div className="pl-3  bookingdesign">
                                <p className="viewadd-btn font-bold text-gray-800 leading-none">Bookings</p>
                                <p className="viewadd-btn-child text-gray-500">View your <b>Bookings</b></p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div className="">
                        <div className="w-full px-4 py-2 pb-4  flex">
                            
                        </div>
                    </div>
                </div>
            </div>
           </div>
      </>
)}

    </div>
  )
}

export default ProfileDetail