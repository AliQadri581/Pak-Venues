import React from 'react'
// import '../Account.css'

import { Link,  useParams, useNavigate } from "react-router-dom";

export default function About() {
  return (
    // aboutt
    <div className=''>
       <div className="items-center m-5 flex flex-wrap">
  <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
    <img alt="..." className="max-w-full  rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1543280554-642953527bf5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFib3V0JTIwdXMlMjBjYXJkfGVufDB8fDB8fHww"/>
  </div>
  <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
    <div className="md:pr-12">
      <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300 mt-8">
        <i className="fas fa-rocket text-xl"></i>
      </div>
      <h3 className="text-3xl font-semibold">A growing company</h3>
      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
      Welcome to <b>Pak Venues</b> – a rapidly growing company dedicated to transforming event planning. Our platform comes equipped with three pre-built pages, designed to streamline your experience. Feel free to tailor the text and images to your preference, and you're all set to embark on a seamless journey.
      </p>
     
      <ul className="list-none mt-6">
        <li className="py-2">
          <div className="flex items-center">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="fas fa-fingerprint"></i></span>
            </div>
            <div>
              <h4 className="text-blueGray-500">
                Carefully crafted components
              </h4>
            </div>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="fab fa-html5"></i></span>
            </div>
            <div>
              <h4 className="text-blueGray-500">Amazing page examples</h4>
            </div>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane"></i></span>
            </div>
            <div>
              <h4 className="text-blueGray-500">Dynamic components</h4>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

<div>
<div className="bg-[#f3f6ff] flex justify-center items-center flex-wrap min-h-screen">
    <div className="w-full cardparaheight1  ml-1 mr-1 flex flex-col m-5 justify-center items-center sm:w-96 border-gray-700 text-center">
        <div className="w-full cardparaheight rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
            <h1 className="text-xl mb-2"><b>Pak-Venues</b></h1>
            <h1 className=" mb-4"><b>Users</b></h1>
            <p>Embark on your event journey with Pak Venues. Discover the perfect venue for your special moments</p>
        </div>
        <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
            <h2 className="font-semibold text-xl">Current Users</h2>
            <img src="https://simpleicon.com/wp-content/uploads/multy-user.svg" className="w-[40%] rounded-full mt-7"/>
            <p className="mt-3 font-semibold text-lg">Leslie Nielsen</p>
            <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                <span className="bg-green-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span> Current
            </span>
            
        </div>
    </div>

    <div className="w-full cardparaheight1 ml-1 mr-1 flex flex-col m-5 justify-center items-center sm:w-96 border-gray-700 text-center">
        <div className="w-full rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
        <h1 className="text-xl mb-2"><b>Pak-Venues</b></h1>
        <h1 className=" mb-4"><b>Vendors</b></h1>
            <p>Join our community of exceptional vendors dedicated to creating unforgettable experiences.</p>
            <p> <b>Your venue is more than a space</b></p>
        </div>
        <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
            <h2 className="font-semibold text-xl">Current Vendors</h2>
            <img src="https://simpleicon.com/wp-content/uploads/multy-user.svg" className="w-[40%] rounded-full mt-7"/>
            <p className="mt-3 font-semibold text-lg">Leslie Nielsen</p>
            <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                <span className="bg-green-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span> Current
            </span>
           
        </div>
    </div>
    <div className="w-full cardparaheight1  ml-1 mr-1 flex flex-col m-5 justify-center items-center sm:w-96 border-gray-700 text-center">
        <div className="w-full cardparaheight rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
        <h1 className="text-xl mb-2"><b>Pak-Venues</b></h1>
        <h1 className=" mb-4"><b>Bookings</b></h1>
            <p>Join the growing family of celebrations! Your successful booking is one of many we've orchestrated, connecting countless individuals with their perfect venues</p>
        </div>
        <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
            <h2 className="font-semibold text-xl">Successfull Bookings</h2>
            <img src="https://simpleicon.com/wp-content/uploads/multy-user.svg" className="w-[40%] rounded-full mt-7"/>
            <p className="mt-3 font-semibold text-lg">Leslie Nielsen</p>
            <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                <span className="bg-green-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span> Current
            </span>
            
        </div>
    </div>
</div>
</div>
        {/* <section id='about'>
            <div className="about-l">
            <h1 className="heading-title font-bold">Contact Us</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit aperiam eos repudiandae voluptatem dolorum dolorem dolore molestias hic consequatur temporibus. Delectus numquam quae nihil accusantium, blanditiis, reprehenderit laboriosam omnis consequuntur sunt amet ab sapiente, quidem architecto deleniti? Atque doloremque veritatis, impedit sapiente harum quibusdam odit? Accusamus culpa illo numquam expedita iure, aliquam quod officia sunt! Enim excepturi dignissimos ex aut.</p>
            </div>

            <div id='about-2'>
                <div className="content-box-lg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 flex">
                                <div className="about-item text-center">
                                    <i className="fa fa-book"></i>
                                    <h3 className='font-bold'>MISSION</h3>
                                    <hr/>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque esse vitae quae, quod odit perspiciatis quo assumenda praesentium maxime!</p>

                                </div>

                                <div className="about-item text-center">
                                    <i className="fa fa-globe"></i>
                                    <h3 className='font-bold'>VISION</h3>
                                    <hr/>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque esse vitae quae, quod odit perspiciatis quo assumenda praesentium maxime!</p>
                                    
                                </div>

                                <div className="about-item text-center">
                                    <i className="fa fa-pencil"></i>
                                    <h3 className='font-bold'>ACHIEVEMENT</h3>
                                    <hr/>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque esse vitae quae, quod odit perspiciatis quo assumenda praesentium maxime!</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

        {/* <div className="about-section">
            
            <div className="inner-container">
                <h1 className="heading-title font-bold">About Us</h1>
                <p className='text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eligendi sit iure quia commodi praesentium ullam magni earum nobis itaque non iusto ut cum soluta ea, quas assumenda quisquam quam veniam vel aliquid! Animi quis ducimus consequatur sit. Rem provident voluptatum, in, suscipit nulla ut aperiam error, eius ducimus nesciunt libero enim velit. Deserunt ipsam provident cum, nobis asperiores illum!</p>
                <div className="skills">
                    <span>Mission</span>
                    <span>Vision</span>
                    <span>Achievements</span>
                </div>
            </div>
        </div> */}
    </div>
  )
}
