import React, { useState,useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorMOdal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
const [error,setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://hooks-2814c.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
       
    }).then(response =>{
      setIsLoading(false);
    setUserIngredients(prevIngredients => prevIngredients.filter((
      ingredient) => ingredient.id !== ingredientId));
    }).catch(error =>{
      setError('Dev Fucked Up');
      setIsLoading(false);
    });
  };
 
  const filteredIngredientsHandler = useCallback(filteredIngredients =>{
    setUserIngredients(filteredIngredients);
  },[]);
  const clearError = () => {
    setError(null);
    
  }

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://hooks-2814c.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false);
      response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [...prevIngredients,
      { id: responseData.name, ...ingredient }]
      );
    });

  };
  return (
    <div className="App">
      {error && <ErrorMOdal onClose={clearError}>{error}</ErrorMOdal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {removeIngredientHandler}} />
      </section>
    </div>
  );
}

export default Ingredients;
