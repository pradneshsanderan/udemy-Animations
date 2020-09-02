import React, { useState,useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => prevIngredients.filter((
      ingredient) => ingredient.id !== ingredientId));
  };
 
  const filteredIngredientsHandler = useCallback(filteredIngredients =>{
    setUserIngredients(filteredIngredients);
  },[]);

  const addIngredientHandler = ingredient => {
    fetch('https://hooks-2814c.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [...prevIngredients,
      { id: responseData.name, ...ingredient }]
      );
    });

  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {removeIngredientHandler}} />
      </section>
    </div>
  );
}

export default Ingredients;
