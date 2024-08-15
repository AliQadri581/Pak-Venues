import React, {useState} from 'react'

function AmenityComp({amenities, setAmenities}) {
 
   

    function handleAmenities(ev){
        console.log(ev.target.name);
        const {name,checked} = ev.target 
        if(checked){
        
        return  setAmenities([...amenities,name])
        }
        else{
          return setAmenities([...amenities.filter(amenitiesIterator=> amenitiesIterator !== name)])
        }
        }


    return (
    <>
    <div className="options-opt">
                        <label>
                            
                            <input type="checkbox" checked={amenities.includes('wifi')} name='wifi' onChange={handleAmenities}/> 
                            Wifi
                        </label>
                        <label>
                            
                            <input type="checkbox" checked={amenities.includes('swimming pool')} name='swimming pool' onChange={handleAmenities}/> 
                            Swimming Pool
                        </label>
                        <label>
                           
                            <input type="checkbox" checked={amenities.includes('air-conditioning')} name='air-conditioning' onChange={handleAmenities}/> 
                            Air Conditioning
                        </label>
                        <label>
                           
                            <input type="checkbox" checked={amenities.includes('bbq-grill')} name='bbq-grill' onChange={handleAmenities}/> 
                            BBQ grill
                        </label>
                        <label>
                           
                            <input type="checkbox" checked={amenities.includes('board-games')} name='board-games' onChange={handleAmenities}/> 
                            Board games
                        </label>
                        <label>
                           
                            <input type="checkbox" checked={amenities.includes('kitchen-cutlery')} name='kitchen-cutlery' onChange={handleAmenities}/> 
                            Kitchen cutlury
                        </label>
                    </div>
    </>
  )
}

export default AmenityComp
