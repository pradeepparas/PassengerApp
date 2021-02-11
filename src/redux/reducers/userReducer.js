import { ADD_USER } from "../actions/userActions";

const initialState = {
  usersList: [],
  isEdit:false,
  userData:{}
};

const userReducer = (state = initialState, action) => {
  debugger
  switch (action.type) {
    case ADD_USER:
      var value = action.user;
      return {
        ...state,
        usersList: state.usersList.concat(value)
      }
      case 'EDIT_USER':
        var value = action.data;
        return {
          ...state,
          userData: value,
          isEdit:true
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

export default userReducer;
