import * as actionTypes from './actionTypes';
import * as API from '../../constants/APIs';
import axios from 'axios';
// import moment from 'moment';
import { toast } from 'react-toastify';
import { setIsSubmitted } from './stationActions';
// export function userActions(user) {
//   return {
//     type: actionTypes.ADD_USER,
//     user: user
//   };
// }

export function userActions(details) {
  return dispatch => {
    debugger
    console.log(details)
    debugger
    const data = {
      "name": details.userName,
      "email": details.userEmail,
      "mobile": details.userNumber,
      "station_id": details.stationName,
      "role": details.role,
      "password": details.userPassword
    }

    axios({
      method: 'post',
      url: API.AddUserAPI,
      headers: { 
      //  'Accept-Language': 'hi',
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data : JSON.stringify(data)
    }).then(response => {
      if(response.data.success){
        dispatch(setIsSubmitted(true))
        console.log(response)
      } else {
        debugger
      }
    }).catch((response) => {
      debugger
      // console.log(response.data)
      console.log(response.response.data.message)
      debugger
      toast.error(response.response.data.message)
      console.log(response.response.data.message)
      dispatch(setIsSubmitted(false))
    })
  }
}

export function setUserData(user) {
  return {
    type: actionTypes.EDIT_USER,
    data: user
  };
}

export function getUserDataByParams(page, limit, values) {
  debugger
  return (dispatch) => {
    let link = `${API.GetUserAPI}/${page}/${limit}`;
    console.log(link)
    debugger

    let url = values ? `${API.GetUserAPI}/${page}/${limit}?search=${values.name}&station_id=${values.station_id}&start_date=${values.start_date}&end_date=${values.end_date}`
        : `${API.GetUserAPI}/${page}/${limit}`; 
    
    axios({
      url: url,
      headers: {
        "accept": "application/json",
        // "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    }).then(response => {
      debugger
      if(response.data.success){
        debugger
        dispatch(fetchUserDataByParams(response.data.user.docs))
      } else {
        dispatch(fetchUserDataByParams(response.data.user.docs))
      }
    }).catch(err => console.log(err))
  }
}

export function fetchUserDataByParams(docs) {
  return {
    type: actionTypes.FETCH_USER_BYPARAMS,
    docs: docs
  }
}

export function setIsEditFalse(value) {
  return {
    type: actionTypes.SET_ISADD,
    value: value
  }
}

export function deleteUser(userId) {
  return {
    type: actionTypes.DELETE_USER,
    userId: userId
  }
}