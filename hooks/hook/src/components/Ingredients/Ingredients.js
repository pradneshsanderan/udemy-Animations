import React, { useReducer, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorMOdal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, actions) => {
  switch (actions.type) {
    case 'SET':
      return actions.ingredients;
    case 'ADD':
      return [...currentIngredients, actions.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== actions.id);
    default:
      throw new Error('fucked up');
  }
}

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorData };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('fucked up');
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: false });

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://hooks-2814c.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',

    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' })
      // setUserIngredients(prevIngredients => prevIngredients.filter((
      //   ingredient) => ingredient.id !== ingredientId));
      dispatch({ type: 'DELETE', id: ingredientId });
    }).catch(error => {
      setError('Dev Fucked Up');
      dispatchHttp({ type: 'ERROR', errorData: 'fucked up' })
    });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredient: filteredIngredients });
  }, []);


  const clearError = () => {
    dispatchHttp({type:'CLEAR'});

  }

  const addIngredientHandler = ingredient => {
    dispatchHttp({ type: 'SEND' });
    fetch('https://hooks-2814c.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' });
      response.json();
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [...prevIngredients,
      // { id: responseData.name, ...ingredient }]
      // );
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    });

  };
  return (
    <div className="App">
      {httpState.error && <ErrorMOdal onClose={clearError}>{httpState.error}</ErrorMOdal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => { removeIngredientHandler }} />
      </section>
    </div>
  );
}

export default Ingredients;
