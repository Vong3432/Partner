import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {


    // initial state
    const [ selectedJob, setSelectedJob ] = useState([
        {
            jobID:"",
            title:"Select a job",
            description:"",
            logo:""
        }
    ])

    useEffect(()=>{
        console.log('Preview mounted')        
        console.log(selectedJob.jobID)
        return(()=>{console.log('Preview unmounted')})
    },[])    

    return(
        <PreviewContext.Provider value={[selectedJob, setSelectedJob]}>
            {props.children}
        </PreviewContext.Provider>
    )
}