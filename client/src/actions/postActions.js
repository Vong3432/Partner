import axios from 'axios'
import { GET_POSTS, ADD_POST, DELETE_POST, EDIT_POST, POST_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getPosts = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/post/displayposting/${id}`)
        .then( res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            }))        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addPost = item => (dispatch, getState) => {
    console.log(item+"asdasdasd")
    axios
        .post('/api/post', item, tokenConfig(getState))
        .then(res => 
                dispatch({
                    type: ADD_POST,
                    payload: res.data
                }))  
        .then(res => dispatch(getPosts(item.ProfileID)))      
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"POST_FAIL")))
}

export const editPost = (id, info) => (dispatch, getState) => {    
    axios
        .put(`/api/post/editpost/${id}`, info, tokenConfig(getState))        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"EDIT_FAIL")))
}

export const deletePost = id => (dispatch, getState) => {
    console.log(id)
    axios.delete(`/api/post/deleteposting/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"DELETE_FAIL")))
}

export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
// export const loadInitialDataSocket = (socket, id) => {
// 	return (dispatch) => {
// 		// dispatch(clearAllItems())
// 		socket.emit('getPost', id)
// 	}	
// }

// export const addNewItemSocket = (socket,item) => {
// 	return (dispatch) => {		
// 	    socket.emit('addPost',item)		
// 	}	
// }