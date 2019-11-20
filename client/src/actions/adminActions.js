import axios from 'axios'
import { returnErrors } from './errorActions'
import { GET_ALL_USERS, DELETE_USER } from '../actions/types'

// get all users
export const getAllUsers = () => dispatch => {
    axios
        .get('/api/user/alluser')
        .then(res => dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "GET_ALL_USER_FAIL")))
}

export const deactiveUser = id => dispatch => {
    axios
        .put(`/api/user/suspend/${id}`)        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "SUSPEND_USER_FAIL")))
}

export const reactiveUser = id => dispatch => {
    axios
        .put(`/api/user/reactive/${id}`)        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "REACTIVE_USER_FAIL")))
}