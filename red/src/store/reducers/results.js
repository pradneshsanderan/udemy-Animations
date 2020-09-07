import * as actionTypes from '../actions';
const initialState = {
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({val:action.result, id: new Date()})
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