import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_JOB_REQUESTS,
    CANCEL_JOB_REQUEST
} from '../actions/types'

// Register User
export const register = ({ email, password, userType, name }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = ({ email, password, userType, name })

    axios.post('/api/user/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"))
            dispatch({
                type: REGISTER_FAIL
            })
            throw err
        })

}

// login user
export const login = ({ email, password }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    // const body = JSON.stringify({ email, password })
    const body = ({ email, password })

    axios.post('/api/user/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({
                type: LOGIN_FAIL
            })
            throw err
        })

}

export const getJobRequests = id => (dispatch, getState) => {
    axios
        .get(`/api/user/jobrequests/${id}`)
        .then(res => dispatch({
            type: GET_JOB_REQUESTS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "GET_JOB_REQUESTS_FAIL")))
}

export const cancelJobRequests = (id, jobID) => (dispatch, getState) => {
    axios
        .delete(`/api/user/canceljobrequest/${id}/${jobID}`)
        .then(res => dispatch({
            type: CANCEL_JOB_REQUEST,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "CANCEL_JOB_REQUESTS_FAIL")))
}

// logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// // admin login
// export const adminLogin = ({ AdminID, Password }) => dispatch => {

//     // Headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }    

//     // Request body
//     // const body = JSON.stringify({ email, password })
//     const body = ({ AdminID, Password })    

//     axios.post('/api/admin/login', body, config)
//         .then(res => dispatch({
//             type: ADMIN_LOGIN_SUCCESS,
//             payload: res.data                
//         }))    
//         .catch(err => {
//             console.log(err)
//             dispatch(returnErrors(err.response.data, err.response.status, "ADMIN_LOGIN_FAIL"))
//             dispatch({
//                 type: ADMIN_LOGIN_FAIL
//             })
//             throw err
//         })

// }


// logout admin
// export const adminLogout = () => {
//     return{
//         type: ADMIN_LOGOUT_SUCCESS
//     }
// }

// Setup config/headers and token
export const tokenConfig = getState => {
    
    // Get token from localStorage
    const token = localStorage.getItem('token')

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['authorization'] = token;
    }

    return config
}


