export const ADD_STATION = 'ADD_STATION';
// export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';

export function stationActions(details) {
  return {
    type: ADD_STATION,
    details: details
  };
}

// export function authError(error) {
//   return {
//     type: AUTHENTICATE_ERROR_AUTH,
//     error,
//   };
// }
