import React,{ useState,useEffect } from 'react';
import RecipeListView from './RecipeListView';

const RecipeListContainer = (props) => {
  const { recipes, handleRecipeClick } = props;
    const [currPage, setcurrPage] = useState(1);
    const [currRecipes, setcurrRecipes] = useState([]);

    useEffect(() => {
        const resPerPage = 10;
        const start = (currPage - 1) * resPerPage;
        const end = currPage * resPerPage;
    
        const newCurrRecipes = recipes.slice(start, end);
        setcurrRecipes(newCurrRecipes);
    }, [recipes,currPage])

   
  const handlePageChange = (e) => {
    e.preventDefault();
    const btn = e.target.closest('.btn-inline');
    if (btn) {
      const goToPage = btn.dataset.goto * 1;
      setcurrPage(goToPage);
    }
  }

    return <RecipeListView handleRecipeClick={handleRecipeClick} handlePageChange={handlePageChange} totalRecipes={recipes.length} currPage={currPage} recipes={currRecipes} />;
       
}

export default RecipeListContainer;
