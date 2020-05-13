import * as actionTypes from './actionTypes';

//action creator is just a function that creates an action.
//action funct wats to return payload..

export const saveResult=(res)=>{
   // const updatedResult=res*2;
    return{
        type:actionTypes.STORE_RESULT,
        result:res
    };
}
//we get dispatch here due thunk (middleware)
//only act as a utility to run asynchronous code
export const storeResult=(res)=>{
    return (dispatch,getState)=>{
        setTimeout(()=>{
           // const oldCounter=getState().ctr.counter;
            //console.log(oldCounter);
            dispatch(saveResult(res));
        },2000);
    }
    
    

};
export const deleteResult=(res)=>{
    return{
        type:actionTypes.DELETE_RESULT,
        result:res

    };

};
