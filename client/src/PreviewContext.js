import React, { useState, createContext, useEffect } from 'react'

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {


    // initial state
    const [ selectedJob, setSelectedJob ] = useState([
        {
            jobID:"",
            title:"Select a job",
            description:"",
            logo:"",
            employer_id:"",
            upload_date:"", 
            due_date:"", 
            description:"",
            requirement:"", 
            status:"", 
            type:"", 
            category:"", 
            salary:""
        }
    ])

    useEffect(()=>{
        console.log('Preview mounted')                
        return(()=>{console.log('Preview unmounted')})
    },[])    

    return(
        <PreviewContext.Provider value={[selectedJob, setSelectedJob]}>
            {props.children}
        </PreviewContext.Provider>
    )
}