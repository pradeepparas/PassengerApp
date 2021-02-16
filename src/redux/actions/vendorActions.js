import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import * as API from '../../constants/APIs';

export function getVendorDataByParams(page, limit, value) {
    return dispatch => {
        let api = `${API.GetVendorAPI}/${page}/${limit}`
        axios({
            url: api,
            headers: {
                "accept": "application/json",
                // "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },
        }).then(response => {
            debugger
            if(response.data.success){
              debugger
              dispatch(fetchVendorDataByParams(response.data.vendor.docs, response.data.vendor.total, response.data.vendor.limit))
            } else {
              dispatch(fetchVendorDataByParams(response.data.vendor.docs))
            }
          }).catch(err => console.log(err))
    }
}

export function fetchVendorDataByParams(docs, total, limit){
    return {
        type: actionTypes.FETCH_VENDOR_BYPARAMS,
        docs: docs,
        total: total,
        limit: limit
      }
}