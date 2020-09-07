import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import * as actionTypes from '../../store/actions';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract " clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResults => (
                        <li key={strResults.id} onClick={() =>this.props.onDeleteResult(strResults.id)}></li>
                    ))}

                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
        storedResults: state.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10 }),
        onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
        onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT , id:id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);