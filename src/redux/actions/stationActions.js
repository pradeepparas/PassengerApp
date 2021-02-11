export const ADD_STATION = 'ADD_STATION';
export const EDIT_STATION = "EDIT_STATION";
export const DELETE_STATION = "DELETE_STATION";
// export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';

export function stationActions(details) {
  return {
    type: ADD_STATION,
    details: details
  };
}

export function setStationDate(data) {
  return {
    type: EDIT_STATION,
    data: data
  }
}

export function setIsEditFalse(value) {
  return {
    type: "SET_ISADD",
    value: value
  }
}

export function deleteStation(id) {
  return {
    type: DELETE_STATION,
    deleteId: id
  }
}
 
// export function authError(error) {
//   return {
//     type: AUTHENTICATE_ERROR_AUTH,
//     error,
//   };
// }
