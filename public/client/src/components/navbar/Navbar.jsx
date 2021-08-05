import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../auth/Auth';
import Logout from '../logout/Logout';
import './navbar.css';

const Navbar = (props) => {
  const [user, signedIn] = useAuth(props.user, props.isSignedIn);

    return (
        <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            Recipeify
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div className="nav-links">
          <Link to={{pathname:"/"}} >Home</Link>
          <Link to={{pathname:"/explore"}} >Explore</Link>
          {signedIn && <Link to={{pathname:"/addRecipe"}} >Add Recipe</Link>}
          {!signedIn && <Link to={{pathname:"/signup"}}>Signup</Link>}
          {!signedIn && <Link to={{ pathname: "/login" }}>Login</Link>}
          {signedIn && <Logout />}
        </div>
      </div>
    )
}

export default Navbar;
