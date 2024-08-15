import axios from "axios";
import React, { useState,useEffect } from 'react'
import { Link, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom'
import PicturesComp from '../PicturesComp';
import AmenityComp from '../AmenityComp';
import { UserContext } from "../UserContext";
import { useContext } from "react";
function VenueForm() {
    const {user } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
  
  
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [amenities, setAmenities] = useState([])
    
    const [existingPhotos, setExistingPhotos] = useState([])
    const [addInfo, setAddInfo] = useState('')
    const [timeFrom, setTimeFrom] = useState('09:00 AM - 06:00 PM')
    const [timeTo, setTimeTo] = useState('09:00 PM - 06:00 AM')
    const [capacity, setCapacity] = useState(1)
  const [dayPrice, setDayPrice] = useState(10000)
  const [ownerContact, setOwnerContact] = useState()
  const [lastValidContact, setLastValidContact] = useState('');
  const [nightPrice, setNightPrice] = useState(10000)
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');
    console.log(idFromQuery);
    const navigate = useNavigate()
    useEffect( () => {
 
      if (!idFromQuery) {
        return;
      }
      
    try {
      
      axios.get('/getMyVenue/'+idFromQuery).then(response=>{
        const{data} = response;
        setCategory(data.category)
        setTitle(data.title)
        setOwnerContact(data.ownerContact)
        setAddress(data.address)
        setDescription(data.description)
        setAmenities(data.amenities)
        setExistingPhotos(data.existingPhotos)
        setAddInfo(data.addInfo)
        setTimeFrom(data.timeFrom)
        setTimeTo(data.timeTo)
        setCapacity(data.capacity)
        setDayPrice(data.dayPrice)
        setNightPrice(data.nightPrice)
      })
    } catch (error) {
     console.log("Error in getting form data", error); 
    }
  
     
    }, [idFromQuery])


    
    const handleOptionChange = (event) => {
      setCategory(event.target.value);
    };
  
  
  
  
  async function savingVenue (ev){
  ev.preventDefault() //we do not want to use default functionality of form
  const info = {
    category,ownerContact, title, address, description, amenities, existingPhotos, addInfo, timeFrom,
    timeTo, capacity, dayPrice, nightPrice
  }

  if(user.name !== 'Admin'){

  if(idFromQuery){
   const res = await axios.put('/updateMyVenue/'+idFromQuery,{info}) //if info not sent in an object then it will show undefined at endpoint.
  if(res){
    alert("Venue Updated")
    setRedirect(true)
  }
  }
  else{
  const {data} =  await axios.post('/createMyVenue',{info}) //not destructuring {data} bec we don't want to use response
  console.log(data);
  setRedirect(true)

  }
}
else{
navigate('/logging')
}
}
    
  
  
   if(redirect){
      return <Navigate to={"/accPage/venues"} />
    }
  
  function ContactNumber(ev){
    const { value } = ev.target;
    const partialRegex = /^03\d{0,9}$/;
    const fullRegex = /^03\d{9}$/;

    if (partialRegex.test(value) || value === '') {
      setOwnerContact(value);
      setLastValidContact(value);
    }

    if (value.length === 11 && !fullRegex.test(value)) {
      alert('Invalid number. It should start with 03 and be 11 digits long.');
      setOwnerContact(lastValidContact);
    }

  }

    return (
    <div className='venues'>
              
               <div className="venue-wrapper">
                    <h1>Add Venue</h1>
                    <form onSubmit={savingVenue}>   
                      {/* default behavior of form is any button clicked on it would refresh the page if there is no ev.preventDefault on the buttons onClick */}
                    <label htmlFor="venue-description">What describes your venue best?</label>
                    <div className="options">
                        <label>
                            
                            <input type="checkbox"
                            checked={category === "Farm"} //checks if the value in the state is equal to Farm
                            value="Farm"
                            onChange={handleOptionChange} //it ticks the box
                            /> 
                            Farm Houses
                        </label>
                        <label>
                            
                            <input type="checkbox"
                            checked={category === "Wedding Halls"}
                            value="Wedding Halls"
                            onChange={handleOptionChange}
                            /> 
                            Wedding Halls
                        </label>
                        <label>
                           
                            <input type="checkbox"
                            checked={category === "Beach Huts"}
                            value="Beach Huts"
                            onChange={handleOptionChange}
                            /> 
                            Beach Huts
                        </label>
                    </div>




                      <div className="venue-details">
                        <span className='details'>Title</span>
                        <input value={title} onChange={ev=>setTitle(ev.target.value)} type="text"  placeholder='Title of Venue ' required/>
                      </div>

                      <div className="venue-details">
                        <span className='details'>Address</span>
                        <input value={address} onChange={ev=>setAddress(ev.target.value)} type="text"  placeholder='Venue Address' required/>
                      </div>

                      <div className="venue-details">
                        <span className='details'>Add Your Contact Number</span>
                        <input 
        value={ownerContact} 
        onChange={ContactNumber} 
        type="text" 
        placeholder='03000000000' 
        required
      />
                      </div>

                   {/* Photos */}
                   <PicturesComp  existingPhotos={existingPhotos} setExistingPhotos={setExistingPhotos} />
                      
                      <div className='venue-details'>
                        <span className='details'>Description</span>
                        <textarea value={description} onChange={ev=>setDescription(ev.target.value)} className='text-black' rows="5" placeholder='Enter Your Message'></textarea>
                      </div>


                      <label htmlFor="venue-description">Select the amenities provided on venue</label>
                      {/* Amenities */}
                  <AmenityComp amenities={amenities} setAmenities={setAmenities}/>


                    <div className='venue-details'>
                        <span className='details'>Any additional Information for customers</span>
                        <textarea className="text-black"  value={addInfo} onChange={ev=>setAddInfo(ev.target.value)} rows="5" placeholder='Enter Your Message'></textarea>
                      </div>
                      <div>
                        <div className='flex h-8 p-5 items-center justify-center time'>
                        <p className='p-3'>Day Time Slot</p>
                        <input className='text-black' value={timeFrom} onChange={ev=>setTimeFrom(ev.target.value)} type='text' />
                        <p className='p-3'>Night Time Slot</p>
                        <input className='text-black' value={timeTo} onChange={ev=>setTimeTo(ev.target.value)} type='text' />
                        </div>
                        <div className="guest">
                        <p>Guests Capacity</p>
                        <input className='text-black' value={capacity} onChange={ev=>setCapacity(ev.target.value)} type='number' />
                        </div>
                        <div className="guest">
                        <p>Price of Day booking</p>
                        <input className='text-black' value={dayPrice} onChange={ev=>setDayPrice(ev.target.value)} type='number' />
                        </div>
                        <div className="guest"> 
                        <p>Price of Night booking</p>
                        <input className='text-black' value={nightPrice} onChange={ev=>setNightPrice(ev.target.value)} type='number' />
                        </div>
                      </div>
                      

                    <div className="btnn">
                      <button>Add Venue</button>
                    </div>


                      

                    </form>
               </div>
            </div>
  )
}

export default VenueForm
