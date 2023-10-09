import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Cart from "./components/Cart";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import PropertyUpdate from './components/PropertyUpdate';
import FavoriteProperties from './components/FavoriteProperties';
// import './bootstrap.min.js'


function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/property-search" element={<Home />} />
            <Route path="/properties/:id/edit" element={<PropertyUpdate />} />
            <Route path="/favorites" element={<FavoriteProperties />} />
          </Routes>
      </Router>
    </Provider>  
  );
}

export default App;
