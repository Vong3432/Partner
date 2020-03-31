import { GET_JOBS, ADD_JOB, GET_SELF_JOBS , GET_APPLYJOBS, DELETE_JOB, UPDATE_JOB, JOBS_LOADING, GET_JOB_CATEGORY, APPLY_JOB, GET_APPLYJOB_REQUEST, DISPLAY_CURRENT_JOB } from '../actions/types'

const initialState = {
    jobs: [],
    currentJob:null,
    selfJobs:[],
    category: [],
    applyJobList: [],
    applyRequestList: [],
    candidates: 0,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        case DISPLAY_CURRENT_JOB:
            return{
                ...state,
                currentJob: action.payload
            }
        case GET_SELF_JOBS:
            return{
                ...state,
                selfJobs: action.payload,
                loading: false
            }
        case GET_JOB_CATEGORY:
            console.log(action.payload)
            return {
                ...state,
                category: action.payload
            }
        case GET_APPLYJOBS:
            return{
                ...state,
                applyJobList: action.payload
            }
        case GET_APPLYJOB_REQUEST:
            return{
                ...state,
                applyRequestList: action.payload
            }
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload)
            }
        case ADD_JOB:
            return {
                ...state,
                jobs: [action.payload, ...state.jobs]
            }
        case APPLY_JOB:
            return{
                ...state                
            }
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload.id).push(action.payload)
            }
        case JOBS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
