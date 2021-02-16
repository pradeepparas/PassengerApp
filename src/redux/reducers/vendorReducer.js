import * as actionTypes from '../actions/actionTypes';

const initialState = {
  vendorsList: [],
  total: '',
  limit: ''
};

const vendorReducer = (state = initialState, action) => {
    switch(action.type){
        // case actionTypes.FETCH_VENDORS:
        //     return {
        //         ...state,
        //         vendorsList: action.vendors
        //     }

        case actionTypes.FETCH_VENDOR_BYPARAMS:
            return {
                ...state,
                vendorsList: action.docs,
                total: action.total,
                limit: action.limit   
            }
        default:
            return state;
    }
}

export default vendorReducer;