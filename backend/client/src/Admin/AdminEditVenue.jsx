import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEditVenue() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState({
        ownerName: '',
        category: '',
        title: '',
        address: '',
        description: '',
        amenities: [],
        addInfo: '',
        timeFrom: '',
        timeTo: '',
        capacity: '',
        dayPrice: '',
        nightPrice: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/adminVenues/${id}`)
            .then((res) => {
                setVenue(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching venue data:', error);
                setError('Error fetching venue data');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenue({ ...venue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/adminVenues/${id}`, venue);
            navigate('/admin/adminvenues'); // Redirect back to admin venues page after update
        } catch (error) {
            console.error('Error updating venue:', error);
            setError('Error updating venue');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h1 className="font-bold text-3xl">Edit Venue</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={venue.ownerName}
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
                        value={venue.category}
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
                        value={venue.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={venue.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={venue.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Amenities</label>
                    <input
                        type="text"
                        name="amenities"
                        value={venue.amenities.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'amenities', value: e.target.value.split(', ') } })}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Additional Info</label>
                    <input
                        type="text"
                        name="addInfo"
                        value={venue.addInfo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time From</label>
                    <input
                        type="time"
                        name="timeFrom"
                        value={venue.timeFrom}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time To</label>
                    <input
                        type="time"
                        name="timeTo"
                        value={venue.timeTo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={venue.capacity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Day Price</label>
                    <input
                        type="number"
                        name="dayPrice"
                        value={venue.dayPrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Night Price</label>
                    <input
                        type="number"
                        name="nightPrice"
                        value={venue.nightPrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Update Venue
                </button>
            </form>
        </div>
    );
}
