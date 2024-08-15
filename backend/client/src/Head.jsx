import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "../src/Head.css";

function Head() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const accountDetail = () => {
    navigate("/accPage");
    // window.location.reload()
  };

  return (
    <div>
      <section className="flex items-center  justify-between p-2">
        <Link to={"/"} className="text-4xl text-purple-900 font-bold ml-3">
          Pak-Venues
        </Link>
        {/* <div className='flex rounded-full border border-gray-600 px-4 mt-2 mr-2 items-center shadow-md shadow-gray-400'> */}
        <div className="flex justify-between sm:flex ">
          <nav className="md:w-full text-2xl  sm:w-full sm:flex  justify-evenly lg:gap-8  ">
            <div>
              <Link to={"/"} className="px-4">
                Home
              </Link>
            </div>
            <div>
              <Link to={"/ads"} className="px-4 ">
                Venues
              </Link>
            </div>
            <div>
              <Link to={"/about"} className="px-4 ">
                About us
              </Link>
            </div>
            <div>
              <Link to={"/contact"} className="px-4 ">
                Contact us
              </Link>
            </div>
          </nav>
        </div>

      

        <Link
          to={user ? "/accPage" : "/logging"}
          className="flex  mt-2 mr-7 items-center "
        >
          {
           
            user ? (
              <button
                onClick={accountDetail}
                className="p-3 rounded-full bg-purple-700 text-white text-lg"
              >
                
                 {user.name}
              </button>
            ) : (
              <button id="login-btn" className="">
                Log in
              </button>
            )
          }
          {/* </button> */}
        </Link>

        {/* <div id="menu-btn" class="fas fa-bars"></div> */}
      </section>
      {/* <header>
    <div className="head-parent">
      <div className="head-child"></div>
      <div className="head-child"></div>
      <div className="head-child"></div>
    </div>
  </header> */}
    </div>
  );
}

export default Head;
