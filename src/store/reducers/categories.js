import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    categories:[],
    loading:false,
    error:null,
    categoryId:null
}

const fetchCategoriesStart=(state,action)=>{
    return updateObject(state,{loading:true});
}

const fetchCategoriesFail=(state,action)=>{
    return updateObject(state,{loading:false});
}

const fetchCategoriesSuccess=(state,action)=>{
    return updateObject(state,{
        categories:action.categories,
        categoryId:categoryId,
        loading:false
    });
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.FETCH_CATEGORIES_START:return fetchCategoriesStart(state,action);

        case actionTypes.FETCH_CATEGORIES_SUCCESS:return fetchCategoriesSuccess(state,action);

        case actionTypes.FETCH_CATEGORIES_FAIL:return fetchCategoriesFail(state,action);

        default:return state;
    }
};


export default reducer;