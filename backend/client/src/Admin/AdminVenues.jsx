

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminVenues = () => {
    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('/adminVenues')
            .then((res) => {
                setVenues(res.data);
            })
            .catch((error) => {
                console.error('Error fetching venues:', error);
            });
    }, []); // Empty dependency array means the effect runs only once

    async function handleLogout() {
        await axios.post('/adminLogout');
        navigate('/');
    }

    async function handleDeleteVenue(id) {
        try {
            await axios.delete(`/adminVenues/${id}`);
            setVenues(venues.filter(venue => venue._id !== id)); 
        } catch (error) {
            console.error('Error deleting venue:', error);
        }
    }

    function Users(){
        navigate('/admin')
    }
    function Bookings(){
        navigate('/admin/adminbookings');
    }

    function handleEditVenue(id) {
        navigate(`/admin/adminvenues/${id}`);
    }

    const filteredVenues = venues.filter(venue =>
        venue.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase())) ||
        venue.capacity.toString().includes(searchTerm) ||
        venue.dayPrice.toString().includes(searchTerm) ||
        venue.nightPrice.toString().includes(searchTerm)
    );

    return (
        <div className="container">
             <h1 className='font-bold text-5xl'>ADMIN DASHBOARD</h1>

            <button onClick={handleLogout} className='btn btn-primary mt-3 ml-3' style={{ width: '200px'}}>
                Logout
            </button>

            <button onClick={Users} className='btn btn-primary mt-3 ml-3' style={{ width: '200px'}}>Users</button>
            <button onClick={Bookings} className='btn btn-primary mt-3 ml-3' style={{ width: '200px' }}>Bookings</button>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className='font-bold text-3xl'>Venues</h2>
                <input 
                    type="text" 
                    placeholder="Search by any field" 
                    className="input input-bordered mt-3 mb-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                                <th scope="col" className="p-4 font-bold text-black">#</th>
                                <th scope="col" className="p-4 font-bold text-black">Owner Name</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Category</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Title</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Address</th>
                                {/* <th scope="col" className="px-6 py-3">Photos</th> */}
                                <th scope="col" className="px-6 py-3 font-bold text-black">Description</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Amenities</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Additional Info</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Time From</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Time To</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Capacity</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Day Price</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Night Price</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Delete</th>
                                <th scope="col" className="px-6 py-3 font-bold text-black">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.map((venue, index) => (
                            <tr key={venue._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4 font-bold text-black">{index + 1}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.ownerName}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.category}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.title}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.address}</td>
                                {/* <td className="px-6 py-4 font-bold text-black">{venue.existingPhotos.join(', ')}</td> */}
                                <td className="px-6 py-4 font-bold text-black">{venue.description}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.amenities.join(', ')}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.addInfo}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.timeFrom}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.timeTo}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.capacity}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.dayPrice}</td>
                                <td className="px-6 py-4 font-bold text-black">{venue.nightPrice}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDeleteVenue(venue._id)} className='btn btn-danger'>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => handleEditVenue(venue._id)} className='btn btn-primary'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminVenues;

