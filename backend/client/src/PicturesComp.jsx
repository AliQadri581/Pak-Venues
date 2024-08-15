import React, {useState} from 'react'
import axios from 'axios';

function PicturesComp({ existingPhotos, setExistingPhotos}) { 
      function Uploading(ev){
        const files = ev.target.files;
        console.log(files);
        const data = new FormData(); //uses a form to allow users to select and submit files and allows to append files directly preserving their binary content
        for (let i = 0; i < files.length; i++) {
          data.append('pictures', files[i]) //pictures is the fieldname for the picture that will be received at endpoint 
          
        }
        axios.post('/uploading', data)
        .then(res => {
          const {data} = res;
          setExistingPhotos(prev => {
            return [...prev, ...data]
          })
        }
          )
      }
          
      function picDelete(data){
        setExistingPhotos([...existingPhotos.filter((item)=> item!==data)])
      }

    return (
    <>
       <div className="venue-details">
                        <div className='text-3xl font-bold'>Photos</div>
                        
                      </div>

                   <div className='flex flex-wrap'>
                    {existingPhotos.length > 0 && existingPhotos.map((data) => {
                      return(
                      <div key={data._id} className='flex'>
                      <img src={`http://127.0.0.1:4000/photoUploads/${data}`} className=' w-96 h-80 rounded-2xl p-2'/>
                      <button className='bg-gray-600 flex items-center rounded-full p-4 h-8 absolute text-white' onClick={()=>{picDelete(data)}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button>
                      </div>
                      )
                    })}
                    </div>
                      <div className="button-container">
                        {/* <button onClick={PhotoUrl} className="left-button">Upload by Link</button> */}
                        <label  className="right-button cursor-pointer p-2 rounded-xl bg-purple-700 text-white w-full mb-4 ">
                          <input type="file" className='hidden cursor-pointer' onChange={Uploading} multiple/>
                          Upload Photo</label>
                      </div>
    </>
  )
}

export default PicturesComp
