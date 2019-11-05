import React, { useState, useEffect, useContext } from 'react'
import Card from './Card'
import { JobContext } from '../JobContext'

const CardList = ({ jobCallbackFunction }) => {

    const [jobs, setJobs] = useContext(JobContext)
    const [filterSearch, setFilterSearch] = useState({
        jobTitle: "",
        description: ""
    })

    function filterFunction(input, job) {                
        return ("" || job.title.toLocaleLowerCase().search(input.jobTitle.toLocaleLowerCase()) !== -1) && ("" || job.description.toLocaleLowerCase().search(filterSearch.description.toLocaleLowerCase()) !== -1)
    }

    useEffect(() => {
        setFilterSearch(jobCallbackFunction)
    }, [jobCallbackFunction])    

    return (
        <>
            {
                jobs
                    .filter(job => filterSearch ? filterFunction(filterSearch, job) : job)                    
                    .map((job, index) => <Card index={index} job={job} />)
            }

        </>
    )
}

export default CardList
