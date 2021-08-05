import React from 'react';
import { Link } from 'react-router-dom';

import './signUpView.css';

function SignUpView({ onInputChange, fields, errors, onSubmit }) {

  return (
    <div className="signup-container">
    <div className="signup-container-content">
        <div className="signup-left-img-wrapper">
            <img src="/static/images/signup-food.jpg" alt="food" className="signup-left-img" />
        </div>
        <div className="signup-form-wrapper">
        <form onSubmit={onSubmit} className="signup-form">
            <h1 className="signup-heading">Registration Info</h1>

            <div className="signup-input-box">
                <label></label>
                <input onChange={onInputChange} value={fields.name} name="name" id="name" placeholder="Name" type="text" />
            </div>

            <div className="signup-input-box">
                <label></label>
                <input onChange={onInputChange} value={fields.email} name="email" id="email" placeholder="Email" type="text" />
            </div>

            <div className="signup-input-box">
                <label></label>
                <input onChange={onInputChange} value={fields.password} name="password" id="password" placeholder="Password" type="password" />
            </div>

            
            <div className="signup-input-box">
                <label></label>
                <input onChange={onInputChange} value={fields.passwordConfirm} name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password" type="password" />
            </div>

            <div className="signup-btn-wrapper">
                <button className="signup-btn">Signup</button>
            </div>

            <div className="already-account">
                Already Have an account? <Link to={{pathname:"/login"}}>Login</Link>
            </div>
        </form>
    </div>
    </div>
</div>
  );
}
export default SignUpView;
