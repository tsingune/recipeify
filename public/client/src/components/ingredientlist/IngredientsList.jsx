import React from 'react';

import './ingredient-list.css';

const IngredientsList = (props) => {
    const { ingredients,handleIngredientsChange,handleIngredientsDelete } = props;

    const onInputChange = (e) => {
        e.preventDefault();
        const id = e.target.closest('.shopping__item').dataset.itemid;
        const value  = parseFloat(e.target.value,10);
        handleIngredientsChange(id, value);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        handleIngredientsDelete(e.target.closest('.shopping__item').dataset.itemid);
    }

    const renderIngredient = (ingredient) => {
        return (
            <li key={ingredient.id} className="shopping__item" data-itemid={ingredient.id}>
                <div className="shopping__count">
                    <input onChange={onInputChange} type="number" value={ingredient.count} step={10} className="shopping__count-value" />
                    <p>{ingredient.unit}</p>
                </div>
                <p className="shopping__description">{ingredient.ingredient}</p>
                <button onClick={handleDelete} className="shopping__delete btn-tiny">
                    <svg>
                        <title>circle-with-cross</title>
                        <path d="M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM14.789 13.061l-1.729 1.729-3.060-3.061-3.061 3.060-1.729-1.729 3.062-3.060-3.061-3.061 1.729-1.728 3.060 3.060 3.061-3.061 1.729 1.729-3.062 3.061 3.061 3.061z"></path>
                    </svg>
                </button>
            </li>
        );
    }

    const renderIngredients = () => {
        if (!ingredients) {
            return null;
        }

        return ingredients.map(renderIngredient);
    }

    return (
        <div className="shopping">
            <h2 className="heading-2">My Shopping List</h2>

            <ul className="shopping__list">
            {renderIngredients()}
            </ul>

            <div className="copyright">
            &copy; by Team Recipeify
            </div>
        </div>
)
}

export default IngredientsList;
