import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState={
    token:null,
    
    error:null,
    loading:false,
    id:null,
    country:null,
    state:null,
    city:null,
    zipcode:null,
    address:null,
    label:null,
    authRedirectPath:'/'
    
};

const fetchAddressStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true});

};

const fetchAddressFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
};

const fetchAddressSuccess=(state,action)=>{
    return updateObject(state,
        {
            loading:false,
            error:null,
            id:action.id,
            country:action.country,
            state:action.state,
            city:action.city,
            zipCode:action.zipCode,
            address:action.address,
            label:action.label
        })
}
const setAuthRedirectPath=(state,action)=>{
    return updateObject(state,{authRedirectPath:action.path})
};
const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.FETCH_ADDRESS_START:return fetchAddressStart(state,action);
        case actionTypes.FETCH_ADDRESS_FAIL:return fetchAddressFail(state,action);
        case actionTypes.FETCH_ADDRESS_SUCCESS:return fetchAddressSuccess(state,action);
        //case actionTypes._LOGOUT:return Logout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action);
        default :
        return state;

    }
};

export default reducer;