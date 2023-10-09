import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { Navigate, useNavigate  } from 'react-router-dom';
import logo from '../logo.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    // setLoading(true);

    // form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
    dispatch(login(username, password))
    .then(() => {
        debugger
        navigate("/property-search");
    })
    .catch((error) => {
        debugger
        setError(error?.response?.data?.error || "Login failed. Please check your credentials.");
    });
  };


  if (isLoggedIn) {
    return <Navigate to="/property-search" />;
  }

  return (
    <div id="wrapper" class="h-100 mt-4">
		<div class="d-flex align-items-center justify-content-center h-100">
			<div class="col-md-6 col-lg-4 mx-auto">
				<form class="user-form p-4 p-md-5 border rounded bg-white shadow-sm" onSubmit={handleLogin}>
					<div class="logo text-center mx-auto mb-3">
						<a href="#">
							<img src={logo} class="img-fluid mx-auto" width="300" />
						</a>
					</div>
					<div class="mb-4">
					    <label for="Email" class="form-label">Email</label>
					    <input 
                            type="email" 
                            class="form-control" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
					</div>
					<div class="mb-4">
					    <label for="exampleInputPassword1" class="form-label">Password</label>
					    <input type="password" class="form-control" id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
					</div>
                    {error && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    )}
					<div class="mb-4">
						<input type="submit" value="Log In" class="btn btn-primary w-100" />
					</div>
					<div class="text-center">
						<div class="or-text mb-3 grey-txt text-uppercase">
							<span class="border rounded d-inline-block px-2">Or</span>
						</div>
						<a href="/signup">Sign Up</a>
					</div>
				</form>
			</div>
		</div>
    </div>
  );
};

export default Login;
