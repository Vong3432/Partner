import React, { useState, createContext, useEffect } from 'react'

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {


    // initial state
    const [selectedJob, setSelectedJob] = useState({
        job_id: null,
        upload_date: null,
        due_date: null, 
        status: null, 
        type: [], 
        candidatelist_id: [], 
        employer_id: null, 
        title: null, 
        description: null, 
        requirement: null, 
        company_name: null, 
        location: null, 
        category: null, 
        salary: null, 
        image_publicID: null, 
        imageUrl: null
    })

    useEffect(() => {
        console.log(selectedJob)
        return (() => { console.log('Preview unmounted') })
    }, [selectedJob])

    return (
        <PreviewContext.Provider value={[selectedJob, setSelectedJob]}>
            {props.children}
        </PreviewContext.Provider>
    )
}