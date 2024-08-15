import { Divider, Rating } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ReviewPage() {

const {id} = useParams()
const [allReviews, setReviews] = useState([])

useEffect(() => {
  
const getReviews = async () => {
   const res = await axios.get(`/getReviews/${id}`)
    console.log('reviewsData', res)
    if(res.data){
        setReviews(res.data)
    }
}

getReviews()
}, [])




  return (
    <div className='mt-40 mb-96'>
        <div className='flex items-center justify-center my-20'>
        <h1 className='font-bold text-4xl'>Reviews</h1>
        
        </div>
        
        <div className='m-5 border p-10 shadow-lg rounded-2xl'>
        {
            allReviews.map((rev)=>{
                return(
                    <div>
                        <div className='my-10'>
                            <div className='mb-20'>
                        <p className='text-2xl '>{rev.userName}</p>
                        <Rating name='read-only' value={rev.stars} readOnly className='my-3' />
                        <p className='text-xl'>{rev.text}</p>
                        </div>
                        <Divider />

                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}
