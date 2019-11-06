import { combineReducers } from 'redux'
import jobReducer from './jobReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    job: jobReducer,
    error: errorReducer,
    auth: authReducer
})