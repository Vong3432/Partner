import { SHOW_PROFILE, EDIT_PROFILE, DEACTIVE_PROFILE, PROFILE_LOADED, PROFILE_LOADING } from '../actions/types'

const initialState = {
    profile: [],
    loading: false
}

export default function(state = initialState, action){
    switch( action.type ){
        case SHOW_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case DEACTIVE_PROFILE:
            return {
                ...state,
                profile: state.profile.filter( user => user.id !== action.payload)
            }
        case EDIT_PROFILE:
            return {
                ...state,
                profile: [action.payload]                
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
