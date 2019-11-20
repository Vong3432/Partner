import { GET_POSTS, ADD_POST, DELETE_POST, EDIT_POST, POST_LOADING } from '../actions/types'

const initialState = {
    posts: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        // case EDIT_POST:
        //     return {
        //         ...state,
        //         posts: [action.payload, ...state.posts]
        //     }
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
