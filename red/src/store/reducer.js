import * as actionTypes from './actions';
const initialState = {
    counter: 0,
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({val:state.counter, id: new Date()})
            }
        case actionTypes.DELETE_RESULT :
            const updatedArray = state.results.filter((result,index) => result.id !== action.id );
            return{
                ...state,
                result:updatedArray
            }


    }

    return state;
};

export default reducer