import React from 'react'
import { Fraction } from 'fractional';

import './recipe.css'

const RecipeView = (props) => {
  const { recipe,likes,handleServingChange,handleLikesChange,handleAddIngredients } = props;

  const formatCount = (count) => {
    if (count) {
      // count = 2.5 ----> 2 1/2
      // count = 0.5 ----> 1/2
      const [int, dec] = count
        .toString()
        .split('.')
        .map((el) => parseInt(el, 10));
  
      if (!dec) return count;
  
      if (int === 0) {
        const fr = new Fraction(count);
        return `${fr.numerator}/${fr.denominator}`;
      } else {
        const fr = new Fraction(count - int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
      }
    }
  };

  const renderIngredient = (ingredient,index) => {
   return  <li key={index} className="recipe__item">
   <svg className="recipe__icon">
   <title>check</title>
   <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
   </svg>
   <div className="recipe__count">{formatCount(ingredient.count)}</div>
   <div className="recipe__ingredient">
       <span className="recipe__unit">{ingredient.unit}</span> {' '}
       {ingredient.ingredient}
   </div>
     </li>
  }

  const renderRecipe = () => {
    if (!recipe) {
      return null;
    }

    const isLiked = likes.find(likedRecipe => likedRecipe.id === recipe.url);

    const heart =  <><title>heart</title> <path d="M17.19 4.155c-1.672-1.534-4.383-1.534-6.055 0l-1.135 1.042-1.136-1.042c-1.672-1.534-4.382-1.534-6.054 0-1.881 1.727-1.881 4.52 0 6.246l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.246z"></path></>;
    const heartOutlined = <><title>heart-outlined</title> <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path></>;

    return (
      <>
  <figure className="recipe__fig">
    <img src={recipe.img} alt={recipe.title} className="recipe__img" />
    <h1 className="recipe__title">
      <span>{recipe.title}</span>
    </h1>
  </figure>
  <div className="recipe__details">
    <div className="recipe__info">
      <svg className="recipe__info-icon">
        <title>stopwatch</title>
        <path d="M7.376 6.745c-0.447 0.275 1.197 4.242 1.598 4.888 0.35 0.569 1.093 0.742 1.658 0.394 0.568-0.352 0.745-1.094 0.395-1.66-0.397-0.648-3.205-3.898-3.651-3.622zM7.041 2.402c0.928-0.323 1.922-0.502 2.959-0.502s2.031 0.179 2.959 0.502c0.329 0.114 0.765-0.115 0.572-0.611-0.141-0.36-0.277-0.712-0.332-0.855-0.131-0.339-0.6-0.619-0.804-0.665-0.772-0.174-1.572-0.271-2.395-0.271s-1.623 0.097-2.396 0.271c-0.204 0.046-0.672 0.326-0.803 0.665-0.055 0.143-0.192 0.495-0.332 0.855-0.193 0.496 0.243 0.726 0.572 0.611zM19.098 3.186c-0.192-0.23-0.396-0.455-0.613-0.672-0.216-0.217-0.441-0.42-0.67-0.613-0.153-0.129-0.603-0.234-0.888 0.051s-1.648 1.647-1.648 1.647c0.402 0.288 0.793 0.605 1.155 0.966s0.677 0.752 0.966 1.155c0 0 1.363-1.362 1.647-1.647 0.286-0.286 0.181-0.735 0.051-0.887zM10 2.9c-4.475 0-8.101 3.626-8.101 8.1s3.626 8.101 8.101 8.101c4.473 0 8.1-3.626 8.1-8.101 0-4.473-3.627-8.1-8.1-8.1zM10 17.101c-3.368 0-6.1-2.731-6.1-6.1s2.731-6.1 6.1-6.1c3.369 0 6.101 2.731 6.101 6.1s-2.732 6.1-6.101 6.1z"></path>
      </svg>
      <span className="recipe__info-data recipe__info-data--minutes">
        {recipe.time}
      </span>
      <span className="recipe__info-text"> minutes</span>
    </div>
    <div className="recipe__info">
      <svg className="recipe__info-icon">
        <title>man</title>
        <path d="M10 4c1.104 0 2-0.896 2-2s-0.896-2-2-2-2 0.895-2 2c0 1.104 0.896 2 2 2zM15.978 11.583c-0.385-1.775-1.058-4.688-2.042-5.894-0.957-1.173-2.885-1.222-3.936-1.222v0c-1.051 0-2.979 0.049-3.936 1.222-0.984 1.206-1.657 4.119-2.042 5.894-0.213 0.983 1.154 1.344 1.511 0.355 0.531-1.473 0.941-2.71 1.839-3.736 0.472 2.907-1.27 7.966-1.372 10.798 0 0.552 0.448 1 1 1 0.426 0 0.79-0.266 0.934-0.642 0.457-1.587 2.066-6.003 2.066-6.003v0 0c0 0 1.609 4.416 2.066 6.003 0.144 0.376 0.508 0.642 0.934 0.642 0.552 0 1-0.448 1-1-0.102-2.832-1.844-7.891-1.372-10.797 0.898 1.026 1.308 2.263 1.839 3.736 0.356 0.988 1.724 0.627 1.511-0.356z"></path>
      </svg>
      <span className="recipe__info-data recipe__info-data--people">
        {recipe.servings}
      </span>
      <span className="recipe__info-text"> servings</span>

      <div className="recipe__info-buttons">
        <button onClick={() => handleServingChange('dec')} className="btn-tiny btn-decrease">
          <svg>
            <title>circle-with-minus</title>
            <path d="M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-10v-2h10v2z"></path>
          </svg>
        </button>
        <button onClick={() => handleServingChange('inc')} className="btn-tiny btn-increase">
          <svg>
            <title>circle-with-plus</title>
            <path d="M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <button onClick={handleLikesChange} className="recipe__love">
      <svg className="header__likes">{isLiked ? heart : heartOutlined}</svg>
    </button>
  </div>

  <div className="recipe__ingredients">
    <ul className="recipe__ingredient-list">
        {recipe.ingredients.map(renderIngredient)}
    </ul>

    <button onClick={handleAddIngredients} className="btn-small recipe__btn recipe__btn--add">
      <svg className="search__icon">
        <title>shopping-cart</title>
        <path d="M13 17c0 1.104 0.894 2 2 2 1.104 0 2-0.896 2-2 0-1.106-0.896-2-2-2-1.106 0-2 0.894-2 2zM3 17c0 1.104 0.895 2 2 2 1.103 0 2-0.896 2-2 0-1.106-0.897-2-2-2-1.105 0-2 0.894-2 2zM6.547 12.172l11.068-3.162c0.211-0.061 0.385-0.289 0.385-0.51v-5.5h-14v-1.6c0-0.22-0.181-0.4-0.399-0.4h-3.202c-0.219 0-0.399 0.18-0.399 0.4v1.6h2l1.91 8.957 0.090 0.943v1.649c0 0.219 0.18 0.4 0.4 0.4h13.2c0.22 0 0.4-0.182 0.4-0.4v-1.549h-11.248c-1.15 0-1.174-0.551-0.205-0.828z"></path>
      </svg>
      <span>Add to shopping list</span>
    </button>
  </div>

  <div className="recipe__directions">
    <h2 className="heading-2">How to cook it</h2>
    <p className="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span className="recipe__by">{recipe.author}</span>. Please check out
      directions at their website.
    </p>
    <a
      className="btn-small recipe__btn"
      href={recipe.url}
      target="_blank"
      rel="no_referrer noreferrer"
    >
      <span>Directions</span>
      <svg className="search__icon">
        <title>triangle-right</title>
        <path d="M15 10l-9 5v-10l9 5z"></path>
      </svg>
    </a>
        </div>
        </>
    )
}

return (
  <div className="recipe">
    {renderRecipe()}
  </div>
  ) 
}

export default RecipeView;
