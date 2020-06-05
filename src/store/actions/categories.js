import axios from 'axios';
import * as  actionTypes from './actionTypes';


export const fetchCategoriesStart=()=>{
    return{
        type:actionTypes.FETCH_CATEGORIES_START
    };
};


export const fetchCategoriesFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const fetchCategories=(access_token,categoryId)=>{
    return dispatch=>{
        dispatch(fetchCategoriesStart());
        const headers={
            Authorization:'Bearer' +access_token
        }
        let query='';
        if(categoryId){
            query=`?categoryId=${categoryId}`
        }
        axios.get("http://localhost:8080/customer/profile/categories"+query,{headers:headers})
        .then(response=>{
            console.log(response.data);
            // localStorage.setItem('id',response.data.id);
            // localStorage.setItem('firstName',response.data.firstName);
            // localStorage.setItem('lastName',response.data.lastName);
            // localStorage.setItem('contact',response.data.contact);
            // localStorage.setItem('active',response.data.active);

            
            dispatch(fetchCategoriesSuccess(response.data,categoryId));

        })
        .catch(error=>{
            console.log(error.response.data.error);
            dispatch(fetchCategoriesFail(error.response.data.error))
        });
    }
}


export const fetchCategoriesSuccess=(categories,categoryId)=>{
    return{
        type:actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories:categories,
        categoryId:categoryId
    }
}