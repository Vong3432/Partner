import React,{useState, useEffect, useContext} from 'react'
import {PreviewContext} from '../PreviewContext'

const Preview = () => {    

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)

    useEffect(()=>{
        console.log('Preview is rerender.')        
        return(() => console.log('Preview unmounted'))
    },[selectedJob])

    return (
        <div>
            <h3>Job Title: {selectedJob? selectedJob.title : console.log('nothing selected')}</h3>
        </div>
    )
}

export default Preview
