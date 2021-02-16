import * as actionTypes from './actionTypes';
import * as API from '../../constants/APIs';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

export function setIsSubmitted(success) {
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

export function EditStationDetails(details) {
  return dispatch => {
    let data = {
      "_id": details._id,
      "station_name": details.station_name,
      "station_code": details.station_code,
      "station_type": details.station_type,
      "managed_by": details.managed_by,
      "contract_giver": details.contract_giver,
      "contract_winner": details.contract_winner,
      "no_of_platform": details.no_of_platform,
      "station__gps_ltd": details.station__gps_lng,
      "station__gps_lng": details.station__gps_lng,
      "contract_start_date": moment(details.contract_start_date),
      "exp_end_date": moment(details.exp_end_date),
      "contract_tenure": details.contract_tenure,
      "contact_name": details.contact_name,
      "contact_mobile": details.contact_mobile,
      // "contact_email": details.contact_email,
      "is_assign_as_admin": details.is_assign_as_admin,
      "name": details.name,
      "mobile": details.mobile,
      // "email": details.email,
      "station_admin_id": details.station_admin_id
    }

    if(details.email)data.email = details.email;
    if(details.contact_email)data.contact_email = details.contact_email;

    axios({
      url: API.AddStationAPI,
      method: "PUT",
      data: data,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      if(response.data.success){
        dispatch(setIsSubmitted(true))
      } else {
        dispatch(setIsSubmitted(false))
      }
  // "message": "Station updated succesfully",
  // "success": true,
  // "status": 200
    }).catch(err => {
        toast.error(err.response.data.message)
        dispatch(setIsSubmitted(false))
      })
  }
}

export function stationActions(details) {
  details.password = details.adminPassword
  let key = "adminPassword"

  // change date format using Moment
  details.contract_start_date = moment(details.contract_start_date).format("YYYY-MM-DD")
  details.exp_end_date = moment(details.exp_end_date).format("YYYY-MM-DD")
  
  if(details.contact_email == ''){
    delete details["contact_email"];
  }
  if(details.email == ''){
    delete details["email"];
  }
  console.log(details)
  debugger

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
        // toast.success(response.data.message)
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
    }).catch(err => {
      toast.error(err.response.data.message)
      // dispatch(setIsSubmitted(false))
    })
  }
}

// GET Stations Details by Parameters
export function getStationDataByParams(page, limit, values) {
  debugger
  return (dispatch) => {
    let link = `${API.GetStationAPI}/${page}/${limit}`;
    console.log(link)
    debugger
    let url = values ? `${API.GetStationAPI}/${page}/${limit}?search=${values}`: `${API.GetStationAPI}/${page}/${limit}` 
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
        // "total": 2,
        // "limit": 10,
        dispatch(fetchStationDataByParams(response.data.station.docs, response.data.station.total, response.data.station.limit))
      } else {
        dispatch(fetchStationDataByParams(response.data.station.docs ))
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      // dispatch(setIsSubmitted(false))
    })
  }
}

//  GET Stations Details for Dropdown
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
    }).catch(err => {
      toast.error(err.response.data.message)
      // dispatch(setIsSubmitted(false))
    })
  }
}

export function fetchStationData(stationData) {
  return {
    type: actionTypes.FETCH_STATIONS,
    stationData: stationData
  }
}

export function fetchStationDataByParams(docs, total, limit) {
  return {
    type: actionTypes.FETCH_STATION_BYPARAMS,
    docs: docs,
    total: total,
    limit: limit
  }
}

export function DeleteStationByID (stationId) {
  return dispatch => {

  }
}
