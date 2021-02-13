import * as actionTypes from './actionTypes';
import * as API from '../../constants/APIs';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

export function isSubmitted(success) {
  return {
    type: actionTypes.IS_SUBMITTED,
    isSubmitted: success
  }
}

// export function stationError(message) {
//   return {
//     type: actionTypes.STATION_ERROR,
//     message: message
//   }
// }

export function stationActions(details) {
  details.password = details.adminPassword
  let key = "adminPassword"

  // change date format using Moment
  details.contract_start_date = moment(details.contract_start_date).format("YYYY-MM-DD")
  details.exp_end_date = moment(details.exp_end_date).format("YYYY-MM-DD")

  delete details[key];
  console.log('details action', details) 
  return dispatch => {
    debugger
    const data = details
    axios({
      method: 'post',
      url: API.AddStationAPI,
      headers: { 
      //  'Accept-Language': 'hi',
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : JSON.stringify(details)
    }).then(response => {
      if(response.data.success){
        toast.success(response.data.message)
        dispatch(isSubmitted(true))
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
      dispatch(isSubmitted(false))
    })
  }
}

export function fetchContractors(data) {
  return {
    type: actionTypes.FETCH_CONTRACTORS,
    data: data
  }
}

export function setStationDate(data) {
  return {
    type: actionTypes.EDIT_STATION,
    data: data
  }
}

export function setIsEditFalse(value) {
  return {
    type: actionTypes.SET_ISADD,
    value: value
  }
}

export function deleteStation(id) {
  return {
    type: actionTypes.DELETE_STATION,
    deleteId: id
  }
}

export function GetContractors() {
  return dispatch => {
    axios({
      url: API.GetContractorsAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        dispatch(fetchContractors(response.data.contractors))
      } else {

      }
    }).catch(err => console.log(err))
  }
}

// GET Stations Details
export function getStationData() {
  return dispatch => {
    axios({
      url: API.GetStationAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        dispatch(fetchStationData(response.data.station))
      } else {

      }
    }).catch(err => console.log(err))
  }
}

export function fetchStationData(stationData) {
  return {
    type: actionTypes.FETCH_STATIONS,
    stationData: stationData
  }
}

export function DeleteStationByID (stationId) {
  return dispatch => {

  }
}
