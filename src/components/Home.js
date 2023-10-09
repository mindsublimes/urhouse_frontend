import React, { useCallback, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import logo from '../logo.png';
import { fetchAllProperties } from '../actions/property';
import { toggleFavorite } from '../actions/property';
import { searchProperties } from '../actions/property';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import PropertyService from '../services/property.service';

const Home = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.properties);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector(state => state.auth);
  const [searchParams, setSearchParams] = useState({
    title: "",
    price_per_month: "",
    city: "",
    district: "",
    number_of_rooms: "",
    mrt: ""
  });

  useEffect(() => {
    dispatch(fetchAllProperties(currentPage));
  }, [dispatch, currentPage]);  

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleFavoriteClick = (propertyId, currentWishlistStatus) => {
    dispatch(toggleFavorite(propertyId, currentPage)); // Assuming you create this action
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
const handleSearch = (e) => {
  e.preventDefault();
  const updatedSearchParams = {
    ...searchParams,
    address: `${searchParams.city} ${searchParams.district}`
  };
  
  // Omit city and district from the searchParams if needed
  delete updatedSearchParams.city;
  delete updatedSearchParams.district;

  dispatch(searchProperties(updatedSearchParams)) 
    .then(() => {
      console.log("Search completed");
    })
    .catch((error) => {
      console.log("Search not completed");
    });
};


  return (
    <div id="content" className="">
      <Header />

      <div className="filter-section">
        <div className="container">
          <div className="search-filter-box mb-4">
          <form onSubmit={handleSearch}>
            <div className="d-flex flex-column flex-xl-row gap-2">
                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="mrt" className="form-label">Title</label>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="input-group flex-nowrap">
                            <input type="text" className="form-control" id="title" name="title" value={searchParams.title} onChange={handleInputChange} placeholder="Enter title" />
                        </div>
                    </div>
                </div>
                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="city" className="form-label">City</label>
                    <select className="form-select mb-3 mb-md-0" id="city" name="city" value={searchParams.city} onChange={handleInputChange}>
                        <option value="">Select city</option>
                        <option value="Taipie City">Taipie City</option>
                        <option value="New Taipie City">New Taipie City</option>
                    </select>
                </div>

                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="district" className="form-label">District</label>
                    <select className="form-select mb-3 mb-md-0" id="district" name="district" value={searchParams.district} onChange={handleInputChange}>
                        <option value="">Select district</option>
                        <option value="Zohongzheng">Zohongzheng</option>
                        <option value="Da'an">Da'an</option>
                        <option value="Xinyi">Xinyi</option>  
                        <option value="Banqiao">Banqiao</option>  
                        <option value="Xizhi">Xizhi</option>  
                        <option value="Yonghe">Yonghe</option>  

                    </select>
                </div>

                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="numberOfRooms" className="form-label">No of bedrooms</label>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="input-group flex-nowrap">
                            <input type="number" className="form-control" id="numberOfRooms" name="number_of_rooms" value={searchParams.number_of_rooms} onChange={handleInputChange} min="0" placeholder="Enter no of rooms" />
                        </div>
                    </div>
                </div>

                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="rentPerMonth" className="form-label">Rent Per month</label>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="input-group flex-nowrap">
                            <input type="number" className="form-control" id="rentPerMonth" name="price_per_month" value={searchParams.price_per_month} onChange={handleInputChange} min="0" placeholder="Enter rent" />
                        </div>
                    </div>
                </div>

                <div className="column mb-3 mb-xl-0">
                    <label htmlFor="mrt" className="form-label">Mrt</label>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="input-group flex-nowrap">
                            <input type="text" className="form-control" id="mrt" name="mrt" value={searchParams.mrt} onChange={handleInputChange} placeholder="Enter mrt" />
                        </div>
                    </div>
                </div>

                <div className="column mb-3 mb-xl-0">
                  <div className="text-end">
                    <label for="inputType" className="form-label invisible"
                      >action buttons</label
                    >
                    <div className="d-flex gap-2 ms-3">
                    <button type="submit" className="btn btn-sm btn-primary">
                        Search
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div className="listing">
        <div className="search-result">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {properties.map(property => (
                <div className="col mb-3">
                  <a href="#" className="my-5">
                    <div className="card h-100 shadow">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                        className="card-img-top"
                        alt="Skyscrapers"
                      />
                      <a href="#" className='wishlist-icon' onClick={() => handleFavoriteClick(property.id, property.favourite)}>
                      <FontAwesomeIcon 
                          icon={property.favourite ? faHeart : farHeart} 
                          className={property.favourite ? 'red-heart' : ''}
                      />
                      </a>
                      <div className="card-body">
                        <h5 className="card-title">
                          <span
                            >{property.title}
                            <span className="ms-1 fw-bold fs-4">{property.price_per_month}</span>
                            <span className="">/ month</span>
                          </span>
                        </h5>
                        <h6>板橋站極品商辦</h6>
                        <p className="card-text">
                          {property.address}
                        </p>
                        {user.role === "admin" && (
                          <Link to={`/properties/${property.id}/edit`} className="btn btn-primary text-white">Edit</Link>
                        )}
                      </div>
                      <div className="card-footer bg-transparent">
                        <div>
                          <span className="border-end border-dark pe-2">
                            77.18 Ping
                            <span>(2746.31 sq.ft)</span>
                          </span>
                        </div>

                        <div className="d-flex justify-content-between d-block">
                          <span>MRT： {property.mrt}</span>
                          <span
                            className="d-flex align-items-end badge bg-primary p-2"
                          >
                            BL
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                      >
                        Previous
                      </a>
                    </li>
                    {[...Array(5)].map((_, index) => (
                      <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(index + 1);
                          }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === 5 ? 'disabled' : ''}`}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < 5) handlePageChange(currentPage + 1);
                        }}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default Home;
