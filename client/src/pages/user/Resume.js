import React, { useState, useEffect } from 'react'

const Resume = () => {

    // default state
    const [resume, setResume] = useState({
        infoData:{
            firstName:"",
            lastName:"",
            city:"",
            contactNumber:"",
            email:""
        },
        educationData: [
            {
                index: 0,
                degree: "",
                school: "",
                fieldOfStudy: "",
                address: "",
                startYear: "",
                startMonth: "",
                endMonth: "",
                endYear: "",
                attending: "Current attending",
                isAttending: true
            }
        ],
        experienceData:[
            {
                index: 0,
                jobTitle:"",
                company:"",
                address:"",
                isWorking: true,
                working: "Current working",
                startMonth:"",
                startYear:"",
                endMonth:"",
                endYear:"",
                description:""
            },            
        ],
        jobPreferences:{
            desiredJobTitle:"",
            desiredJobType:"",
            desiredSalary:0,
            relocation: true
        }
    })
    const [step, setStep] = useState(1)
    const [jobField, setJobField] = useState(['field'])
    const [degreeField, setDegreeField] = useState(['field'])

    //  handle side effect
    useEffect(() => {
        return (() => console.log('resume unmounted'))
    }, [step])

    useEffect(() => {
        console.log(resume)
    }, [resume])


    // events
    const handleEducationChange = (e, index) => {
        e.persist()

        setResume(prevResume => ({
            infoData: prevResume.infoData,
            experienceData: prevResume.experienceData,
            jobPreferences: prevResume.jobPreferences,
            educationData: prevResume.educationData.map(
                obj => {
                    if (obj.index === index) {
                        if (e.target.name === "attendingChkBox") {
                            Object.assign(obj, { isAttending: !obj.isAttending })
                            return (obj.isAttending === false) ? Object.assign(obj, { [e.target.name]: e.target.value, attending: "" }) : Object.assign(obj, { startYear: "", startMonth: "", endMonth: "", endYear: "", attending: "current attending" })
                        }
                        else
                            return Object.assign(obj, { [e.target.name]: e.target.value })
                    }
                    else {
                        return obj
                    }
                }
            )
        }))

    }

    const handleInfoChange = (e) => {
        e.persist()

        setResume(prevResume => ({
            infoData: {...prevResume.infoData,[e.target.name]: e.target.value},
            educationData: prevResume.educationData,
            experienceData: prevResume.experienceData,
            jobPreferences: prevResume.jobPreferences
        }))

    }

    const handleExperienceChange = (e, index) => {
        e.persist()

        setResume(prevResume => ({
            infoData: prevResume.infoData,
            educationData: prevResume.educationData,
            jobPreferences: prevResume.jobPreferences,
            experienceData: prevResume.experienceData.map(
                obj => {
                    if (obj.index === index) {
                        if (e.target.name === "workingChkBox") {
                            Object.assign(obj, { isWorking: !obj.isWorking })
                            return (obj.isWorking === false) ? Object.assign(obj, { [e.target.name]: e.target.value, working: "" }) : Object.assign(obj, { startYear: "", startMonth: "", endMonth: "", endYear: "", working: "current working" })
                        }
                        else
                            return Object.assign(obj, { [e.target.name]: e.target.value })
                    }
                    else {
                        return obj
                    }
                }
            )
        }))

    }

    const handlePreferencesChange = (e) => {
        e.persist()

        setResume(prevResume => ({
            jobPreferences: {...prevResume.jobPreferences,[e.target.name]: e.target.value},
            educationData: prevResume.educationData,
            experienceData: prevResume.experienceData,
            infoData: prevResume.infoData
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

    // components
    const step1 = (
        <>
            <h5 className="resume-form--header">Profile</h5>
            <div id="divider"></div>

            <div className="d-flex flex-row mt-5 mb-3">
                <div className="d-flex flex-column w-50 mr-1">
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" required onChange={e => handleInfoChange(e)} value={resume.infoData.firstName}  type="text" id="" placeholder="First name..." />
                </div>
                <div className="d-flex flex-column ml-1 w-50">
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" required onChange={e => handleInfoChange(e)} value={resume.infoData.lastName} type="text" id="" placeholder="Last name..." />
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="city">City</label>
                    <input required name="city" onChange={e => handleInfoChange(e)} value={resume.infoData.city} type="text" id="" placeholder="e.g Johor Bahru ..." />
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/call.svg')} alt="contact" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="contact">Contact Number</label>
                    <input required type="text" id="" onChange={e => handleInfoChange(e)} value={resume.infoData.contactNumber} name="contactNumber" placeholder="012-3456789" />
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/email.svg')} alt="email" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="email">Email</label>
                    <input required type="email" id="" onChange={e => handleInfoChange(e)} value={resume.infoData.email} name="email" placeholder="johndoe@gmail.com..." />
                </div>
            </div>
        </>
    )

    const step2 = (
        <>
            <h5 className="resume-form--header">Education</h5>
            <div id="divider"></div>

            <div className="d-flex flex-row mt-5 my-3 w-100">
                <img className="small-icon" src={require('../../images/degree.svg')} alt="degree" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="degree">Degree</label>
                    {degreeField.map((field, index) => (
                        <>
                            <select required name="degree" id="" onChange={(e) => handleEducationChange(e, index)}>
                                <option value="">Select an option</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </>
                    ))}
                    <a onClick={() => {
                        setDegreeField((prevField) =>
                            [...prevField, 'field']
                        )
                        setResume((prevResume) => ({
                            infoData: prevResume.infoData,
                            experienceData: prevResume.experienceData,
                            jobPreferences: prevResume.jobPreferences,
                            educationData: [...resume.educationData, {
                                index: degreeField.length,
                                degree: "",
                                school: "",
                                fieldOfStudy: "",
                                address: "",
                                timePeriod: {
                                    startMonth: "",
                                    endMonth: "",
                                    endYear: "",
                                    endMonth: "",
                                    attending: "Current attending"
                                },
                                isAttending: true
                            }]
                        }))
                    }}

                        style={{ textAlign: "right", textDecoration: "underline" }}>Add more +</a>
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/school.svg')} alt="school" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="school">School</label>
                    {degreeField.map((field, index) => (
                        <>
                            <input required name="school" onChange={e => handleEducationChange(e, index)} type="text" value={resume.educationData[index].school} id="" placeholder="Southern University College ..." />
                        </>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/fieldOfStudy.svg')} alt="fieldOfStudy" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="fos">Field of study</label>
                    {degreeField.map((field, index) => (
                        <>
                            <input required type="text" name="fieldOfStudy" onChange={e => handleEducationChange(e, index)} id="" value={resume.educationData[index].fieldOfStudy} placeholder="Computer Science ..." />
                        </>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/schooladdress.svg')} alt="schooladdress" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="schoolAddress">School Address</label>
                    {degreeField.map((field, index) => (
                        <>
                            <input required type="text" name="address" onChange={e => handleEducationChange(e, index)} id=" "value={resume.educationData[index].address} placeholder="No 100, Jalan 2/1 Johor Bahru ..." />
                        </>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/school.svg')} alt="school" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="timePeriod">Time Period</label>
                    {degreeField.map((field, index) => (
                        <>
                            <div className="d-flex flex-row align-items-center py-2">
                                <input type="checkbox"
                                    checked={(resume.educationData[index].isAttending) ?true:false}
                                    onChange={(e) => handleEducationChange(e, index)}
                                    name="attendingChkBox"
                                    id=""
                                    required
                                />
                                <p className="my-0 mx-2 py-0">Current attending</p>
                            </div>

                            {!resume.educationData[index].isAttending && (
                                <div className="resume-time-row d-flex flex-md-row flex-column align-items-center">
                                    <div>
                                        <select required onChange={(e) => handleEducationChange(e, index)} name="startMonth" id="startMonth">
                                            <option value="">Months:</option>
                                            {allMonths.map(month => (<option value={month}>{month}</option>))}
                                        </select>
                                        <select required onChange={(e) => handleEducationChange(e, index)} name="startYear" id="startYear">
                                            <option value="">Years:</option>
                                            {allYears.map(year => (<option value={year}>{year}</option>))}
                                        </select>
                                    </div>

                                    <h2 className="mx-auto" style={{ color: "var(--light-grey)" }}>To</h2>

                                    <div>
                                        <select required onChange={(e) => handleEducationChange(e, index)} name="endMonth" id="endMonth">
                                            <option value="">Months:</option>
                                            {allMonths.map(month => (<option value={month}>{month}</option>))}
                                        </select>
                                        <select required onChange={(e) => handleEducationChange(e, index)} name="endYear" id="endYear">
                                            <option value="">Years:</option>
                                            {allYears.map(year => (<option value={year}>{year}</option>))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}



                </div>
            </div>

        </>
    ) 

    const step3 =(
        <>
            <h5 className="resume-form--header">Work Experience</h5>
            <div id="divider"></div>

            <div className="d-flex flex-row mt-5 my-3 w-100">
                <img className="small-icon" src={require('../../images/degree.svg')} alt="jobTitle" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="jobTitle">Job Title</label>
                    {jobField.map((field, index) => (
                        <>
                            <input required name="jobTitle" onChange={e => handleExperienceChange(e, index)} value={resume.experienceData[index].jobTitle} type="text" id="" placeholder="Programmer ..." />                                    
                        </>
                    ))}
                    <a onClick={() => {
                        setJobField((prevJobField) =>
                            [...prevJobField, 'field']
                        )
                        setResume((prevResume) => ({
                            infoData: prevResume.infoData,
                            jobPreferences: prevResume.jobPreferences,
                            educationData: prevResume.educationData,
                            experienceData: [...prevResume.experienceData, {
                                index: jobField.length,
                                jobTitle:"",
                                company:"",
                                address:"",
                                isWorking: true,
                                working: "Current working",
                                startMonth:"",
                                startYear:"",
                                endMonth:"",
                                endYear:"",                                
                            }]
                        }))
                    }}

                        style={{ textAlign: "right", textDecoration: "underline" }}>Add more +</a>
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/school.svg')} alt="company" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="company">Company</label>
                    {jobField.map((field, index) => (
                        <>
                            <input required name="company" onChange={e => handleExperienceChange(e, index)} value={resume.experienceData[index].company} type="text" id="" placeholder="Southern University College ..." />
                        </>
                    ))}
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/fieldOfStudy.svg')} alt="address" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="address">Address</label>
                    {jobField.map((field, index) => (
                        <>
                            <input required type="text" name="address" onChange={e => handleExperienceChange(e, index)} value={resume.experienceData[index].address} id="" placeholder="Computer Science ..." />
                        </>
                    ))}
                </div>
            </div>
            
            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/school.svg')} alt="time" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="workingChkBox">Time Period</label>
                    {jobField.map((field, index) => (
                        <>
                            <div className="d-flex flex-row align-items-center py-2">
                                <input type="checkbox"
                                    checked={(resume.experienceData[index].isWorking) ?true:false}
                                    onChange={(e) => handleExperienceChange(e, index)}
                                    name="workingChkBox"
                                    id=""
                                />
                                <p className="my-0 mx-2 py-0">I am currently working here</p>
                            </div>

                            {!resume.experienceData[index].isWorking && (
                                <div className="resume-time-row d-flex flex-md-row flex-column align-items-center">
                                    <div>
                                        <select onChange={e => handleExperienceChange(e, index)} name="startMonth" id="startMonth">
                                            <option value="">Months:</option>
                                            {allMonths.map(month => (<option value={month}>{month}</option>))}
                                        </select>
                                        <select onChange={e => handleExperienceChange(e, index)} name="startYear" id="startYear">
                                            <option value="">Years:</option>
                                            {allYears.map(year => (<option value={year}>{year}</option>))}
                                        </select>
                                    </div>

                                    <h2 className="mx-auto" style={{ color: "var(--light-grey)" }}>To</h2>

                                    <div>
                                        <select onChange={e => handleExperienceChange(e, index)} name="endMonth" id="endMonth">
                                            <option value="">Months:</option>
                                            {allMonths.map(month => (<option value={month}>{month}</option>))}
                                        </select>
                                        <select onChange={e => handleExperienceChange(e, index)} name="endYear" id="endYear">
                                            <option value="">Years:</option>
                                            {allYears.map(year => (<option value={year}>{year}</option>))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}



                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/fieldOfStudy.svg')} alt="description" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="description">Description</label>                                            
                    <textarea required  name="description" id="textField" onChange={e => handleExperienceChange(e, 0)} value={resume.experienceData[0].description}></textarea>                                                                        
                </div>
            </div>

        </>
    )

    const step4 = (
        <>
            <h5 className="resume-form--header">Job Preferences</h5>
            <div id="divider"></div>  

            <div className="d-flex flex-row mt-5 my-3 w-100">
                <img className="small-icon" src={require('../../images/location.svg')} alt="desiredJobTitle" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="desiredJobTitle">Desired Job Title</label>
                    <input name="desiredJobTitle" onChange={e => handlePreferencesChange(e)} value={resume.jobPreferences.desiredJobTitle} type="text" id="" placeholder="e.g Programmer ..." />
                </div>
            </div>          

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/location.svg')} alt="desiredJobType" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="desiredJobType">Desired Job Type</label>                                
                    <div className="d-flex flex-row align-items-center flex-wrap py-2">
                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Full Time") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        name="desiredJobType"
                        value="Full Time"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Full Time</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Part Time") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        name="desiredJobType"
                        value="Part Time"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Part Time</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Contract") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Contract"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Contract</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Contract") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Contract"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Contract</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Temporary") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Temporary"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Temporary</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Internship") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Internship"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Internship</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Commission") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Commission"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Commission</p>

                        <input type="radio"
                        checked={(resume.jobPreferences.desiredJobType === "Volunteer") ?true:false}
                        onChange={(e) => handlePreferencesChange(e)}
                        value="Volunteer"
                        name="desiredJobType"
                        id="desiredJobType"
                        />
                        <p className="my-0 mx-2 mr-2 py-0">Volunteer</p>

                    </div>
                </div>
            </div>

            <div className="d-flex flex-row my-3 w-100">
                <img className="small-icon" src={require('../../images/call.svg')} alt="desiredSalary" />
                <div className="d-flex flex-column ml-3 w-100">
                    <label htmlFor="desiredSalary">Desired Salary</label>
                    <div className="d-flex flex-row align-items-center">
                        <h6 className="mr-3">RM</h6>
                        <input type="text" id="" onChange={e => handlePreferencesChange(e)} value={resume.jobPreferences.desiredSalary} name="desiredSalary" placeholder="1000" />
                    </div>                    
                </div>
            </div>            
        </>
    )

    return (
        <>
            <div className="resume-bg"></div>
            <div className="resume-container">
                <div className="resume-header d-flex flex-column flex-md-row align-items-lg-end">
                    <div className="d-flex flex-column mr-auto mb-3">
                        <h4>Create a resume</h4>
                        <p className="paragraph" style={{ textDecoration: "underline", color: "var(--light-grey)" }}>Or upload a resume</p>
                    </div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className={step === 1 ? `breadcrumb-item active` : `breadcrumb-item`}>Profile</li>
                            <li className={step === 2 ? `breadcrumb-item active` : `breadcrumb-item`}>Education</li>
                            <li className={step === 3 ? `breadcrumb-item active` : `breadcrumb-item`}>Experience</li>
                            <li className={step === 4 ? `breadcrumb-item active` : `breadcrumb-item`}>Preferences</li>
                        </ol>
                    </nav>
                </div>

                <form className="resume-form">

                    {/*   Profile   */}
                    {(step === 1) && step1}
                    {/*   Education   */}
                    {(step === 2) && step2}
                    {/* Work experience */}
                    {(step === 3) && step3}
                    {/* Job preferences */}
                    {(step === 4) && step4}

                    {/* pagination for resume form */}
                    <div className="d-flex flex-row">
                        {step > 1 && (
                            <button
                                className="mt-3 mr-auto no-styling-button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setStep(step - 1)
                                }}
                            >
                                Previous
                        </button>
                        )}

                        <button
                            className="mt-3 primary-bg-button ml-1"
                            onClick={(e) => {
                                e.preventDefault()
                                if(step !== 4)                                
                                    setStep(step + 1)
                                console.log('submit')
                            }}
                        >
                            {step === 4 ? "Submit" : "Next"}
                    </button>
                    </div>

                </form>


            </div>
        </>
    )
}

export default Resume
