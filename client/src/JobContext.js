import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const JobContext = createContext();

export const JobProvider = (props) => {

    // initial state
    const [ jobs, setJobs ] = useState([])

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = () =>
    {
        axios
            .get('/api/job/displayjobs',{headers: {"Content-type": "application/json"}})                     
            .then(res => setJobs(res.data))            
            .catch(err => console.log(err))
    }

    return(
        <JobContext.Provider value={[jobs, setJobs]}>
            {props.children}
        </JobContext.Provider>
    )
}