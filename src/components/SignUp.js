import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import logo from '../logo.png';
import '../App.css'


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();

  
    dispatch(register(email, password, confirmPassword))
    .then(() => {
        setSuccessful(true);
    })
    .catch((error) => {
        setSuccessful(false);
    });
  };

  return (
    <div id="wrapper" class="h-100 mt-4">
    <div class="d-flex align-items-center justify-content-center h-100">
			<div class="col-md-6 col-lg-4 mx-auto">
				<form class="user-form p-4 p-md-5 border rounded bg-white shadow-sm" onSubmit={handleSignup}>
					<div class="logo text-center mx-auto mb-3">
						<a href="#">
              <img src={logo} class="img-fluid mx-auto" width="300" />
						</a>
					</div>
					<div class="mb-4">
					    <label for="Email" class="form-label">Email</label>
              <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
              />
					</div>
					<div class="mb-4">
					    <label for="exampleInputPassword1" class="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
					</div>
					<div class="mb-4">
					    <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
					</div>
          {message && !successful && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {message && successful && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                Registration completed
              </div>
            </div>
          )}
					<div class="mb-4">
						<input type="submit" value="Sign Up" class="btn btn-primary w-100"/>
					</div>
					<div class="text-center">
						<div class="or-text mb-3 grey-txt text-uppercase">
							<span class="border rounded d-inline-block px-2">Or</span>
						</div>
						<a href="/">Log In</a>
					</div>
				</form>
			</div>
		</div>
    </div>
  );
};

export default Signup;
