import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from '../actions/property';
import {Link} from 'react-router-dom';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const FavoriteProperties = () => {
  const dispatch = useDispatch();
  const favoriteProperties = useSelector(state => state.properties.favorites);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchFavorites());
    console.log("FavoriteProperties rendered");
  }, [dispatch]);

  return (
    <div id="content" className="">
      <Header />

      <div className="listing">
        <div className="search-result">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {favoriteProperties && favoriteProperties.map(property => (
                <div className="col mb-3">
                  <a href="#" className="my-5">
                    <div className="card h-100 shadow">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                        className="card-img-top"
                        alt="Skyscrapers"
                      />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteProperties;
