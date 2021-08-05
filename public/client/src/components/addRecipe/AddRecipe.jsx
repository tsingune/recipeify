// Third Party Imports
import React, { useState } from 'react';

// Project Imports
import AddRecipeView from './AddRecipeView';
import RecipeifyAPI from '../../api/RecipeifyAPI';
import errorController from '../error/errorController';

function AddRecipe() {

  // Fields state
  const initialFields = { title: 'TEST23', URL: 'TEST23', image: 'TEST23', publisher: 'TEST23', prepTime: '23', servings: 23,ingredients:['0.5,kg,Rice','1,,Avocado',',,salt','','',''] };

  const [fields, setfields] = useState(initialFields);

  // Errors State
  const initialErrors = {};
  const [errors, setErrors] = useState(initialErrors);

  // Form valid state
  const initialFormValid = false;
  const [formValid, setformValid] = useState(initialFormValid);

  // Validation handling
  function handleValidation(fields) {
    let errors = {};
    let formIsValid = true;

    if (!fields['title']) {
      formIsValid = false;
      errors['title'] = 'Please provide title';
    }

    if (!fields['URL']) {
      formIsValid = false;
      errors['URL'] = 'Please provide URL';
    }

    if (!fields['image']) {
      formIsValid = false;
      errors['image'] = 'Please provide image';
    }

    if (!fields['publisher']) {
      formIsValid = false;
      errors['publisher'] = 'Please provide publisher';
    }

    if (!fields['prepTime']) {
      formIsValid = false;
      errors['prepTime'] = 'Please provide prepTime';
    }

    if (!fields['servings']) {
      formIsValid = false;
      errors['servings'] = 'Please provide servings';
    }

    if (fields.ingredients.filter(ingredient => ingredient === "").length > 0) {
      formIsValid = false;
      errors['ingredients'] = 'Please provide ingredients';
    }

    setErrors(errors);
    setformValid(formIsValid);
  }

  // Input handle
  const onInputChange = (event) => {
    // Get input id as name, and value
    const { name, value } = event.target;

    // Create fields object with new value
    let newFields = { ...fields, [name]: value };
    // Set state to new value
    setfields(newFields);

    // Handle validation using new value
    handleValidation(newFields);
  };

// Input handle
const onIngredientsChange = (event) => {
  // Get input id as name, and value
  const { id, value } = event.target;

  // Create fields object with new value
  let ingredients = [...fields.ingredients];
  ingredients[id] = value;
  let newFields = { ...fields, ingredients };
  // Set state to new value
  setfields(newFields);

  // Handle validation using new value
  handleValidation(newFields);
};

  // Form submission
  const onSubmit = async (event) => {
    // Prevent default event (Refresh)
    event.preventDefault();

    // Form not valid return alert
    if (!formValid) {
      return alert('Form is not valid');
    }

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Send data to API
      await RecipeifyAPI.post(`/recipes`, fields,config);

      setfields(initialFields);

      alert('Successfully added recipe');
    } catch (err) {
      errorController(err.response);
    }
  };

  function render() {
    return (
      <AddRecipeView
        fields={fields}
        onInputChange={onInputChange}
        onIngredientsChange={onIngredientsChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    );
  }

  return render();
}

export default AddRecipe;
