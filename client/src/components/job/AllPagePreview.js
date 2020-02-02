import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PreviewContext } from '../../PreviewContext'
import Spinner from '../../components/Spinner'
import { applyJob, displayCurrentJobDetail, getApplyJobRequest, approveRequest, disApproveRequest } from '../../actions/jobActions'
// import nl2br from 'react-nl2br'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getApplyJobs } from '../../actions/jobActions'
import { useAlert } from 'react-alert'
// import { clearErrors } from '../../actions/errorActions'

const AllPagePreview = (props) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const error = useSelector(state => state.error)
    const selectedJob = useSelector(state => state.job.currentJob)
    const job = useSelector(state => state.job)

    const [isLoading, setIsLoading] = useState(true)
    const nlb2r = require('react-nl2br')

    const msg = "Please select a job";

    useEffect(() => {

        if (isLoading === true) {
            dispatch(displayCurrentJobDetail(props.match.params.jobid))            
            setIsLoading(false)
        }
        return (() => setIsLoading(true))
    }, [])

    useEffect(() => {
        if(selectedJob)
            dispatch(getApplyJobRequest(selectedJob[0].JobID))        
    }, [selectedJob])

    AllPagePreview.propTypes = {
        user: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    }

    const onApply = (e) => {
        e.preventDefault()

        if (!isAuthenticated || user.category === "employer")
            alert.error("You dont have the authority to apply job.")
        else {

            const newRequest = {
                CandidateListID: selectedJob[0].CandidateListID,
                ApplicantID: user.id,
                JobID: selectedJob[0].JobID,
                Name: user.name,
                Email: user.email
            }
            console.log(newRequest)

            dispatch(applyJob(newRequest))
            try {
                alert.success('Apply successfully!')
                dispatch(getApplyJobs())
                dispatch(getApplyJobRequest(selectedJob[0].JobID))        
            } catch (err) {
                if (error.id === "ADD_FAIL") {
                    alert.error(error.msg.msg)
                }
            }
        }
    }

    return (
        <>
            {/* {isLoading ? <Spinner />} */}
            {selectedJob && (
                isLoading === false ? (
                    <>
                        <div className="preview-all">
                            <div className="d-flex flex-row align-items-center">
                                <h3 className="mb-2" style={{ textTransform: "capitalize" }}>{selectedJob[0].Title}</h3>
                                {selectedJob[0].Status === "-2" ? <p className="mb-0 ml-auto font-weight-bold" style={{ color: "var(--danger)" }}>Banned</p> : null}
                                {selectedJob[0].Status === "-1" ? <p className="mb-0 ml-auto font-weight-bold" style={{ color: "var(--danger)" }}>Closed</p> : null}
                                {selectedJob[0].Status === "0" ? <p className="mb-0 ml-auto font-weight-bold">Pending</p> : null}
                                {selectedJob[0].Status === "1" ? <p className="mb-0 ml-auto font-weight-bold" style={{ color: "var(--green-color)" }}>Opened</p> : null}
                            </div>
                            {/* <Link to="/previewall">View in all page</Link> */}
                            <div className="media my-4 align-items-start">
                                <div className="media-body">
                                    <p className="mt-0 card-companyName mb-1">{selectedJob[0].CompanyName}</p>
                                    <div className="d-flex flex-row">
                                        <div className="d-flex flex-row">
                                            <img className="small-icon mr-2" src={require('../../images/color-location.svg')} alt="color-location" />
                                            <small className="card-sub-title">{selectedJob[0].Location}</small>
                                        </div>
                                        <div className="d-flex flex-row ml-3">
                                            <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds" />
                                            <small className="card-sub-title">RM {selectedJob[0].Salary}</small>
                                        </div>
                                    </div>
                                </div>
                                <img style={{ maxWidth: "100px", maxHeight: "60px", objectFit: "contain" }} src={selectedJob[0].ProfilePic ? '../../uploads/profile/' + selectedJob[0].ProfilePic : null} className="mr-3" alt="..." />
                            </div>

                            <img className="my-2" style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }} src={"../../uploads/jobs/" + selectedJob[0].Picture} alt="" />

                            <h5 className="mt-4 mb-2">Description</h5>
                            {/* <div id="divider" className="mb-2"></div> */}
                            {/* {multipleDescription.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}                                        */}
                            <p style={{ textAlign: "justify" }} className="paragraph">{nlb2r(selectedJob[0].Description)}</p>

                            <h5 className="mt-4 mb-2">Requirement</h5>
                            {/* <div id="divider" className="mb-2"></div> */}
                            {/* {multipleRequirement.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}  */}
                            <p style={{ textAlign: "justify" }} className="paragraph">{nlb2r(selectedJob[0].Requirement)}</p>

                            <h5 className="mt-4 mb-2">Job Type</h5>
                            {/* <div id="divider" className="mb-2"></div> */}
                            <div className="d-flex flex-row">
                                <p className="paragraph">{selectedJob[0].Type.substring(0, selectedJob[0].Type.length - 1)}</p>
                            </div>

                            {/* {applyJobList.filter(i => i.)} */}
                            {selectedJob[0].Status === "1" ? <button onClick={e => onApply(e)} className="primary-bg-button ml-0 mt-5 mw-100 w-100">Apply</button> : null}
                        </div>

                        <h3 style={{ marginTop: "3em" }} className="mb-4">Candidates</h3>
                        {isLoading === false && (
                            <div className="preview-all-candidate mb-5">
                                {job.applyRequestList.map((item, index) => (
                                    <>
                                        <div style={{maxWidth:"30%"}} key={item.ApplicantID} className="card align-items-start d-flex flex-row my-3 mr-3 card-shadow">
                                            <div className="card-body d-flex flex-column">
                                                <img id="avatar--small" src={`../../uploads/profile/${item.ProfilePic}`} />
                                                <p className="mb-0">{item.Name}</p>
                                                <small>{item.Email}</small>
                                            </div>
                                            
                                            {user && selectedJob[0].Status === "1" && selectedJob[0].EmployerID === user.id && (
                                                <>
                                                    {item.CandidateStatus === "pending" ? <a onClick={e => dispatch(approveRequest(selectedJob[0].JobID, item.UserID))} style={{marginTop:"-10px"}} className="ml-auto warning-bg-button">Approve it</a>  : <a onClick={e => dispatch(disApproveRequest(selectedJob[0].JobID, item.UserID))} style={{marginTop:"-10px"}} className="ml-auto success-bg-button" href="">Approved</a>}
                                                </>
                                            )}
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}

                    </>
                ) : <Spinner />
            )}
        </>
    )
}

export default AllPagePreview;


const albums = [
    {
        id: '1',
        artwork: 'avatar.jpg',
        title: 'Title',
        artist: 'asd',
        year: 2000
    },
    {
        id: '1',
        artwork: 'avatar.jpg',
        title: 'Title',
        artist: 'asd',
        year: 2000
    },
    {
        id: '1',
        artwork: 'avatar.jpg',
        title: 'Title',
        artist: 'asd',
        year: 2000
    },
]