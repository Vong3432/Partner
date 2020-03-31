import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PreviewContext } from '../../PreviewContext'
import Spinner from '../../components/Spinner'
import { applyJob } from '../../actions/jobActions'
// import nl2br from 'react-nl2br'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getApplyJobs } from '../../actions/jobActions'
// import { clearErrors } from '../../actions/errorActions'

const Preview = (props) => {    

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)
    // const [multipleDescription, setMultipleDescription] = useState([])
    // const [multipleRequirement, setMultipleRequirement] = useState([])

        
    const dispatch = useDispatch()
    const applyJobList = useSelector(state => state.job.applyJobList)
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const error = useSelector(state => state.error)

    const [isLoading, setIsLoading] = useState(true)
    const nlb2r = require('react-nl2br')    

    const msg = "Please select a job";

    useEffect(() => {
        console.log('Preview is rerender.')        
        if(selectedJob.title)
            {
                setIsLoading(false)
                // setMultimeDescription(selectedJob.description.split("<next>")) 
                // setMultipleRequirement(selectedJob.requirement.split("<next>"))                                           
            }
        return (() => setIsLoading(true))
    }, [selectedJob])           

    Preview.propTypes = {        
        user: PropTypes.object.isRequired,   
        isAuthenticated: PropTypes.bool.isRequired
    }

    const onApply = (e) => {
        e.preventDefault()        

        if(!isAuthenticated || user.category === "employer")
            alert("You dont have the authority to apply job.")
        else
        {
            
            const newRequest = {
                CandidateListID: selectedJob.CandidateListID,
                ApplicantID: user.id,
                JobID: selectedJob.JobID,
                Name: user.name,
                Email: user.email
            }            
            console.log(newRequest)

            dispatch(applyJob(newRequest))            
            try
            {
                alert('Apply successfully!')
                dispatch(getApplyJobs())
            } catch(err)
            {
                if(error.id === "ADD_FAIL")
                {                                
                    alert(error.msg.msg)                    
                }            
            }                      
        }
    }

    return (
        <>
            {/* {isLoading ? <Spinner />} */}
            {(selectedJob.title) && (
                !isLoading ?
                <>
                    <h3 className="mb-2" style={{textTransform:"capitalize"}}>{selectedJob.title}</h3>
                    <Link to={`/job/previewall/${selectedJob.job_id}`}>View in all page</Link>
                    <div className="media my-4 align-items-start">                        
                        <div className="media-body">
                            <p className="mt-0 card-companyName mb-1">{selectedJob.company_name}</p>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-row">
                                    <img className="small-icon mr-2" src={require('../../images/color-location.svg')} alt="color-location" />
                                    <small className="card-sub-title">{selectedJob.location}</small>
                                </div>
                                <div className="d-flex flex-row ml-3">
                                    <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds" />
                                    <small className="card-sub-title">RM {selectedJob.salary}</small>
                                </div>
                            </div>
                        </div>
                        <img style={{ maxWidth: "100px", maxHeight: "60px", objectFit: "contain" }} src={selectedJob.ProfilePic ? './uploads/profile/' + selectedJob.ProfilePic :null} className="mr-3" alt="..." />
                    </div>                    

                    <img style={{maxHeight:"500px", maxWidth:"100%",objectFit:"cover"}} src={selectedJob.imageUrl} alt={selectedJob.title} />

                    <h5 className="mt-4 mb-2">Description</h5> 
                    {/* <div id="divider" className="mb-2"></div> */}
                    {/* {multipleDescription.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}                                        */}
                    <p style={{textAlign:"justify"}} className="paragraph">{nlb2r(selectedJob.description)}</p>                    
                    
                    <h5 className="mt-4 mb-2">Requirement</h5>
                    {/* <div id="divider" className="mb-2"></div> */}
                    {/* {multipleRequirement.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}  */}
                    <p style={{textAlign:"justify"}} className="paragraph">{nlb2r(selectedJob.requirement)}</p>

                    <h5 className="mt-4 mb-2">Job Type</h5>
                    {/* <div id="divider" className="mb-2"></div> */}
                    <div className="d-flex flex-row">
                        {selectedJob.type.map((item, index) => <p className="paragraph">{index === selectedJob.type.length - 1 ? item : item + ", "}</p>)}
                    </div>                    

                    {/* {applyJobList.filter(i => i.)} */}
                    <button onClick={e => onApply(e)} className="primary-bg-button ml-0 mt-5 mw-100">Apply</button>
                </> : <Spinner />
            )}
            {!selectedJob.title ? <h2>{msg}</h2> : ""}
        </>
    )
}

export default Preview;
