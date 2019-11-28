import { SHOW_PROFILE, EDIT_PROFILE, DEACTIVE_PROFILE, PROFILE_LOADED, PROFILE_LOADING, ADD_EDUCATION, GET_EDUCATION, DELETE_EDUCATION, ADD_EXPERIENCE, GET_EXPERIENCE, DELETE_EXPERIENCE } from '../actions/types'

const initialState = {
    user: null,
    loading: false,
    educationInfo: null,
    experienceInfo: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_PROFILE:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case DEACTIVE_PROFILE:
            return {
                ...state,
                user: state.user.filter(user => user.id !== action.payload)
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_EDUCATION:
            return {
                ...state,
                educationInfo: [...state.educationInfo, action.payload]
            }
        case GET_EDUCATION:
            return {
                ...state,
                educationInfo: action.payload
            }
        case DELETE_EDUCATION:
            return {
                ...state,
                educationInfo: state.educationInfo.filter(info => info.EducationID !== action.payload)
            }
        case ADD_EXPERIENCE:
            return {
                ...state,
                experienceInfo: [...state.experienceInfo, action.payload]
            }
        case GET_EXPERIENCE:
            return {
                ...state,
                experienceInfo: action.payload
            }
        case DELETE_EXPERIENCE:
            return {
                ...state,
                experienceInfo: state.experienceInfo.filter(info => info.WorkExperienceID !== action.payload)
            }
        default:
            return state;
    }
}
