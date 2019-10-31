import React, {useState, useEffect, useContext} from 'react'
import Card from './Card'
import {JobContext} from '../JobContext'

const CardList = () => {       

    const [jobs, setJobs] = useContext(JobContext)

    useEffect(()=>{
        console.log('rerender cardlist')

        return(()=>console.log('cardlist unmounted'))
    },[jobs])    

    return (       
        <> 
        {jobs.map(job => <Card key={job.job_id} jobID={job.job_id} company={job.company} title={job.title} logo={job.logo} description={job.description} />)}        
        </>
    )
}

export default CardList
