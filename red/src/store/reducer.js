
const initialState = {
    counter:0,
}

const reducer = (state = initialState, action) => {
    if(actions.type === 'INCREMENT') {
        return{
            counter: state.counter +1
        }
    }
    if(actions.type === 'DECREMENT') {
        return{
            counter: state.counter - 1
        }
    }
    if(actions.type === 'ADD') {
        return{
            counter: state.counter + 10
        }
    }
    if(actions.type === 'SUBTRACT') {
        return{
            counter: state.counter - 10
        }
    }
    return state;
};

export default reducer