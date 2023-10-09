import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProperty } from '../actions/property';
import { useParams, useNavigate  } from 'react-router-dom';
import Header from './Header';

function PropertyUpdate(props) {
  const { id } = useParams(); 
  const propertyId = id;
  const propertyIdInt = parseInt(id, 10); // Convert the string ID from the URL to an integer

  const property = useSelector(state => state.properties.properties.find(prop => prop.id === propertyIdInt));

  const [title, setTitle] = useState('');
  const [price_per_month, setPricePerMonth] = useState('');
  const [address, setAddress] = useState('');
  const [number_of_rooms, setNumberOfRooms] = useState('');
  const [mrt, setMrt] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if (property) {
          setTitle(property.title);
          setPricePerMonth(property.price_per_month)
          setAddress(property.address)
          setNumberOfRooms(property.number_of_rooms)
          setMrt(property.mrt)
          // ... set other form fields ...
      }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProperty = {
      title,
      price_per_month,
      address,
      number_of_rooms,
      mrt
    };

    dispatch(updateProperty(propertyId, updatedProperty));
    navigate('/property-search');
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h2>Update Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price per month:</label>
          <input type="number" className="form-control" value={price_per_month} onChange={(e) => setPricePerMonth(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of rooms:</label>
          <input type="number" className="form-control" value={number_of_rooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">MRT:</label>
          <input type="text" className="form-control" value={mrt} onChange={(e) => setMrt(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Property</button>
      </form>
    </div>
    </>
  );
}

export default PropertyUpdate;
