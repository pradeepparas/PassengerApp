// import {
//   AUTHENTICATE,
//   AUTHENTICATE_ERROR_AUTH,
// } from '../actions/authActions';
import { ADD_STATION, EDIT_STATION } from "../actions/stationActions";

const initialState = {
  details: [],
  stationData: {},
  isEdit: false
};

const stationReducer = (state = initialState, action) => {
  debugger
  switch (action.type) {
    case ADD_STATION:
      var value = action.details;
      return {
        ...state,
        details: state.details.concat(value)
      }

    case EDIT_STATION: 
      return {
        ...state,
        isEdit: true,
        stationData: action.data
      }

    case "SET_ISADD":
      return {
        ...state,
        isEdit: action.value
      }
    default:
      return state;
  }
};

export default stationReducer;
