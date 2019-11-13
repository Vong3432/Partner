import axios from 'axios'
import { SHOW_PROFILE, EDIT_PROFILE, DEACTIVE_PROFILE, PROFILE_LOADED, PROFILE_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

/*
    **Description:
    When new user register an acc, an id will be sent to the `account.ID` and `profile.ID`
*/

export const showProfile = id => (dispatch, getState) => {
    dispatch(setProfileLoading());    
    axios
        /*
            Tasks:
            1. Use the ${id} to select * data based on the profile user interface
            2. inside the api, make sure to res.json(results)            
        */
        .get(`/api/profile/displayprofile/${id}`, tokenConfig(getState))        
        .then( res => 
            dispatch({
                type: SHOW_PROFILE,
                payload: res.data
            }))
        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const editProfile = id => (dispatch, getState) => {
    axios
        /*
            Tasks:
            1. Use the ${id} to find profile 
            2. inside the api, UPDATE everything on `profile` WHERE `profile.id` = `id`
            3. res.json(results) if success
        */
        .put(`/api/profile/updateprofile/${id}`, tokenConfig(getState))
        .then(res => 
                dispatch({
                    type: EDIT_PROFILE,
                    payload: res.data, id                 
                }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deactiveProfile = id => (dispatch, getState) => {
    axios
        
            // Tasks:
            // 1. Use the ${id} to find profile 
            // 2. inside the api, DELETE FROM `profile` WHERE `profile.id` = `id`            
  
        .delete(`/api/profile/resetprofile/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DEACTIVE_PROFILE,
                payload: res.data, id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
      

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}