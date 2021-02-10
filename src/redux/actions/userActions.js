export const ADD_USER = 'ADD_USER';
// export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';

export function userActions(user) {
  return {
    type: ADD_USER,
    user: user
  };
}

export function setUserData(user) {
  return {
    type: 'EDIT_USER',
    data: user
  };
}
