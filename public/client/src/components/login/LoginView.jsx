// Third Party Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Project Imports

// Styles
import './LoginView.css';

function LoginView({ onInputChange, fields, errors, onSubmit }) {

  return (
    <div className="login-container">
        <div className="login-container-content">
            <div className="login-left-img-wrapper">
                <img src="/static/images/signup-food.jpg" alt="food" className="login-left-img">
                </img>
            </div>
            <div className="login-form-wrapper">
            <form onSubmit={onSubmit} className="login-form">
                <h1 className="login-heading">Login Details</h1>
                <div className="login-input-box">
                    <label></label>
                    <input onChange={onInputChange} value={fields.email} name="email" id="email" placeholder="Email" type="text" />
                </div>

                <div className="login-input-box">
                    <label></label>
                    <input onChange={onInputChange} value={fields.password} name="password" id="password" placeholder="Password" type="password" />
                </div>
                
                <div className="login-btn-wrapper">
                    <button className="login-btn">login</button>
                </div>

                <div className="already-account">
                    New User? <Link to={{pathname:"/signup"}}>Signup</Link>
                </div>
            </form>
        </div>
        </div>
    </div>
  );
}
export default LoginView;
