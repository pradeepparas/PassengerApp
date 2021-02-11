export const ADD_USER = 'ADD_USER';
export const DELETE_USER = "DELETE_USER";
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

export function setIsEditFalse(value) {
  return {
    type: "SET_ISADD",
    value: value
  }
}

export function deleteUser(userId) {
  return {
    type: DELETE_USER,
    userId: userId
  }
}