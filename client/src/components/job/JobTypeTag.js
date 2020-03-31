import React from 'react'
import { useState } from 'react'

const JobTypeTag = ({job_type, onChangeType}) => {

    const[ isActive, setIsActive ] = useState(false)
    
    // css
    const activeTab = {
        backgroundColor: "var(--primary-color)",
        color: "#fff"
    }

    const normalTab = {
        backgroundColor: "transparent",
        color: "var(--dark-color)"
    }
    
    return (
        <div className="decision--box" style={isActive ? activeTab : normalTab} onClick={(e) => {onChangeType(e, job_type); setIsActive(!isActive);}}>
            <h5>{job_type}</h5>
        </div>
    )
}

export default JobTypeTag
