/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './home-page.css';

function HomePage() {
    const [active, setactive] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setactive(active => !active);
    }

    return (
        <div className="homepage">
            <section className={`showcase ${active && 'active'}`}>
                <header className="homepage-header">
                <h2 className="homepage-logo">Recipeify</h2>
                <div onClick={handleClick} className={`homepage-toggle ${active && 'active'}`}></div>
                </header>
                <video src="/static/videos/food3.mp4" muted loop autoPlay />
                <div className="homepage-overlay"></div>
                <div className="homepage-text">
                <h2>LIVE, LOVE, EAT.</h2>
                <Link to={{pathname:"/explore"}} >Explore</Link>
                </div>
                <ul className="homepage-social">
                <li><a href="#"><img src="https://i.ibb.co/x7P24fL/facebook.png" alt="social" /></a></li>
                <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="social" /></a></li>
                <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="social" /></a></li>
                </ul>
            </section>
            <div className="homepage-menu">
                <ul>
                <li><Link to={{pathname:"/"}}>Home</Link></li>
                <li><Link to={{pathname:"/explore"}}>Explore</Link></li>
                <li><Link to={{pathname:"/signup"}}>Signup</Link></li>
                <li><Link to={{pathname:"/login"}}>Login</Link></li>
                <li><Link to={{pathname:"/addRecipe"}}>Add Recipe</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default HomePage;
