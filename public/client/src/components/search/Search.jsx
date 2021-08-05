import React, { useState } from 'react'
import axios from 'axios';

import Likes from '../likes';
import './search.css'

const Search = (props) => {
    const [searchQuery, setsearchQuery] = useState('');
    const { handleSearch,likes } = props;

    const getRecipes = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
              `https://api.edamam.com/search?q=${searchQuery}&app_id=62eb726e&app_key=c549d5297fef0d7993bab4f51696d354&from=0&to=30`
            );
            const recipes = response.data.hits;
            handleSearch(recipes);
          } catch (err) {
            alert(err);
          }
    }

    return (
        <header className="header">
            <img
                src="/static/images/search/logo.jpg"
                alt="Logo"
                className="header__logo"
            />
            <form onSubmit={getRecipes} className="search">
                <input
                    type="text"
                    className="search__field"
                    placeholder="Search over 1,000,000 recipes..."
                    value={searchQuery}
                    onChange={e=> setsearchQuery(e.target.value)}
                />
                <button type="submit" className="btn search__btn">
                    <svg className="search__icon">
                        <title>magnifying-glass</title>
                        <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
                    </svg>
                    <span>Search</span>
                </button>
            </form>
            <div className="likes">
                <div className="likes__field">
                    <svg className="likes__icon" viewBox="0 0 20 20">
                        <title>heart</title>
                        <path d="M17.19 4.155c-1.672-1.534-4.383-1.534-6.055 0l-1.135 1.042-1.136-1.042c-1.672-1.534-4.382-1.534-6.054 0-1.881 1.727-1.881 4.52 0 6.246l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.246z"></path>
                    </svg>
                </div>
                <div className="likes__panel">
                    <Likes likes={likes} />
                </div>
            </div>
        </header>
    );
}

export default Search
