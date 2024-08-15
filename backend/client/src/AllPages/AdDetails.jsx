import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../UserContext';
import { Divider } from '@mui/material';
// import '../AdDetails.css'


export default function AdDetails() {
  
  const [ads, setAds] = useState([])
  const [priceCheck, setPriceCheck] = useState()
  const [ownerId, setOwnerId] = useState(null)
  const [title1, setTitle1] = useState('')
  const [category1, setCategory1] = useState('')
  const [approval, setApproval] = useState(false)
  const [bookingDone, setBookingDone] = useState(false)
  const [selectDate, setSelectDate] = useState(null)
  const [dayDate, setDayDate] = useState(new Date())
  const [nightDate, setNightDate] = useState(new Date())
  const [dateToggle, setDateToggle] = useState(false)
  const [receivedDayArr, setReceivedDayArr] = useState([])
  const [receivedNightArr, setReceivedNightArr] = useState([])
  
  const {user} = useContext(UserContext)

  const [openCalender, setOpenCalender] = useState(false)
  const [shiftName, setShiftName] = useState(null)
  const [shiftToggle, setShiftToggle] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idFromQuery = searchParams.get('id');

  let whatsappMsg = 'Hello, I would like to get more details about your venue '

  const navigate = useNavigate()

  let increasedDate = ''

  useEffect(()=>{
    if(idFromQuery){
      axios.put('/getAd/'+idFromQuery).then((response)=>{
        const {data} = response;
        setOwnerId(data.owner)
        setTitle1(data.title)
        setCategory1(data.category)
        setReceivedDayArr(data.bookingDateDay);
        setReceivedNightArr(data.bookingDateNight);
        return setAds([data])
      })
    }
  },[idFromQuery, selectDate])

  // function handlePrice(event){
  //    setPriceCheck(event.target.value)
  // }

  function booking(ev){
    ev.preventDefault();
    if(!priceCheck){
      return  alert('Details missing')
    }
    
    const sendData =  {
     id: idFromQuery,userr:user, title1,priceCheck, category1, ownerId, dayDate, nightDate, approval
    }
    if(user && user.name!=='Admin'){
      axios.post('/bookingReq', sendData).then((response)=>{
        const {data} = response;
        setBookingDone(true);
        console.log(data)
      })
    } else {
      navigate('/logging') 
    }
  }
  
  if (bookingDone){
    navigate('/accPage/reservations')
  }
  
  function handleDateChange(date){
    if(shiftName == 'day'){
      if(dateToggle==false){ 
        const datee = new Date(date);
        datee.setDate(date.getDate() + 1);
        increasedDate = date.toISOString().split('T')[0];
        setDayDate(increasedDate)
        setSelectDate(increasedDate)
        setDateToggle(true)
        setNightDate(null) 
      } else {
        const converted = date.toISOString().split('T')[0] 
        setDayDate(converted)
        setSelectDate(converted)
        setNightDate(null)
      }
    }
    else if(shiftName == 'night'){
      if(dateToggle==false){ 
        const datee = new Date(date);
        datee.setDate(date.getDate() + 1);
        increasedDate = date.toISOString().split('T')[0];
        setNightDate(increasedDate)
        setSelectDate(increasedDate)
        setDateToggle(true)
        setDayDate(null)
      } else {
        const converted = date.toISOString().split('T')[0] 
        setNightDate(converted)
        setSelectDate(converted)
        setDayDate(null)
      }
    }
    setOpenCalender(false)
  }

  const handleCheckbox = (event) => {
    const {checked, value} = event.target
    setShiftName( checked ? value : null ) 
   
    setOpenCalender(checked) 
    setShiftToggle(true)
  }

  function handleFilterDate(date){
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    const datePicked = newDate.toISOString().split('T')[0]
    if(shiftName == 'day'){
      if(!receivedDayArr || !receivedDayArr.includes(datePicked)){
        return true;
      } else { 
        return false;
      }
    } else if(shiftName == 'night'){
       if (!receivedNightArr || !receivedNightArr.includes(datePicked)){
        return true;
      } else {
        return false;
      }
    }
  } 

 

  return(
    <>
      {ads.map((item)=>{ 
        return(
      
       <div className='flex justify-evenly'> 
        <div className=' m-8 my-16  flex flex-col' style={{minHeight:'100vh'}}>
          <div className='my-8 text-5xl font semibold'>
            {item.title}
          </div>
          
          <div className='text-3xl mb-4 '>
            {item.category}
          </div>
          <Divider />
          <div className='mt-4 text-3xl mb-3'>
           Hosted By <span className='font-semibold'>{item.ownerName}</span>
          </div>
          <div className='text-3xl flex items-center gap-8'>
            +92-{item.ownerContact}
            <Link to={`https://api.whatsapp.com/send?phone=92${item.ownerContact}&text=${whatsappMsg+item.title+'?'}`} >

            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px" clip-rule="evenodd"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"/><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"/></svg>
            </Link>
          </div>
          <div className='w-ful my-12 rounded-xl bg-gray-500'>
          <h1 className='text-white m-3 text-3xl my-4'>Description</h1>
          <p className='m-3 text-white text-xl'>{item.description}</p>
          </div>
          <Divider />
          <div className='my-8 grid grid-cols-2 w-full text-3xl '>
          
            {item.existingPhotos.map((image)=>[
              <img src={`http://127.0.0.1:4000/photoUploads/${image}`} className='w-96 m-3 h-96 my-3 rounded-xl' />
            ])}
          </div>
          <div className='w-full my-12 rounded-xl bg-red-900 '>
           <div className='flex justify-between'> 
          <h1 className='text-white m-3 text-3xl my-4'>Amenities</h1>
          <img src='https://cdn.wallpapersafari.com/84/87/47NbUp.jpg' className=' m-3 rounded-full w-96'/>
          </div>
          <div className=' m-3 text-white text-xl'>
{item.amenities.map((amenity) => {
                  return (
                    <div key={amenity} className='text-xl mr-4 ml-7'>
                      <p>{amenity}</p>
                      
                    </div>
                  )
                })}</div>
          
          </div>
          <div className='text-3xl  m-3 '>
                Guest Capacity
                <p>{item.capacity}</p>
          </div>
          <div className='w-ful my-12 rounded-xl bg-purple-900 flex justify-evenly'>
            <div>
          <h1 className='text-white m-3 text-3xl my-4'>Booking Duration for Day</h1>
          <p className='m-3 text-white text-xl'>{item.timeFrom}</p>
          </div>
          <div>
          <h1 className='text-white m-3 text-3xl my-4'>Booking Duration for Night</h1>
          <p className='m-3 text-white text-xl'>{item.timeTo}</p>
          </div>
          </div>
          

        </div>
        <div className=' my-28 px-8  flex flex-col border border-solid border-2' style={{height:'42rem'}}>
        <div className='text-3xl  my-10'>
            Choose Your Slot
            <div className='flex my-12 justify-center items-center'>
            <input 
                    type='checkbox' 
                    className='h-4 w-4'
                    value={'day'}
                    onChange={handleCheckbox}
                    checked={shiftName == 'day'}
                  />
                  <label className='mx-6'>Day Package</label>
                  <input 
                    type='checkbox' 
                    className='h-4 w-4'
                    value={'night'}
                    onChange={handleCheckbox}
                    checked={shiftName == 'night'}
                  />
                  <label className='mx-6'>Night Package</label>
                  </div>
                  { openCalender && (
                  <DatePicker 
                    open={true}  
                    onChange={(date)=>handleDateChange(date)} 
                    selected={shiftName === 'day'
                      ? dayDate
                      : shiftName === 'night'
                      ? nightDate
                      : new Date()} 
                    className='relative mb-4'
                    filterDate={handleFilterDate}
                  />
                )}
                {
                  selectDate!==null ? (
                    <p className='p-2 text-lg font-bold'>Your Booking Date is {selectDate}</p>
                  ) : (
                    <p className='p-2 text-lg font-bold'>No date has been selected</p>
                  )
                }
                <div className='text-3xl flex flex-col items-center  mt-20'>
                  Total Bill 
                  {
                    shiftName == 'day' ?  
                    (
                      <button onClick={()=>setPriceCheck(item.dayPrice)}  className='mt-4 text-5xl font-semibold'>
                         Rs. {item.dayPrice}
                       
                        </button> 
                    
                    ) 
                    : shiftName == 'night'? (
                      <button onClick={()=>setPriceCheck(item.nightPrice)} className='mt-4 text-5xl font-semibold'>
                        Rs. {item.nightPrice}
                        
                        </button> 
                    )
                   : <div className='mt-4 text-5xl font-semibold' >0</div>
                  }


                </div>


              <button className='mt-20 bg-purple-900 text-white p-3 rounded-2xl' onClick={booking}>Book Now</button>

          </div>
          </div>
        </div>
        )
      })}
    </>
  ) 
}
