import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,    
    GET_JOB_REQUESTS,
    CANCEL_JOB_REQUEST
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    account_type: null,
    jobRequests: null
}


export default function(state = initialState, action)
{    
    switch(action.type)
    {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_JOB_REQUESTS:
            return{
                ...state,
                jobRequests: action.payload
            }
        case CANCEL_JOB_REQUEST:
            return{
                ...state,
                jobRequests: state.jobRequests.filter(req => req.RequestID !== action.payload)
            }            
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload 
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:               
            // console.log(action.payload.user)
            localStorage.setItem('user', action.payload.User)            
            localStorage.setItem('token', action.payload.token);                        
            return {
                ...state,                 
                user: action.payload.User,               
                isAuthenticated: true,
                account_type: action.payload.User.account_type,
                isLoading: false                          
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:             
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            return {
                ...state,
                token: null,
                user: null,
                jobRequests: null,
                account_type: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}


/*
// Example 1
this.state = {
    user:{
        name:"Ali",
        email:""
    }
}

// To update user's email only 

// put prevState to copy previous state of the user,
this.setState((prevState) => {
    ...prevState,  // name: "Ali"
    email:"ali@gmail.com"
})
// latest user state
// user:{ name:"Ali", email:"ali@gmail.com"}


// To update name and email 
this.setState((prevState) => {
    ...prevState,  // name: "Ali"
    name:"Abu"  // this line will replace the name of the previous state
    email:"ali@gmail.com"
})
// latest user state
// user:{ name:"Abu", email:"ali@gmail.com"}
*/