// import {
//   AUTHENTICATE,
//   AUTHENTICATE_ERROR_AUTH,
// } from '../actions/authActions';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  stationDetails: [],
  details: [],
  stationData: {},
  isEdit: false,
  contractorsList: [],
  isSubmitted: false,
  docs: [],
  total: '',
  limit: '',
  stationType: []
};

const stationReducer = (state = initialState, action) => {
  // debugger
  switch (action.type) {
    case actionTypes.ADD_STATION:
      var value = action.details;
      return {
        ...state,
        details: state.details.concat(value)
      }

    case actionTypes.EDIT_STATION: 
      return {
        ...state,
        isEdit: true,
        stationData: action.data
      }

    case actionTypes.SET_ISADD:
      return {
        ...state,
        isEdit: action.value
      }

    case actionTypes.DELETE_STATION: 
      let stations = state.details.filter((item, index) => index !== action.deleteId)
      return {
        ...state,
        details: stations       
      }

    case actionTypes.FETCH_CONTRACTORS:
      return {
        ...state,
        contractorsList: action.data
      }

    case actionTypes.STATION_ERROR:
      return {
        ...state,
        error: true
      }

    case actionTypes.IS_SUBMITTED:
      return {
        ...state,
        isSubmitted: action.isSubmitted
      }  

    case actionTypes.FETCH_STATIONS:
      return {
        ...state,
        stationType: action.stationType,
        stationDetails: action.stationData
      }

    case actionTypes.FETCH_STATION_BYPARAMS:
      return {
        ...state,
        docs: action.docs,
        total: action.total,
        limit: action.limit
      }
    
      case actionTypes.SET_ISLOADING:
        return {
          ...state,
          isLoading: action.isLoading
        }
    default:
      return state;
  }
};

export default stationReducer;
