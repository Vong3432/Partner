import React, { useEffect, useState } from 'react'
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom'

import { deleteJob, updateJob, getApplyJobRequest, getJobs, getSelfJobs } from '../../actions/jobActions'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Spinner from '../Spinner'
import { showProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from 'react-alert'

const EmployerTable = (props) => {
    const alert = useAlert()

    const PRICE_PER_DAY = 1;

    EmployerTable.propTypes = {
        deleteJob: PropTypes.func.isRequired,
        job: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool
    }

    var todayDate = new Date()

    const [modal, setModal] = useState(false)
    const [isOwner, setIsOwner] = useState(true)
    const [index, setIndex] = useState(0)
    const [isEmployer, setIsEmployer] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [currentJob, setCurrentJob] = useState({
        Title: "",
        Location: "",
        Salary: "",
        Requirement: "",
        Description: "",
        Status: ""
    })

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.user)
    const job = useSelector(state => state.job)

    const [src, setSrc] = useState(null)

    const toggle = () => {
        setModal(!modal);
        // console.log(currentJob)     
    }

    const displayModal = (index) => {
        // console.log(index)       
        setIndex(index)
    }
    // dispatch(getSelfJobs(props.match.params.id))

    useEffect(() => {
        // dispatch(getApplyJobRequest(user.user.name))   
        // setCurrentJob(job.jobs)
        // console.log(job.jobs)


        if (user.user.category === "employer" && user.isAuthenticated === true) {
            if (isLoading === true) {
                dispatch(showProfile(props.match.params.id))
                // dispatch(getJobs())                       
                dispatch(getSelfJobs(props.match.params.id))
                dispatch(getApplyJobRequest(props.match.params.id))
                // console.log(user, job.selfJobs)
                console.log(job.applyRequestList)
                // console.log(job)
                setSrc(profile.ProfilePic)
                setIsLoading(false)
            }
        }

        else {
            alert.error('You dont have the authorization to access this page.')
            window.location.href = "/"
        }

        return (() => { setIsLoading(true) })
    }, [])

    useEffect(() => {
        console.log(job.jobs, job.jobs[index])
        if (job.jobs.length > 0)
            setCurrentJob(job.jobs[index])
    }, [index])

    const onEdit = (e) => {
        e.persist()
        // console.log(e.target.name, e.target.value)        
        setCurrentJob((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        // e.preventDefault()
        console.log(currentJob)
        dispatch(updateJob(job.jobs[index].JobID, currentJob))
        alert.success("Updated successfully");
        // console.log(job)
        dispatch(getSelfJobs(props.match.params.id))
    }    

    const onDelete = (e, id) => {
        e.preventDefault()
        // console.log(id)        
        dispatch(deleteJob(id))
        alert.success("Deleted successfully")
        dispatch(getSelfJobs(props.match.params.id))
    }

    return (
        <>
            {(isEmployer && isOwner) && (
                <>
                    {job.selfJobs && (
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Jobs</ModalHeader>
                            <ModalBody>
                                <div className="addjob-form--part mb-3">
                                    <div className="d-flex flex-column w-100">
                                        <h4 className="title">Job Information</h4>
                                        <div id="divider"></div>

                                        <div className="d-flex flex-row mt-5 my-3 w-100">
                                            <img className="small-icon" src={require('../../images/suitcase.svg')} alt="suitcase" />
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <label htmlFor="title">Job Title</label>
                                                <input name="Title" value={currentJob.Title} onChange={(e) => onEdit(e)} type="text" id="" placeholder="e.g Programmer ..." />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row my-3 w-100">
                                            <img className="small-icon" src={require('../../images/funds.svg')} alt="funds" />
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <label htmlFor="salary">Salary</label>
                                                <div className="d-flex flex-row align-items-center w-100">
                                                    <h6 className="mr-3" style={{ fontSize: ".9rem" }}>{job.applyRequestList.Salary}</h6>
                                                    <input style={{ width: "100%" }} type="text" id="" onChange={e => onEdit(e)} value={currentJob.Salary} name="Salary" placeholder="3000" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row my-3 w-100">
                                            <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <label htmlFor="location">Location</label>
                                                <input style={{ width: "100%" }} type="text" id="" onChange={e => onEdit(e)} value={currentJob.Location} name="Location" placeholder="Johor Bahru" />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row my-3 w-100">
                                            <img className="small-icon" src={require('../../images/conversation.svg')} alt="conversation" />
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <label htmlFor="description" className="mb-0">Job Description</label>
                                                {/* <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong> */}
                                                <textarea name="Description" onChange={(e) => onEdit(e)} id="" placeholder="Some description ...">{currentJob.Description}</textarea>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row my-3 w-100">
                                            <img className="small-icon" src={require('../../images/testing.svg')} alt="testing" />
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <label htmlFor="requirement" className="mb-0">Job Requirements</label>
                                                {/* <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong> */}
                                                <textarea name="Requirement" onChange={(e) => onEdit(e)} id="" placeholder="Some description ...">{currentJob.Requirement}</textarea>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row my-3 w-100">
                                            <div className="d-flex flex-column mx-auto w-100">
                                                {todayDate < new Date(currentJob.DueDate) && (

                                                    <>
                                                        <label htmlFor="requirement" className="mb-0">Status</label>
                                                        {/* <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong> */}
                                                        {/* <input type="text" name="Status" onChange={(e) => onEdit(e)} id="" value={currentJob.Status} placeholder="Some description ..." /> */}
                                                        <select name="Status" onChange={(e) => onEdit(e)}>
                                                            <option value disabled selected>Please select status:</option>
                                                            <option value="1">Open</option>
                                                            <option value="0">Pending</option>
                                                            <option value="-1">Closed</option>
                                                        </select>
                                                    </>
                                                )}

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {todayDate < new Date(currentJob.DueDate) ? (
                                    <>
                                        <Button color="primary" onClick={e => { toggle(); onSubmit(e) }}>Update</Button>{' '}
                                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                                    </>
                                ) : (
                                        <>
                                            {currentJob.duration && (
                                                <PayPalButton
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [{
                                                                amount: {
                                                                    currency_code: "USD",
                                                                    value: currentJob.duration * PRICE_PER_DAY
                                                                }
                                                            }],
                                                            // application_context: {
                                                            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                                            // }
                                                        });
                                                    }}
                                                    options={{
                                                        clientId: "AX8ba9UcodHNg-W76ybWHYam3ocKe4J8ZcMaSq1xYzHF9t5XHn57CqTLnx-L2pq_IvIT_uvF6XiDilUf"
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        // Capture the funds from the transaction
                                                        return actions.order.capture().then(function (details) {
                                                            // Show a success message to your buyer
                                                            alert.success("Transaction completed by " + details.payer.name.given_name);
                                                            onSubmit()
                                                            // OPTIONAL: Call your server to save the transaction
                                                            return fetch("/paypal-transaction-complete", {
                                                                method: "post",
                                                                body: JSON.stringify({
                                                                    orderID: data.orderID
                                                                })
                                                            });
                                                        });
                                                    }}
                                                />
                                            )}

                                            <div className="paypal-subtotal-section">
                                                <label htmlFor="duration" className="mb-0 paypal-subtotal--description">Extends this job for</label>
                                                <div className="d-flex flex-row align-items-center w-100">
                                                    <input style={{ maxWidth: "80px" }} className="mr-1 paypal-subtotal--duration" type="number" id="" onChange={e => onEdit(e)} name="duration" placeholder="7" />
                                                    <h6 className="mr-auto">Days</h6>
                                                </div>
                                                <small style={{ color: "var(--danger)" }}>USD {PRICE_PER_DAY} Per Day</small>
                                                <p>Checkout: USD {currentJob.duration ? currentJob.duration * PRICE_PER_DAY : 0}</p>
                                            </div>
                                        </>
                                    )}
                            </ModalFooter>
                        </Modal>
                    )}

                    <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                        {/* user avatar and name */}
                        <div className="text-center mt-auto">
                            <img src={profile.ProfilePic ? '/uploads/profile/' + src : null} id="avatar" style={{ backgroundColor: "grey", borderRadius: "200px", height: "200px", width: "200px" }} />
                            <h2 className="profile-username mt-2">{isLoading === false ? profile.Name : null}</h2>
                        </div>

                        {/* social media links */}
                        <div className="nav employer-navbar mt-auto mb-5" style={{ minHeight: "initial" }}>
                            <NavLink exact={true} to={{ pathname: `/profile/${props.match.params.id}`, state: { user: props.user, profile: props.profile } }} tag={RRNavLink} activeClassName="employer-navlink-active">Dashboard</NavLink>
                            <NavLink exact={true} to={{ pathname: `/profile/employertable/${props.match.params.id}`, state: { user: props.user, profile: props.profile } }} tag={RRNavLink} activeClassName="employer-navlink-active">Job</NavLink>
                            {/* <NavLink exact={true} to="/messages" tag={RRNavLink} activeClassName="employer-navlink-active">Messages</NavLink> */}
                            <NavLink exact={true} to={{ pathname: '/addJob' }} tag={RRNavLink} activeClassName="employer-navlink-active" className="ml-auto primary-bg-button">Post Job</NavLink>
                        </div>

                    </section>

                    <div className="table-responsive">
                        <table className="table table-hover" style={{ marginTop: "90vh", marginBottom: "20vh" }}>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Candidates</th>
                                    {/* <th scope="col">Views</th> */}
                                    <th scope="col">Life Span</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {job.selfJobs ? job.selfJobs.map((item, index) => (
                                    <tr key={index} >
                                        <th scope="row"><button onClick={(e) => { onDelete(e, item.JobID); dispatch(getSelfJobs(props.match.params.id)) }} className="danger-bg-button" style={{ width: "initial", fontSize: ".7rem" }}>X</button></th>
                                        <td style={{cursor:"pointer", textDecoration:"underline", color:"var(--primary-color)"}} onClick={e => window.location.href=`/job/previewall/${item.JobID}`}>{item.Title}</td>
                                        <td>RM{item.Salary}</td>
                                        <td>{item.Location}</td>
                                        <td>{item.TotalCandidates} Candidate</td>
                                        {/* <td>{item.View}</td> */}
                                        <td>{todayDate > new Date(item.DueDate) ? <p style={{ color: "var(--danger)" }}>Expired</p> : item.DueDate}</td>
                                        {item.Status === "1" && (<td>Open</td>)}
                                        {item.Status === "0" && (<td>Pending</td>)}
                                        {item.Status === "-1" && (<td>Closed</td>)}
                                        <td><i onClick={e => { toggle(); displayModal(index) }} style={{ fontSize: ".7rem", cursor: "pointer" }} class='fas'>&#xf044;</i></td>
                                    </tr>
                                )) : dispatch(getSelfJobs(props.match.params.id))}
                            </tbody>
                        </table>
                    </div>

                </>
            )}
        </>
    )
}

export default EmployerTable;
