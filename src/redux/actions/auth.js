import axios from 'axios';
import * as API from '../../constants/APIs';
import * as myConstClass from '../../screens/constants/constants';
import * as actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import { setIsLoading } from "./stationActions";
// import { useHistory } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const api_url = myConstClass.apiUrl;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user_data, message) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        authData: user_data,
        message: message
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (username, password) => {

    return dispatch => {
        dispatch(setIsLoading(true))
        var qs = require('qs');
        // dispatch(authStart());
        const authData = {
            username: username,
            password: password
        }
        
        var data = qs.stringify(authData);
           var config = {
             method: 'post',
             url: API.LoginAPI,
             headers: { 
            //    'Accept-Language': 'hi', 
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data : data
           };

        axios(config)
            .then(response => {
                debugger
                if(response.data.success){
                    debugger
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user_data.name)
                    localStorage.setItem('userId', response.data.user_data._id);
                    localStorage.setItem('userDataLS', JSON.stringify(response.data.user_data))
                    // localStorage.setItem('user', user));
                    dispatch(authSuccess(response.data.token, response.data.user_data, response.data.message));
                    toast.success(response.data.message)
                } else {

                }
            }).then(() => {

            })
            .catch(err => {
                toast.error(err.response.data.message)
                dispatch(setIsLoading(false))
                // dispatch(authFail({
                //     error: err.message ? err.message : null
                // }));
            });
            dispatch(setIsLoading(false))
    };
};
