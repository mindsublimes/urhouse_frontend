import React, { useCallback } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import logo from '../logo.png';


function Navbar() {
  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div class="logo text-center mx-auto mb-3">
						<a href="#">
							<img src={logo} class="img-fluid mx-auto" width="300" />
						</a>
				</div>
        <ul className="navbar-links">
          {!isLoggedIn && (
            <>
              <li className="navbar-link">
                <Link to="/">Login</Link>
              </li>
              <li className="navbar-link">
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li className="navbar-link">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="navbar-link">
                <Link to="/" onClick={logOut}>Log out</Link>
              </li>
            </>
          )}
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
