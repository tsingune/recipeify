import React from 'react';

import './likes.css';

const Likes = (props) => {
    const { likes } = props;

    const limitRecipeTitle = (title, limit = 30) => {
        const newTitle = [];
      
        if (title.length > limit) {
          title.split(' ').forEach((acc, curr) => {
            if (acc + curr.length <= limit) {
              newTitle.push(curr);
            }
          }, 0);
      
          return `${newTitle.join(' ')}...`;
        }
        return title;
    };
    
    const renderlikes = () => {
        return likes.map(recipe => {
            return (
                <li key={recipe.id}>
                <a className="likes__link" href={recipe.id}>
                <figure className="likes__fig">
                    <img src={recipe.img} alt="Test" />
                </figure>
                <div className="likes__data">
                    <h4 className="likes__name">{limitRecipeTitle(recipe.title)}</h4>
                    <p className="likes__author">{recipe.author}</p>
                </div>
                </a>
            </li>
            )
        })
    }

    return (
        <ul className="likes__list">
            {renderlikes()}
        </ul>
    )
}

export default Likes;
