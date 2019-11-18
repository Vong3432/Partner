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
    REGISTER_FAIL
} from '../actions/types'

// // Check token & load user
// export const loadUser = () => (dispatch, getState) => {
    
//     // User loading
//     dispatch({ type: USER_LOADING })        

//     axios.get('/api/user', tokenConfig(getState))
//         .then(res => dispatch({
//             type: USER_LOADED,
//             payload: res.data
//         }))        
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status))
//             dispatch({
//                 type: AUTH_ERROR
//             })
//         })
// }

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

// logout user
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}

// admin login
export const adminLogin = ({ AdminID, Password }) => dispatch => {
    
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }    

    // Request body
    // const body = JSON.stringify({ email, password })
    const body = ({ AdminID, Password })    
    
    axios.post('/api/admin/login', body, config)
        .then(res => dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data                
        }))    
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, "ADMIN_LOGIN_FAIL"))
            dispatch({
                type: ADMIN_LOGIN_FAIL
            })
            throw err
        })

}

// logout admin
export const adminLogout = () => {
    return{
        type: ADMIN_LOGOUT_SUCCESS
    }
}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token)
    {
        config.headers['x-auth-token'] = token;
    }

    return config
}


