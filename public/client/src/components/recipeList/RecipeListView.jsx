/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import './recipe-list.css'

const RecipeListView = (props) => {
  const { recipes,currPage,totalRecipes,handlePageChange,handleRecipeClick } = props;

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
  
  const renderRecipe = ({ recipe }) => {
    const shortenedTitle = limitRecipeTitle(recipe.label);
    const encodedURI = encodeURIComponent(recipe.uri);
  
    return (
      <li id={encodedURI} className="results__link__li" onClick={handleRecipeClick} key={recipe.uri}>
      <a className="results__link">
          <figure className="results__fig">
              <img src={recipe.image} alt={recipe.label} />
          </figure>
          <div className="results__data">
              <h4 className="results__name">{shortenedTitle}</h4>
              <p className="results__author">{recipe.source}</p>
          </div>
      </a>
      </li>
    );
  };
  
  const createButton = (page, type) => {
    return (
      <button onClick={handlePageChange} className={`btn-inline results__btn--${type}`} data-goto={type === 'prev' ? page - 1 : page + 1}>
        <span>Page {type === 'prev' ? page - 1 : page + 1}</span>
        {
          type === 'prev'
            ?
            <svg className="search__icon">
              <title>triangle-left</title><path d="M14 5v10l-9-5 9-5z"></path>       
            </svg>
            :
            <svg className="search__icon">
              <title>triangle-right</title><path d="M15 10l-9 5v-10l9 5z"></path>
            </svg>
        }
      </button>
    )
  };
  
  const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if (page === 1 && pages > 1) {
      // Button to go to next page
      return createButton(page, 'next');
    } else if (page < pages) {
      //Both Buttons
      return (
        <>
          {createButton(page, 'prev')}
          {createButton(page, 'next')}
        </>
      );
    } else if (page === pages && pages > 1) {
      // Button to go to prev page
      return createButton(page, 'prev');
    }
  };
  
  const renderRecipes = () => {
    const resPerPage = 10;
    
     return (
       <div>
         <ul className="results__list">
            {recipes.map(renderRecipe)}
         </ul>
         <div className="results__pages">
            {renderButtons(currPage, totalRecipes, resPerPage)}
          </div>
       </div>
     )
  };
  

  return (
    <div className="results">
      {renderRecipes()}
    </div>
  );
}

export default RecipeListView;
