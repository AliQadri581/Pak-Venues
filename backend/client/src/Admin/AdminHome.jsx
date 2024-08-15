

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AdminHome() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [showUsers, setShowUsers] = useState(true); 
    const navigate = useNavigate();
    // const {user} = useContext(UserContext)

    useEffect(() => {
        if (showUsers) {
            axios.get('/users')
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
        // if (user.name !== 'Admin') {
        //     navigate('/'); // Redirect to general user route if not admin
        // }
    }, [showUsers]);

    async function handleLogout() {
        await axios.post('/adminLogout');
        navigate('/');
    }

    function Venues(){
        navigate('adminvenues');
    }
    function Bookings(){
        navigate('adminbookings');
    }

    function handleShowUsers() {
        setShowUsers(!showUsers); // Toggle showUsers state
    }

    async function handleDeleteUser(id) {
        try {
            await axios.delete(`/users/${id}`);
            setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from state
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    function handleEditUser(id) {
        navigate(`adminedituser/${id}`);
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className='font-bold text-5xl'>ADMIN DASHBOARD</h1>

            <button onClick={handleLogout} className='btn btn-primary mt-3 wide-button' style={{ width: '200px'}}>
                Logout
            </button>

            <button onClick={Venues} className='btn btn-primary mt-3 ml-3' style={{ width: '200px' }} >Venues</button>
            <button onClick={Bookings} className='btn btn-primary mt-3 ml-3' style={{ width: '200px' }}>Bookings</button>
            {showUsers && (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h2 className='font-bold text-3xl'>Users</h2>
                    <input 
                        type="text" 
                        placeholder="Search by name or email" 
                        className="input input-bordered mt-3 mb-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">#</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Password</th>
                                <th scope="col" className="px-6 py-3">Delete</th>
                                <th scope="col" className="px-6 py-3">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">{index + 1}</td>
                                    <td className="px-6 py-4 font-bold text-black">{user.name}</td>
                                    <td className="px-6 py-4 font-bold text-black">{user.email}</td>
                                    <td className="px-6 py-4 font-bold text-black">{user.password}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDeleteUser(user._id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEditUser(user._id)} className='btn btn-primary'>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

