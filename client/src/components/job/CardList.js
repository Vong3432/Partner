import React, { useState, useEffect, useContext } from 'react'
import Card from './Card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs, deleteJob } from '../../actions/jobActions'
import PropTypes from 'prop-types'

const CardList = ({ jobCallbackFunction }) => {
    
    const dispatch = useDispatch()
    const job = useSelector(state => state.job.jobs)    

    const [isLoading, setIsLoading] = useState(true)
    const [fetchJob, setFetchJob] = useState()
    const [filterSearch, setFilterSearch] = useState({
        jobTitle: "",
        description: 0
    })    

    useEffect(() => {        
        if(isLoading === true)
        {
            dispatch(getJobs())    
            setFetchJob(job)             
            setIsLoading(false)               
        }                                    
        return(()=>setIsLoading(true))
    }, [])

    useEffect(() => {
        dispatch(getJobs()) 
        
        if(isLoading===true)    
            setFetchJob(job)      

    }, [isLoading])

    useEffect(() => {
        if(fetchJob !== undefined && fetchJob.length > 0)
            setIsLoading(false)
    }, [fetchJob])
    

    useEffect(() => {           
        setFilterSearch(jobCallbackFunction)
        console.log(filterSearch)
    }, [jobCallbackFunction])        
    
    const filterFunction = (input, i) => { 
        console.log(i, filterSearch)            
        if(i)           
            return ((i.Title||'').toLocaleLowerCase().search(input.jobTitle.toLocaleLowerCase()) !== -1 ) && ((i.Category || "").search(filterSearch.category) !== -1 || "")
        else 
            return null
    }

    return (
        <>
            {          
                (fetchJob && isLoading === false) ? (
                    fetchJob
                        .filter(item => filterSearch ? filterFunction(filterSearch, item) : item)                    
                        .map((item, index) => <Card index={index} job={item} />)
                ) : null
                    
            }

        </>
    )
}

// const mapStateToProps = (state) => ({
//     // C-A-R-S Component-Action-Reduces-Server
//     job: state.job,
//     isAuthenticated: state.auth.isAuthenticated
// })

export default CardList;
