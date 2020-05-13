import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';


const initialState ={
    counter:0
   // results:[]
};

const reducer =(state=initialState,action) =>{

    switch(action.type){
        case actionTypes.INCREMENT:
            return updateObject(state,{counter:state.counter+1})

        case actionTypes.DECREMENT:
            return updateObject(state,{counter:state.counter-1})

        case actionTypes.ADD:
            return updateObject(state,{counter:state.counter+action.val})

        case actionTypes.SUBTRACT:
            return updateObject(state,{counter:state.counter-action.val})
            // return{
            //     ...state,
            //    counter:state.counter-action.val
            // }
   
    
    }


    return state;
};

export default reducer;


//in cases like increment..this is not merged with old state.. this is the new state .. this not how we should update  
//we should maintain the old state and update when needed..
// we should not mutate the old statelike
// const newState=state;
// newState.counter=State.counter+1
// return newState;   instead we should copy
// concat and push are like same but the major difference is that..
//concat:returns the new array which is the old array and argument u pass
//push:manipulates the original value