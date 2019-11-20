import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL, 
    DELETE_USER
} from '../actions/types'

const initialState = {    
    isLoading: false,
    users: null
}


export default function(state = initialState, action)
{    
    switch(action.type)
    {        
        case GET_ALL_USERS:
            return {
                ...state,                
                users: action.payload 
            }        
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter(user => user.UserID !== action.payload)
            }
        default:
            return state;
    }
}
