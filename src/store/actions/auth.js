import axios from 'axios';
import qs from 'qs';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (access_token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access_token: access_token,
        id: id
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (login) => {
    return dispatch => {
        dispatch(authStart());

        console.log("Login info is :" , login)
        const loginData = {grant_type: "password", client_id: "live-test", client_secret: "abcde"}

        for(let key in login){
        loginData[key] = login[key].value}       
        
        axios.post('http://localhost:8080/oauth/token',qs.stringify(loginData) )
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('role',login.role.value)
                dispatch(authSuccess(response.data.access_token));
                dispatch(checkAuthTimeout(response.data.expires_in));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        console.log(access_token)
        if (!access_token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const id = localStorage.getItem('id');
                dispatch(authSuccess(access_token, id));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};