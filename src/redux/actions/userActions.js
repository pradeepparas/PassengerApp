import * as actionTypes from './actionTypes';

export function userActions(user) {
  return {
    type: actionTypes.ADD_USER,
    user: user
  };
}

export function setUserData(user) {
  return {
    type: actionTypes.EDIT_USER,
    data: user
  };
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