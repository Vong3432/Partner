import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { addJob } from '../../actions/jobActions'
import PropTypes from 'prop-types'

const AddJob = (props) => {
    AddJob.propTypes = {    
        job: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        addJob: PropTypes.func.isRequired
    }

    // state
    const [job, setJob] = useState({
        title: "",
        description: "",
        category: "",
        type: {

        },
        requirement: "",
        duration: 0,
        salary: 0
    })
    const [step, setStep] = useState(1)
    const [errMsg, setErrMsg] = useState("")

    // side-effect
    useEffect(() => {
        console.log(props.user.user.category)
        if(props.user.user.category !== "employer")
        {
            alert("You can't access to this page.")
            window.location.href="/"
        }
    }, [job])

    // event handler
    const handleChange = e => {
        const { name, value } = e.target;

        setJob({
            ...job,
            [name]: value
        })

        console.log(job)

    }

    const onSubmit = e => {
        e.preventDefault()
        setErrMsg('')

        if (job.title && job.description && job.duration && job.requirement && job.type && job.category && job.salary) {
            const newJob = {                
                employer_id: props.user.user.id, 
                title: job.title,                
                description: job.description,
                requirement: job.requirement,
                type: job.type,
                category: job.category,
                salary: job.salary,
                duration: job.duration
            }
            props.addJob(newJob)
            window.alert('Added successfully.')            
        }
        else
            alert('Please fill in all information.')
    }

    useEffect(() => {
        if(step > 1)
        {
            window.scrollTo({
                'behavior': 'smooth',
                'left':0,
                'top': window.scrollY + 400
            })
        }        
    }, [step])

        // css
    const activeTab = {
        backgroundColor:"var(--primary-color)",
        color:"#fff"
    }

    const normalTab = {
        backgroundColor:"transparent",
        color:"var(--dark-color)"
    }

    // components
    const step1 = (
        <div className="addjob-form--part mb-3">
            <div className="d-flex flex-column w-100">
                <h4 className="title">Job Information</h4>
                <div id="divider"></div>

                <div className="d-flex flex-row mt-5 my-3 w-100">
                    <img className="small-icon" src={require('../../images/suitcase.svg')} alt="suitcase" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="title">Job Title</label>
                        <input name="title" value={job.title} onChange={(e) => handleChange(e)} type="text" id="" placeholder="e.g Programmer ..." />
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/funds.svg')} alt="funds" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="salary">Salary</label>
                        <div className="d-flex flex-row align-items-center w-100">
                            <h6 className="mr-3" style={{fontSize:".9rem"}}>RM</h6>
                            <input style={{width:"100%"}} type="text" id="" onChange={e => handleChange(e)} value={job.salary} name="salary" placeholder="3000" />
                        </div>                    
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/conversation.svg')} alt="conversation" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="description" className="mb-0">Job Description</label>
                        <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong>
                        <textarea name="description" onChange={(e) => handleChange(e)} id="" placeholder="Some description ...">{job.description}</textarea>
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/testing.svg')} alt="testing" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="requirement" className="mb-0">Job Requirements</label>
                        <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong>
                        <textarea name="requirement" onChange={(e) => handleChange(e)} id="" placeholder="Some description ...">{job.requirement}</textarea>
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/category.svg')} alt="category" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="description">Job Category</label>
                        <select required onChange={(e) => handleChange(e)} name="category" id="category">
                            <option value="">Select category:</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>
                </div>


                {(job.title && job.description && job.category && job.requirement) && (
                    <button onClick={(e) => {e.preventDefault(); setStep(step + 1)}} className="ml-auto mr-0 primary-bg-button" style={{ borderRadius: "0" }}>Next</button>
                )}

            </div>
        </div>
    )

    const step2 = (
        <div className={step >= 2 ? "addjob-form--part mb-3 transition-show": "transition-hide addjob-form--part mb-3"}>
            <div className="decision--box-container">
                
                <label className="mb-3" style={{ gridArea: "title" }}>
                    <h4 className="title">Job Type</h4>
                    <div id="divider"></div>
                </label>                

                <div className="decision--box" style={job.type.fullTime === "Full Time" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: {...prevJob.type, fullTime: "Full Time"} }))}>                    
                    <h5>Full-Time</h5>
                </div>
                <div className="decision--box" style={job.type.partTime === "Part Time" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: {...prevJob.type, partTime: "Part Time"} }))}>                
                    <h5>Part-Time</h5>
                </div>
                <div className="decision--box" style={job.type.contract === "Contract" ? activeTab : normalTab}onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: {...prevJob.type, contract: "Contract"} }))}>                    
                    <h5>Contract</h5>
                </div>
                <div className="decision--box" style={job.type.commission === "Commission" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: {...prevJob.type, commission: "Commission"} }))}>                    
                    <h5>Commission</h5>
                </div>
                <div className="decision--box" style={job.type.internship === "Internship" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: {...prevJob.type, internship: "Internship"} }))}>                    
                    <h5>Internship</h5>
                </div>                

            </div>
            {(job.type) && (
                <div className="d-flex flex-row">
                    <button onClick={(e) => {e.preventDefault(); setJob((prevJob) => ({ ...prevJob, type: {} }))}} className="ml-auto mr-0 mt-3 no-styling-button" style={{ borderRadius: "0" }}>Reset</button>
                    <button onClick={(e) => {e.preventDefault(); setStep(step + 1)}} className="ml-3 mr-0 mt-3 primary-bg-button" style={{ borderRadius: "0" }}>Next</button>
                </div>
            )}
        </div>
    )

    const step3 = (
        <div className={step >= 3 ? "addjob-form--part mb-3 transition-show": "transition-hide addjob-form--part mb-3"}>
            <div className="d-flex flex-row align-items-center flex-wrap w-100">
                <h4 className="title mr-1">I want to post this job for:</h4>                
                <div className="ml-auto d-flex flex-row align-items-center">
                    <input style={{maxWidth:"80px"}} className="mr-3" type="number" id="" onChange={e => handleChange(e)} name="duration" placeholder="7" />
                    <h6>Days</h6>                            
                </div> 


                {(job.duration) ? (
                    <button onClick={(e) => onSubmit(e)} className="ml-auto mr-0 primary-bg-button" style={{ borderRadius: "0" }}>Post</button>
                ): ""}

            </div>
        </div>
    )

    return (
        <>
            <form className="form mx-auto" onSubmit={onSubmit} style={{ marginTop: "6em", maxWidth: "80%", marginBottom:"3em" }}>
                {(step >= 1) && step1}
                {(step >= 2) && step2}
                {(step >= 3) && step3}
            </form>
        </>
    )
}

function mapStateToProps(state)
{    
    return{
        job: state.job,
        user: state.auth
        // isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { addJob })(AddJob);
