import React, { useState } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
  const [ userIngredients, setUserIngredients] = useState([]);
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients=>prevIngredients.filter((
      ingredient) => ingredient.id !== ingredientId));
  };
  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [...prevIngredients,
       {id:Math.random().toString(), ...ingredient }]);
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={()=> {removeIngredientHandler}}/>
      </section>
    </div>
  );
}

export default Ingredients;
