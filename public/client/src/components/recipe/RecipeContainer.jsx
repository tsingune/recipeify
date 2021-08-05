import React from 'react';
import RecipeView from './RecipeView';

const RecipeContainer = (props) => {
  const { recipe, likes, handleServingChange,handleLikesChange,handleAddIngredients } = props;

  return <RecipeView recipe={recipe} likes={likes} handleServingChange={handleServingChange} handleLikesChange={handleLikesChange} handleAddIngredients={handleAddIngredients} />;
}

export default RecipeContainer;
