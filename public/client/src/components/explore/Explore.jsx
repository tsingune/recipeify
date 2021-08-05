import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Search from '../search';
import RecipeList from '../recipeList';
import Recipe from '../recipe';
import Navbar from '../navbar';
import IngredientList from '../ingredientlist';
import RecipeModel from '../recipe/Recipe';
import IngredientListModel from '../ingredientlist/IngredientList';
import './explore.css';

const Explore = (props) => {
  const [recipes, setrecipes] = useState([]);
  const [likes, setlikes] = useState([]);
  const [ingredientList, setingredientList] = useState(new IngredientListModel());
  const [recipe, setrecipe] = useState(null);
  const { isSignedIn } = props;

  useEffect(() => {
    const newLikes = JSON.parse(localStorage.getItem('likes')) || [];
    setlikes(newLikes);
  }, [props])

  const handleSearch = (recipes) => {
    setrecipes(recipes);
  }

  async function setRecipe(recipeID) {
     try {
      const response = await axios(
        `https://api.edamam.com/search?r=${recipeID}&app_id=62eb726e&app_key=c549d5297fef0d7993bab4f51696d354`
      );
      const data = response.data[0];
       const newRecipe = new RecipeModel(data);

       newRecipe.calcTime();
       newRecipe.calcServings();
       newRecipe.parseIngredients();

      setrecipe(newRecipe);
    } catch (err) {
      alert('Something went wrong :(');
    }
  }

  const handleRecipeClick = (e) => {
    const { id } = e.target.closest(".results__link__li");
    setRecipe(id);
  }

  const handleServingChange = (type) => {
    const newRecipe = Object.create(recipe);
    recipe.updateServings(type);
    setrecipe(newRecipe);
  }

  const handleLikesChange = (e) => {
    e.preventDefault();
    let newLikes;

    if (likes.find(like => like.id === recipe.url)) {
       newLikes = likes.filter(like => like.id !== recipe.url);
    } else {
      const newLike = { id:recipe.url,title:recipe.title,author:recipe.author,img:recipe.img };
      newLikes = [...likes, newLike];
    }

    localStorage.setItem('likes',JSON.stringify(newLikes));
    setlikes(newLikes);
  }

  const handleAddIngredients = (e) => {
    e.preventDefault();
    const newIngredientList = new IngredientListModel();

    recipe.ingredients.forEach((el) => {
      newIngredientList.addItem(el.count, el.unit, el.ingredient);
    });

    setingredientList(newIngredientList);
  }

  const handleIngredientsChange = (id, newCount) => {
    const newIngredientList = Object.create(ingredientList);
    newIngredientList.updateCount(id, newCount);

    setingredientList(newIngredientList);
  }

  const handleIngredientsDelete = (id) => {
    const newIngredientList = Object.create(ingredientList);
    newIngredientList.deleteItem(id);
    setingredientList(newIngredientList);
  }

  return (
    <>
    <Navbar signedIn={isSignedIn} />
    <div className="container">
      <Search likes={likes} handleSearch={handleSearch} />
      <RecipeList handleRecipeClick={handleRecipeClick} recipes={recipes} />
      <Recipe likes={likes} handleAddIngredients={handleAddIngredients} handleLikesChange={handleLikesChange} handleServingChange={handleServingChange} recipe={recipe} />
      <IngredientList handleIngredientsDelete={handleIngredientsDelete} handleIngredientsChange={handleIngredientsChange} ingredients={ingredientList.items} />
    </div>
    </>
  );
}

export default Explore;
