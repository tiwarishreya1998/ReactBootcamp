import * as actionTypes from '../actions';

const initialState ={
    counter:0
   // results:[]
};

const reducer =(state=initialState,action) =>{

    switch(action.type){
        case actionTypes.INCREMENT:
            const newState=Object.assign({},state);// clones the state, not a deep clone.
            newState.counter=state.counter+1;
            return newState;

        case actionTypes.DECREMENT:
            return{
                ...state,
                counter:state.counter-1
                   }
        case actionTypes.ADD:
            return{
                ...state,
                counter:state.counter+action.val
                 }

        case actionTypes.SUBTRACT:
            return{
                ...state,
               counter:state.counter-action.val
            }
        // case actionTypes.STORE_RESULT :   
        //     return{
        //         ...state,
        //         results:state.results.concat({id:new Date(),value:state.counter})

        //     }
        // case actionTypes.DELETE_RESULT:
        //     // 2.const id=2;
        //     // const newArray=[...state.results];
        //     // newArray.splice(id,1)
        //    //1. but mutable:= state.results.splice(id,1) //(result,index)=>index!==id
        //    const updatedArray=state.results.filter(result=>result.id!==action.resultElId);
        //     return{
        //         ...state,
        //         results:updatedArray
        //     }
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