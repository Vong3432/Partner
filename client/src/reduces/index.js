import { combineReducers } from 'redux'
import jobReducer from './jobReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

export default combineReducers({
    job: jobReducer,
    error: errorReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
})