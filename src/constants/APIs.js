const url='http://13.235.102.214:8000'
export const LoginAPI = `${url}/users/login`

// Station Management APIs
export const AddStationAPI = `${url}/stations`;
export const GetContractorsAPI = `${url}/contractors`;
export const GetStationAPI = `${url}/stations`;
export const DeleteStationAPI = `${url}/stations`;
// http://13.235.102.214:8000/stations

// Users Management APIs
export const GetUserAPI = `${url}/users`
export const AddUserAPI = `${url}/users/add`;
export const GetRoleAPI = `${url}/roles`;
export const BlockUserAPI = `${url}/users`;

// Vendors
// http://13.235.102.214:8000/vendors/1/10
export const GetVendorAPI = `${url}/vendors`