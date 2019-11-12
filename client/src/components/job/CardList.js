import React, { useState, useEffect, useContext } from 'react'
import Card from './Card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs, deleteJob } from '../../actions/jobActions'
import PropTypes from 'prop-types'

const CardList = ({ jobCallbackFunction }) => {
    
    const dispatch = useDispatch()
    const job = useSelector(state => state.job)
    console.log(job)

    CardList.propTypes = {
        getJobs: PropTypes.func.isRequired,
        job: PropTypes.object.isRequired
        // isAuthenticated: PropTypes.bool
    }

    const [isLoading, setIsLoading] = useState(true)
    const [filterSearch, setFilterSearch] = useState({
        jobTitle: "",
        description: ""
    })    

    useEffect(() => {           
        setFilterSearch(jobCallbackFunction)
    }, [jobCallbackFunction])    

    useEffect(() => {
        dispatch(getJobs())
        setIsLoading(false)                  
    }, [])
    
    const filterFunction = (input, job) => {     
        if(job)           
            return ((job.title||'').toLocaleLowerCase().search(input.jobTitle.toLocaleLowerCase()) !== -1 ) && ((job.description || "").toLocaleLowerCase().search(filterSearch.description.toLocaleLowerCase()) !== -1 || "")
        else 
            return null
    }

    return (
        <>
            {          
                job.jobs
                    .filter(item => filterSearch ? filterFunction(filterSearch, item) : item)                    
                    .map((item, index) => <Card index={index} job={item} />)
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
