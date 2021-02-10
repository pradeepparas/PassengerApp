import axios from 'axios';
import * as myConstClass from '../../screens/constants/constants';
import * as actionTypes from './actionTypes';
// import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const api_url = myConstClass.apiUrl;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {

    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (username, password) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            value: username,
            password: password,
        };

        // axios.post(api_url+'user/login', authData, {
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     })
        //     .then(response => {
        //
        //         if(response.data.data.isActive){
        //             toast.success('Logged In Successfully',{})
        //         }
        //         localStorage.setItem('token', response.data.token);
        //
        //            localStorage.setItem('status', response.data.data.isActive);
        //            localStorage.setItem('orgId', response.data.data.organisation.length>0?response.data.data.organisation[0].organisationId:"");
        //
        //            localStorage.setItem('email', response.data.data.email);
        //            localStorage.setItem('username', response.data.data.username);
        //            localStorage.setItem('firstname', response.data.data.name);
        //            localStorage.setItem('lastname', response.data.data.lastName);
        //            localStorage.setItem('image', response.data.data.profileImage);
        //
        //            localStorage.setItem('phone', response.data.data.phone);
        //
        //
        //
        //         localStorage.setItem('userId', response.data.data._id);
             // dispatch(authSuccess(response.data.token, response.data.data._id));

            // })
            // .catch(err => {

                dispatch(authFail({
                    // error: err.response ? err.response.data : null
                }));
            // });
    };
};
