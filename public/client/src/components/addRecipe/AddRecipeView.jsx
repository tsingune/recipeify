import React from 'react';

import Navbar from '../navbar';
import './AddRecipeView.css';

function SignUpView({ onInputChange, fields, errors, onSubmit,onIngredientsChange }) {

  return (
      <>
        <Navbar />
      <div className="add-recipe">
  <div className="add-recipe-box">
    <div className="add-recipe-box-content">
      <form onSubmit={onSubmit} className="add-recipe-form">
        <div className="add-recipe-form-row">
          <div className="add-recipe-col">
          <div className="add-recipe-heading">RECIPE DATA</div>
          <div className="add-recipe-inputs">
            <div className="add-recipe-input-container">
              <label>Title</label>
              <input onChange={onInputChange} value={fields.title} required name="title" type="text" />
            </div>

            <div className="add-recipe-input-container">
              <label>URL</label>
              <input onChange={onInputChange} value={fields.URL} required name="URL" type="text" />
            </div>

            <div className="add-recipe-input-container">
              <label>Image URL</label>
              <input onChange={onInputChange} value={fields.image} required name="image" type="text" />
            </div>

            <div className="add-recipe-input-container">
              <label>Publisher</label>
              <input onChange={onInputChange} value={fields.publisher} required name="publisher" type="text" />
            </div>

            <div className="add-recipe-input-container">
              <label>Prep time</label>
               <input onChange={onInputChange} value={fields.prepTime} required name="prepTime" type="number" />
            </div>

            <div className="add-recipe-input-container">
              <label>Servings</label>
              <input onChange={onInputChange} value={fields.servings} required name="servings" type="number" />
            </div>
          </div>
        </div>
                
                <div className="add-recipe-col">
          <div className="add-recipe-heading">Ingredients</div>

          <div className="add-recipe-inputs">
            <div className="add-recipe-input-container">
              <label>Ingredient 1</label>
              <input onChange={onIngredientsChange}
                id={0}
                value={fields.ingredients[0]}
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <div className="add-recipe-input-container">
              <label>Ingredient 2</label>
              <input onChange={onIngredientsChange}
                id={1}
                value={fields.ingredients[1]}
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <div className="add-recipe-input-container">
              <label>Ingredient 3</label>
              <input onChange={onIngredientsChange}
                id={2}
                value={fields.ingredients[2]}
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <div className="add-recipe-input-container">
              <label>Ingredient 4</label>
               <input onChange={onIngredientsChange}
                id={3}
                value={fields.ingredients[3]}
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <div className="add-recipe-input-container">
              <label>Ingredient 5</label>
              <input onChange={onIngredientsChange}
                id={4}
                value={fields.ingredients[4]}
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <div className="add-recipe-input-container">
              <label>Ingredient 6</label>
              <input onChange={onIngredientsChange}
                id={5}
                value={fields.ingredients[5]}
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>
          </div>
          </div>
        </div>

        <div className="add-recipe-form-row">
          <button className="btn add-recipe-btn">
            <svg>
              <use href="static/images/icons.svg#icon-upload-cloud"></use>
            </svg>
            <span>Upload</span>
          </button>
        </div>              
      </form>
    </div>
  </div>
      </div>
      </>
  );
}
export default SignUpView;
