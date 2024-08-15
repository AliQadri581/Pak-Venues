

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import '../ads.css'
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

function Ads() {
  const [ads, setAds] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const infoRef = useRef([]);  //for creating mutable object
  const [removeFilter, setRemoveFilter] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false)
  const [reviews, setReviews] = useState([])
  const [adTemp, setAdTemp] = useState([])

  useEffect(() => {
    axios.get("/displayAds").then((response) => {
      const { data } = response;
      infoRef.current = data.ad;
      // console.log(data)

      setRemoveFilter(data.ad);
      setReviews(data.reviews)
      
      
      
      const updatingAds =  data.ad.map((ad)=>{
          let rating = 0;
          let stars = 0;
          let starAvg = 0;
          data.reviews.map((rev)=>{
            if(ad._id===rev.venueID){
              rating++
              stars = stars + rev.stars 

            }

          })
          starAvg = stars / rating;
          return {...ad,rating,starAvg}
          
      }) 

      console.log('updating ads', updatingAds)
      setAds(updatingAds)
      
    });

    
  }, []);

  const navigate = useNavigate();

  console.log('ads',ads)
  // console.log('reviews', reviews)

  const categories = (type) => {
    setActiveCategory(type);
  };

  const handleCapacityInput = () => {
    if (selectedCapacity !== '') {
      filterAds();
    } else {
      return;
    }
  };

  const filterAds = () => {
    let filteredAds = infoRef.current;
    
    if (activeCategory !== '') {
      filteredAds = filteredAds.filter((item) => item.category === activeCategory);
      const app =  filteredAds.map((ad)=>{
        let rating = 0;
        let stars = 0;
        let starAvg = 0;
        reviews.map((rev)=>{
          if(ad._id===rev.venueID){
            rating++
            stars = stars + rev.stars 
  
          }
  
        })
        starAvg = stars / rating;
        
        
        return {...ad,rating,starAvg}
        
    })
    setAds(app);

    }
    if (selectedCapacity !== '') {
      filteredAds = filteredAds.filter((item) => item.capacity >= parseInt(selectedCapacity));
      const app =  filteredAds.map((ad)=>{
        let rating = 0;
        let stars = 0;
        let starAvg = 0;
        reviews.map((rev)=>{
          if(ad._id===rev.venueID){
            rating++
            stars = stars + rev.stars 
  
          }
  
        })
        starAvg = stars / rating;
        
        
        return {...ad,rating,starAvg}
        
    })
    setAds(app);
    }
  };

  const handleSearch = () => {


    const filterAd = infoRef.current.filter((item) => item.title.toLowerCase().includes(searchTitle.toLowerCase()))
   const app =  filterAd.map((ad)=>{
      let rating = 0;
      let stars = 0;
      let starAvg = 0;
      reviews.map((rev)=>{
        if(ad._id===rev.venueID){
          rating++
          stars = stars + rev.stars 

        }

      })
      starAvg = stars / rating;
      
      
      return {...ad,rating,starAvg}
      
  })
  console.log('filter ad', app)
  setAds(app);

  };

  const filterByPriceRange = () => {
    if (priceRange === '') {
      setAds(infoRef.current);
    } else {
      const [min, max] = priceRange.split('-').map(Number);
      
      const filterAd = infoRef.current.filter((item) => item.dayPrice >= min && item.dayPrice <= max)
   const app =  filterAd.map((ad)=>{
      let rating = 0;
      let stars = 0;
      let starAvg = 0;
      reviews.map((rev)=>{
        if(ad._id===rev.venueID){
          rating++
          stars = stars + rev.stars 

        }

      })
      starAvg = stars / rating;
      
      
      return {...ad,rating,starAvg}
      
  })
  console.log('filter ad', app)
  setAds(app);
    }
  };

  const filterByAddress = () => {
    const filterAd = infoRef.current.filter((item) => item.address.toLowerCase().includes(searchTerm.toLowerCase()))
   const app =  filterAd.map((ad)=>{
      let rating = 0;
      let stars = 0;
      let starAvg = 0;
      reviews.map((rev)=>{
        if(ad._id===rev.venueID){
          rating++
          stars = stars + rev.stars 

        }

      })
      starAvg = stars / rating;
      
      
      return {...ad,rating,starAvg}
      
  })
  console.log('filter ad', app)
  setAds(app);
    
  };

  const RemovingFilter = () => {
    setActiveCategory('');
    setSelectedCapacity('');
    setSearchTerm('')
    setSearchTitle('')
    setPriceRange('')
    const app =  removeFilter.map((ad)=>{
      let rating = 0;
      let stars = 0;
      let starAvg = 0;
      reviews.map((rev)=>{
        if(ad._id===rev.venueID){
          rating++
          stars = stars + rev.stars 

        }

      })
      starAvg = stars / rating;
      
      
      return {...ad,rating,starAvg}
      
  })
    setAds(app);
    setFilterToggle(false)
  };

  return (
    <>
    <div className="flex flex-wrap justify-center">
    <div className="container">
    <div className="flex justify-center border p-3 rounded-full border-white shadow-md bg-gray-100">
      <div className="search-name">
        <input className="rounded-2xl p-2 ml-3  border bg-white w-96"
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button className="search-buttons" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="search-address">
        <input className="rounded-2xl p-2 ml-3  border bg-white w-96"
          type="text"
          placeholder="Enter address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-buttons" onClick={filterByAddress}>
          Search Address
        </button>
      </div>

      <div className="price-filter">
        <select className="rounded-2xl p-2 ml-3  border bg-white w-96"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="20000-40000">20,000 - 40,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
          <option value="100000-200000">100,000 - 200,000</option>
          <option value="200000-250000">200,000 - 250,000</option>
        </select>
        <button className="drop-buttons" onClick={filterByPriceRange}>
          Filter Price
        </button>
      </div>
    </div>

    <div className="category-buttons">
      <div className="flex w-full m-3">
    <button className="cursor-pointer flex items-center justify-center p-2 h-12  bg-purple-800 rounded-xl text-md font-semibold text-white" onClick={RemovingFilter}>
      All Venues
    </button>
    </div>
    {

      !filterToggle ? 
      <>
      <div className="flex items-center justify-center mt-4 gap-8">
    <button className="flex justify-center gap-2  px-36 py-3 bg-gray-200 rounded-2xl " onClick={()=> setFilterToggle(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
 </svg>

        Advanced Filter Search
       </button>
      
    </div>
</> 
: <>
    <div className="flex items-center font-bold text-2xl my-16 gap-3 "> Choose Category
      <div className={`cursor-pointer p-3 bg-purple-800 rounded-xl text-lg font-semibold text-white ${activeCategory === "Farm" ? "active" : ""}`} onClick={() => 
        {
        categories('Farm')
        
      }
        }>
        FarmHouses
      </div>

      <div className={`cursor-pointer p-3 bg-purple-800 rounded-xl text-lg font-semibold text-white ${activeCategory === "Beach Huts" ? "active" : ""}`} onClick={() => categories('Beach Huts')}>
        Beach Huts
      </div>
      <div className={`cursor-pointer p-3 bg-purple-800 rounded-xl text-lg font-semibold text-white ${activeCategory === "Wedding Halls" ? "active" : ""}`} onClick={() => categories('Wedding Halls')}>
        Wedding Halls
      </div>
      </div> 

      </>


      }

    </div>

    {activeCategory && (
      <div className="flex flex-col gap-4 mt-5 ">
        
        <input
          type="number"
          className="w-full py-2 border rounded-full pl-8  "
          placeholder="Enter capacity"
          value={selectedCapacity}
          onChange={(e) => setSelectedCapacity(e.target.value)}
        />
        <button className="bg-purple-700 text-white font-bold text-xl p-2 rounded-xl" onClick={handleCapacityInput}>Apply Filter</button>
      </div>
    )}



  </div>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  {ads.map((data) => (
    <div key={data._id} className="m-4 shadow-lg rounded-xl text-xl w-80 hover:scale-105 hover:duration-150 duration-150">
      <div className="relative">
        <img
          src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`}
          className="rounded-xl w-80 h-80"
          alt="..."
        />
      </div>

      <div className="grid grid-rows-3 m-3">
        <div className="row-span-1 flex justify-between items-center">
          <p className="text-2xl font-semibold">{data.title}</p>
          <p className="text-lg">{data.category}</p>
        </div>
        <div className="row-span-1">
          <p className="text-lg">{data.address.slice(0, 100)}</p>
        </div>
        <div className="mt-16 ml-6">
          <Link to={`ads/reviewPage/${data._id}`} className="flex items-center gap-2">
            <Rating name="read-only" value={data.starAvg} precision={0.5} readOnly />
            {`(${data.rating})`}
          </Link>
        </div>
        <div className="row-span-1">
          <Link to={`ads/?id=${data._id}`} className="m-4 p-2 bg-purple-900 text-white rounded-2xl flex items-center justify-center">
            View Details
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>


    
    </>
  );
}

export default Ads;


