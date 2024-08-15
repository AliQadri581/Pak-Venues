import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import "../reservation.css";
import axios from "axios";
import RatingComponent from "../RatingComponent";
import DraggableDialog from "../RatingComponent";


function Reservations() {
  const { user } = useContext(UserContext);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogToggle, setDialogToggle] = useState(false)
  const [open, setOpen] = useState(false)
  // const [venueId, setVenueId] = useState('')
  
  
  
  
  useEffect(() => {
    const dataGet = async () => {
      const response = await axios.get(`/getReservation/${user.id}`);
      const { data } = response;
      setBookingData(data);

      if (data.length !== 0) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        const bookingWithStatus = data.map((booking) => {
          let status;
          
          if (booking.approval === false) {
            status = "Pending Approval";
          } else if (booking.bookingDayDate) {
            status =
              new Date(booking.bookingDayDate) < new Date()
                ? "Stay Completed"
                : "Yet to Visit";
          } else if (booking.bookingNightDate) {
            status =
              new Date(booking.bookingNightDate) < new Date()
                ? "Stay Completed"
                : "Yet to Visit";
          }
        
          return { ...booking, status };
        });
        
        setBookingData(bookingWithStatus);
        // console.log('status', status)
        
      }

      // Move the console.log statement here
      console.log("bookings", data);
    };
    dataGet();
  }, []);

  async function Cancel(id) {
    try {
      await axios.delete(`/cancelReservation/${id}`);
      setBookingData((prevItems) =>
        prevItems.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.log("Cannot cancel reservation", error);
    }
  }

  function handleRating(bookingId){
    console.log('give review',bookingId)
    setDialogToggle(true)
    setOpen(true)
    
  }

  
  return (
    <div className="reservations-container">
      <p className="text-center font-bold text-5xl my-12">My Reservations</p>
      {loading === true ? (
        <p className="text-3xl flex justify-center">
          Waiting for data retrieval...
        </p>
      ) : bookingData && bookingData.length > 0 ? (
        bookingData.map((booking) => {
          return (
            <div key={booking._id} className=" reservation-card">
              <div className="flex ">
                {/* <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." /> */}
                <div className="card-body">
               <div> 
                  <h5 className="reservation-card-title">{booking.category}</h5>
                  <p className="reservation-card-text">{booking.title}</p>
                  {booking.bookingDayDate ? (
                    <div>
                      <p className="reservation-card-text">
                        {booking.bookingDayDate}
                      </p>
                      {/* {new Date(booking.bookingDayDate) < new Date() &&  (
                        <div>
                          <p>Stay Completed!</p>
                          <button className="bg-yellow-300 p-2 rounded-xl font-bold text-2xl">Give a Review!</button>
                        </div>
                      )} */}
                        <div className="animate-pulse flex space-x-4">
                      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-700">
                
                          <p className="bg-gray-700 text-white p-2 rounded-2xl">
                            Status: {booking.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : booking.bookingNightDate ? (
                    <div>
                      <p className="reservation-card-text">
                        {booking.bookingNightDate}
                      </p>

                      {/* {new Date(booking.bookingNightDate) < new Date() && (
                        <div>Review Rating</div>
                      )} */}

<div className="animate-pulse flex space-x-4">
                      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-700">
                
                          <p className="bg-gray-700 text-white p-2 rounded-2xl">
                            Status: {booking.status}
                          </p>
                        </div>
                      </div>
                     
                    </div>
                  ) : (
                    <p className="reservation-card-text">No date in database</p>
                  )}
                  <p className="reservation-card-text">{booking.booking}</p>
                  <p className="reservation-card-text">Rs. {booking.Price}</p>
                  {booking.approval == false ? (
                    <div>
                      <button
                        className="cancel-button"
                        onClick={() => Cancel(booking._id)}
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  ) : (
                    <div className="approval-message">
                      <p className="text-3xl">
                        Your Booking Has Been Approved!
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
              {
                        booking.status == 'Stay Completed' && (
                          <button className=" p-2 bg-yellow-300 font-bold rounded-2xl text-2xl" onClick={()=>handleRating(booking._id)}>
                            Give a Review!
                          </button>
                        )
                      }
                      {
                        dialogToggle && (
                          <>
                          <DraggableDialog open={open} setOpen={setOpen} venueId={booking.venueId} bookingID={booking._id}/>
                          </>
                        )
                      }
                      </div>
                </div>







            </div>
          );
        })
      ) : (
        <p className="flex justify-center text-3xl">
          You have no reservations currently
        </p>
      )}
    </div>
  );
}
export default Reservations;
