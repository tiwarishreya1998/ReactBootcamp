import axios from 'axios';
import * as actionTypes from './actionTypes';
//import { fetchProfileStart, fetchProfileSuccess } from './profile';

export const fetchAddressStart = () => {
    return {
        type: actionTypes.FETCH_ADDRESS_START
    };
};

export const fetchAddressSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
        id:data.id,
        country:data.country,
        state:data.state,
        city:data.city,
        zipCode:data.zipCode,
        address:data.address,
        label:data.label

    };
};

export const fetchAddressFail=(error)=>{
    return{
        type: actionTypes.FETCH_ADDRESS_FAIL,
        error: error
    };
};
export const fetchAddress=()=>{
    return dispatch=>{
        console.log("fetchstart")
        dispatch((fetchAddressStart()));
        const token=localStorage.getItem('access_token');
        const headers = {Authorization: 'Bearer' + token}
        console.log("hello")
            axios.get('http://localhost:8080/customer/profile/addresses',{ headers: headers })
            .then(response=>{
                localStorage.setItem('id',response.data.id);
                localStorage.setItem('country',response.data.country);
                localStorage.setItem('state',response.data.state);
                localStorage.setItem('city',response.data.city);
                localStorage.setItem('zipCode',response.data.zipCode);
                localStorage.setItem('address',response.data.address);
                localStorage.setItem('label',response.data.label);
                dispatch(fetchAddressSuccess(response.data));
                


            }).catch(error=>{
                console.log(error.message);
                if(error.message!=null){
                    alert(error.message);
                }
                dispatch(fetchAddressFail(error))
            });
    }
}


