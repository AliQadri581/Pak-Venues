import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';



function Calenderr() {
  const [datee, setDate] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [blockDayDates, setBlockDayDates] = useState([])
  const [blockNightDates, setBlockNightDates] = useState([])
  const [bookedDay, setBookedDay] = useState([])
  const [bookedNight, setBookedNight] = useState([])
  const [shiftName, setShiftName] = useState('')
  const [openCalender, setOpenCalender] = useState(false)
  const [totalDates, setTotalDates] = useState([])
  const [blockButtonToggle, setBlockButtonToggle] = useState(false)


  const navigate = useNavigate();



  const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');

    useEffect( () => {
       axios.get(`/getMyBookedDates/${idFromQuery}`).then((res)=>{
        const {data} = res; 

       const {dayArray, nightArray} = data;

       dayArray.forEach(element => {
        element  = new Date(element)
        element.setDate(element.getDate() - 1)
        element.toISOString().split('T')[0]
       });  

       console.log('dayArray', dayArray)
       
       setBookedDay(dayArray)
       nightArray.forEach(element => {
        element  = new Date(element)
        element.setDate(element.getDate() - 1)
        element.toISOString().split('T')[0]
       });  
        setBookedNight(nightArray)


       })
    
      
    }, [])
    




  function handleDeleteButton(dateItem) {
    setDate(null)
    if(totalDates.length==0 || totalDates==null ){
        setDeleteToggle(false)
       

    }
    if(shiftName=='day') {
    setBookedDay(prevDates=> prevDates.filter((block)=> block!== dateItem))
    setTotalDates(prevDates=> prevDates.filter((block)=> block!== dateItem))
    
    }
    else if(shiftName=='night'){
    setBookedNight(prevDates=> prevDates.filter((block)=> block!== dateItem))
    setTotalDates(prevDates=> prevDates.filter((block)=> block!== dateItem))

    }
  }

  function handleShift(event){
    const {checked} = event.target
    console.log('checkingg',checked)
    if(checked){
      setShiftName(event.target.value)
    }
    setOpenCalender(true)

  }




function handleCalender(date){
    const newDate = date.toISOString().split('T')[0];
            setDate(newDate);
            console.log('date', newDate);
            setDeleteToggle(true) 
            if(totalDates.length==0){
            setBlockButtonToggle(true)
            }
            
            
            if(shiftName=='day') {
                setBlockDayDates((prevItems)=> [...prevItems, newDate])
                setTotalDates((prevItems)=> [...prevItems, newDate])

                }
                else if(shiftName=='night'){
                    setBlockNightDates((prevItems)=> [...prevItems, newDate])
                setTotalDates((prevItems)=> [...prevItems, newDate])

            
                }
            //we could also do setBlockDates([...blockDates, newData]) but as usestates default behavior is asynchronous, using functional update pattern ensures
            // the most upto date data
          
            setOpenCalender(false)
}


function handleFilterCalender(date){
  
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  const datePicked = newDate.toISOString().split('T')[0]
    
    if(shiftName=='day'){
        if(!bookedDay || !bookedDay.includes(datePicked)){
            return true
        } 
        else{
            return false
        }
    }
    else if(shiftName=='night'){
        if(!bookedNight || !bookedNight.includes(datePicked)){
            return true
        }
        else {
            return false
        }
    }
}

async function Block(){
    const datesChosen = {
        id: idFromQuery,
        day: blockDayDates,
        night: blockNightDates
    }
    const res = await axios.post('/blockDates', datesChosen)
    if(res){
    navigate('/accPage/venues')
    alert('Successfully Updated!')
    }
    else{
      alert('Unsuccessful')
    }
}




  
  return (
    <div className=' border border-solid border-2 border-black m-20 p-6 flex justify-evenly'>
      <div>
        <div className=' text-3xl text-black mt-16 font-bold flex flex-col'>
            Select Dates that you want to Block

            {
                <div className='flex flex-col '>
                
        
              </div>
            }


        </div>
        <div className='flex flex-col '>
        <div className='flex mt-36 text-black text-xl  '>
        Day<input type='checkbox' value='day' onChange={handleShift} checked={shiftName=='day' ? true : false}/>
            Night<input type='checkbox' value='night' onChange={handleShift} checked={shiftName=='night' ? true : false}/>
            </div>
            </div>
  
      </div>
      <div className=''>

            
{
    openCalender && (
        <DatePicker 
           
          onChange={(date) => {handleCalender(date)}} 
          open={true} 
          selected={datee ? datee : new Date()} 
          className='mt-16'
          filterDate={handleFilterCalender}
          
          
        />

    )
}
{ 
              totalDates && totalDates.map((dateItem)=>{
                
                return( 
                    <>
                    
                    
              <div  className='flex justify-between mt-16 text-3xl  text-black '>     
              <p>{dateItem}</p>
                {deleteToggle && (
                    <>
                <button
                onClick={()=>handleDeleteButton(dateItem) }
                className=" btn w-12 flex justify-center bg-white text-black rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.0}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
             
              </>

            

              ) 
}
</div>
</>
                )
}) 
}
{
    blockButtonToggle && (
<div >
    <button onClick={()=>Block()} className='bg-red-900 text-white text-2xl p-2 rounded-2xl mt-8'>Block Dates</button>
</div>
    )
}
      </div>
    </div>
  );
}



export default Calenderr;
