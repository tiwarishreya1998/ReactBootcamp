import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState ={
   // counter:0,
    results:[]
}

const deleteResult=(state,action)=>{
    const updatedArray=state.results.filter(result=>result.id!==action.resultElId);
    return updateObject(state,{results:updatedArray});
}


const reducer =(state=initialState,action) =>{

    switch(action.type){
    
        case actionTypes.STORE_RESULT :
            //changed data   
            return updateObject(state,{results:state.results.concat({id:new Date(),value:action.result*2})});

        case actionTypes.DELETE_RESULT:
          return deleteResult(state,action);
            
                
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

 // 2.const id=2;
            // const newArray=[...state.results];
            // newArray.splice(id,1)
           //1. but mutable:= state.results.splice(id,1) //(result,index)=>index!==id