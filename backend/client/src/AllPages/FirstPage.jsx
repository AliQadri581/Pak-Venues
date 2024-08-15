import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Head from "../Head";
import img1 from "../Pictures/farm1.webp";
import img2 from "../Pictures/farm2.jpg";
import img3 from "../Pictures/search2.png";
import img4 from "../Pictures/book.webp";
import img5 from "../Pictures/add.png";
import img6 from "../Pictures/beach2.jpg";
import img7 from "../Pictures/wedd.avif";
import img8 from "../Pictures/farm3.jpg";
import img9 from "../Pictures/wat.jpg";
import "../FirstPage.css";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../UserContext";

function FirstPage() {
  // const {user} = useContext(UserContext)
  // const navigate = useNavigate()
  
  // useEffect(() => {
    
  //    if(user.name=='Admin'){
  //     navigate('/admin')
  //   }
  //   else{
  //     navigate('/')
  //   }
  //   console.log('admin check', user)
  
  // }, [])
  return (
    <>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className="image1c">
            <div className="image1paraP">
              <div className="childimage1paraP">
                <p className="pakvenuetitle">
                  <b>Pak-Venues</b>
                </p>
                <p className="imp">
                  Under the open sky, let your love story unfold in the serene
                  elegance of an outdoor wedding paradise.
                </p>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image2c">
            <div className="image1paraP">
              <div className="childimage1paraP">
                <p className="pakvenuetitle">
                  <b>Pak-Venues</b>
                </p>
                <p className="imp">
                  Discover enchanting ambience <b>VENUES</b> where every moment
                  becomes a cherished memory
                </p>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image3c">
            <div className="image1paraP">
              <div className="childimage1paraP">
                <p className="pakvenuetitle">
                  <b>Pak-Venues</b>
                </p>
                <p className="imp">
                  Escape to rustic bliss as your special day unfolds amidst the
                  charm and serenity of our picturesque farmhouse <b>VENUE</b>.
                </p>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="flex m-6 items-center justify-center ">
        {/* <Link className='p-3 text-3xl font-bold bg-purple-700 text-white rounded-xl ' to={'/ads'}>Browse Venues</Link> */}
      </div>

      <div>
        <section className="py-10 bg-w sm:py-16 lg:py-24 z-40 relative">
          <div className="container mx-auto">
            <h2 className="text-3xl font-light text-center   text-black sm:text-4xl lg:text-5xl ">
              Our{" "}
              <span className="block w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-500 lg:inline">
                Services
              </span>
            </h2>
          </div>
        </section>
      </div>

      <div className="container mb-20">
        <div>
          <div className="row">
            <div className="cardsparent">
              <div className="col-md-3 ch child1card">
                <div className="card1text">
                  <p className="para1">Use filtered search for desired venue</p>
                </div>
              </div>
              <div className="col-md-3 ch3 child1card">
                <div className="card3text">
                  <p className="para3">Advertise your Venue</p>
                </div>
              </div>
              <div className="col-md-3 card2 child1card">
                <div className="card2text">
                  <p className="para1">
                    Book Venues using Scheduling and rate them!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
