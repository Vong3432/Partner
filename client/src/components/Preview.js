import React,{useEffect, useContext} from 'react'
import {PreviewContext} from '../PreviewContext'

const Preview = () => {    

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)
    const msg = "Please select a job";

    useEffect(()=>{
        console.log('Preview is rerender.')        
        return(() => console.log('Preview unmounted'))
    },[selectedJob])

    return (
        <>
            <h2>{selectedJob.title ? selectedJob.title : msg }</h2>
        </>
    )
}

export default Preview
