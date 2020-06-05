// import * as actionTypes from '../actions/actionTypes';
// import {updateObject} from '../../shared/utility';



// const initialState={
//     profileDetails:[],
//     loading:false
// }


// const fetchProfileStart=(state,action)=>{
//     return updateObject(state,{loading:true});
// }

// const fetchProfileFail=(state,action)=>{
//     return updateObject(state,{loading:false});
// }

// const fetchProfileSuccess=(state,action)=>{
//     return updateObject(state,{
//         profileDetails:action.profileDetails,
//         loading:false
//     });
// };

// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case actionTypes.FETCH_PROFILE_START:return fetchProfileStart(state,action);

//         case actionTypes.FETCH_PROFILE_SUCCESS:return fetchProfileSuccess(state,action);

//         case actionTypes.FETCH_PROFILE_FAIL:return fetchProfileFail(state,action);

//         default:return state;
//     }
// };


// export default reducer;