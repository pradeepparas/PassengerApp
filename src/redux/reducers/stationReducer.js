// import {
//   AUTHENTICATE,
//   AUTHENTICATE_ERROR_AUTH,
// } from '../actions/authActions';
import { ADD_STATION } from "../actions/stationActions";

const initialState = {
  details: []
};

const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATION:
      var value = action.details;
      return {
        ...state,
        details: state.details.concat(value)
      }
    default:
      return state;
  }
};

export default stationReducer;
