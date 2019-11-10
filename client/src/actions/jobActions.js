import axios from 'axios'
import { GET_JOBS, ADD_JOB, DELETE_JOB, JOBS_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getJobs = () => dispatch => {
    dispatch(setJobsLoading());
    axios
        .get('/api/job/displayjobs')
        .then( res => 
            dispatch({
                type: GET_JOBS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addJob = item => (dispatch, getState) => {
    axios
        .post('/api/job', item, tokenConfig(getState))
        .then(res => 
                dispatch({
                    type: ADD_JOB,
                    payload: res.data
                }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteJob = id => (dispatch, getState) => {
    console.log(id)
    axios.delete(`/api/job/deletejob/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_JOB,
                payload: id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setJobsLoading = () => {
    return {
        type: JOBS_LOADING
    }
}