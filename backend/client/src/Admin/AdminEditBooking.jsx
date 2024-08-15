import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEditBooking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        ownerId: '',
        userId: '',
        venueId: '',
        Price: 0,
        title: '',
        category: '',
        bookingDayDate: '',
        bookingNightDate: '',
        approval: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/adminBookings/${id}`)
            .then((res) => {
                setBooking(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching booking data:', error);
                setError('Error fetching booking data');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/adminBookings/${id}`, booking);
            navigate('/admin/adminbookings'); // Redirect back to admin bookings page after update
        } catch (error) {
            console.error('Error updating booking:', error);
            setError('Error updating booking');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h1 className="font-bold text-3xl">Edit Booking</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Owner ID</label>
                    <input
                        type="text"
                        name="ownerId"
                        value={booking.ownerId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>User ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={booking.userId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Venue ID</label>
                    <input
                        type="text"
                        name="venueId"
                        value={booking.venueId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="Price"
                        value={booking.Price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={booking.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={booking.category}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Booking Day Date</label>
                    <input
                        type="date"
                        name="bookingDayDate"
                        value={booking.bookingDayDate}
                        onChange={handleChange}
                        className="form-control"
                        
                    />
                </div>
                <div className="form-group">
                    <label>Booking Night Date</label>
                    <input
                        type="date"
                        name="bookingNightDate"
                        value={booking.bookingNightDate}
                        onChange={handleChange}
                        className="form-control"
                        
                    />
                </div>
                <div className="form-group">
                    <label>Approval</label>
                    <select
                        name="approval"
                        value={booking.approval}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Update Booking
                </button>
            </form>
        </div>
    );
}
