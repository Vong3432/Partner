import React, { useState, useEffect } from 'react'

const Resume = () => {

    // default state
    const [resume, setResume] = useState({
        firstName: "",
        lastName: "",
        city: "",
        contactNumber: "",
        email: "",
        degree: 1,
        school: "",
        fos: "",
        schoolAddress: "",

    })
    const [step, setStep] = useState(1)

    //  handle side effect
    useEffect(() => {
        return (() => console.log('resume unmounted'))
    }, [step])

    useEffect(() => {
        console.log(resume)
    }, [resume])


    // event

    const handleChange = (e) => {
        e.persist()

        setResume(prevResume => ({
            infoData: { ...prevResume.infoData, [e.target.name]: e.target.value },
            educationData: prevResume.educationData,
            experienceData: prevResume.experienceData,
            jobPreferences: prevResume.jobPreferences
        }))

    }

    // setting months
    const allMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    let minOffset = 0, maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }


    return (
        <>            
          <div className="card mb-4 card-shadow resume-card">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <div className="d-flex flex-row">
                        <h5 className="card-title">Education</h5>
                    </div>
                </div>
          </div>            
        </>
    )
}

export default Resume
