import React, { useCallback} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import logo from '../logo.png';

const Header = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
      <header id="header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" className="w-100" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link to="/" className='nav-link'>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/signup" className='nav-link'>Sign up</Link>
                    </li>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <li className="navbar-item">
                      <Link to="/property-search" className='nav-link'>Home</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/favorites" className='nav-link'>My Favorites</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/" className='nav-link' onClick={logOut}>Log out</Link>
                    </li>
                  </>
                )}
                {/* Add more links as needed */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
  );
}
  

export default Header;
