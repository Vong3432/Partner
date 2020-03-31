import axios from 'axios'
import { SHOW_PROFILE, EDIT_PROFILE, DEACTIVE_PROFILE, PROFILE_LOADED, PROFILE_LOADING, ADD_EDUCATION, GET_EDUCATION, DELETE_EDUCATION, ADD_EXPERIENCE, GET_EXPERIENCE, DELETE_EXPERIENCE, SHOW_RESUMES, DELETE_RESUME } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

/*
    **Description:
    When new user register an acc, an id will be sent to the `account.ID` and `profile.ID`
*/

export const showProfile = id => (dispatch, getState) => {
    dispatch(setProfileLoading());       
    return axios        
        .get(`/api/profile/displayprofile/${id}`, tokenConfig(getState))        
        .then( res => 
            dispatch({
                type: SHOW_PROFILE,
                payload: res.data
            })            
        )         
        .then(res => res.payload)       
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const editProfile = (id, info) => (dispatch, getState) => {
    axios
        /*
            Tasks:
            1. Use the ${id} to find profile 
            2. inside the api, UPDATE everything on `profile` WHERE `profile.id` = `id`
            3. res.json(results) if success
        */
        .put(`/api/profile/updateprofile/${id}`, info, tokenConfig(getState))
        .then(res => 
                dispatch({
                    type: EDIT_PROFILE                              
                }))
        // .then(dispatch(showProfile(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_FAIL")))
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

export const getResumes = id => (dispatch, getState) => {
    axios
        .get(`/api/profile/getResumes/${id}`)
        .then(res => {
            dispatch({
                type: SHOW_RESUMES,
                payload: res.data
            })
        })
}

export const deleteResume = id => (dispatch, getState) => {
    axios
        .delete(`/api/profile/deleteResume/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_RESUME,
                payload: res.data
            })
        })        
}

export const addEducationInfo = (data, id) => (dispatch, getState) => {
    axios
        .post(`/api/profile/addEducation/${id}`, data)
        .then(res => {
            dispatch({
                type: ADD_EDUCATION,
                payload: res.data
            })
        })
        .then(dispatch(getEducationInfo(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"ADD_EDUCATION_FAIL")))
}
      
export const getEducationInfo = id => (dispatch, getState) => {
    axios.
        get(`/api/profile/getEducation/${id}`)
        .then(res => {
            dispatch({
                type: GET_EDUCATION,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"GET_EDUCATION_FAIL")))
}

export const deleteEducation = id => (dispatch, getState) => {
    axios
        .delete(`/api/profile/deleteEducation/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_EDUCATION,
                payload: res.data
            })
        })        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"DELETE_EDUCATION_FAIL")))
}

export const addExperienceInfo = (data, id) => (dispatch, getState) => {
    axios
        .post(`/api/profile/addExperience/${id}`, data)        
        .then(dispatch(getExperienceInfo(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"ADD_EDUCATION_FAIL")))
}
      
export const getExperienceInfo = id => (dispatch, getState) => {
    axios.
        get(`/api/profile/getExperience/${id}`)
        .then(res => {
            dispatch({
                type: GET_EXPERIENCE,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"GET_EXPERIENCE_FAIL")))
}

export const deleteExperience = id => (dispatch, getState) => {
    axios
        .delete(`/api/profile/deleteExperience/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_EXPERIENCE,
                payload: res.data
            })
        })        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status,"DELETE_EXPERIENCE_FAIL")))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}