import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, deleteJob } from '../../actions/jobActions';
import { deactiveJob, reactiveJob } from '../../actions/adminActions';

const Jobs = ({ show }) => {

    // state
    const [isLoading, setIsLoading] = useState(true)    
    const job = useSelector(state => state.job)

    // dispatch
    const dispatch = useDispatch();

    // effect
    useEffect(() => {

        if (isLoading === true) {
            dispatch(getJobs());
            setIsLoading(false)
        }

        return (() => setIsLoading(true))
    }, [])

    useEffect(()=>{
        
    }, [job.jobs])
    

    // handlers
    const deactive = (e, id) => {
        e.preventDefault()
        console.log(id)        
        dispatch(deactiveJob(id))
    }

    const reactive = (e, id) => {
        e.preventDefault()
        console.log(id)        
        dispatch(reactiveJob(id))
    }

    return (
        <main className="dashboard-content" style={show ? { marginLeft: "300px" } : { marginLeft: "50px" }}>
            <h5 className="dashboard-content-header">Jobs</h5>
            <p className="ml-auto">Total: {job.jobs ? job.jobs.length : 0}</p>

            <div className="table-responsive">                
                <table className="table">                    
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Job</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Location</th>
                            <th scope="col">Candidates</th>
                            <th scope="col">Views</th>
                            <th scope="col">Life Span</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {job.jobs ? job.jobs.map((item, index) => (
                            <tr>                                
                                {item.Status === "-2" ? (
                                    <th scope="row"><button type="submit" onClick={(e) => { reactive(e, item.JobID); dispatch(getJobs()) }} className="success-bg-button" style={{ width: "initial", fontSize: ".7rem" }}>Reactive</button></th>
                                ) : <th scope="row"><button type="submit" onClick={(e) => { deactive(e, item.JobID); dispatch(getJobs()) }} className="danger-bg-button" style={{ width: "initial", fontSize: ".7rem" }}>Deactive</button></th> }  
                                <td>{item.Title}</td>
                                <td>RM{item.Salary}</td>
                                <td>{item.Location}</td>
                                <td>{item.TotalCandidate} Candidate</td>
                                <td>{item.View}</td>
                                <td>{item.DueDate}</td>
                                {item.Status === "1" && (<td>Open</td>)}
                                {item.Status === "0" && (<td>Pending</td>)}
                                {item.Status === "-1" && (<td>Closed</td>)}
                                {item.Status === "-2" && (<td>Banned</td>)}
                                {/* <td><i onClick={e => { toggle(); displayModal(index) }} style={{ fontSize: ".7rem", cursor: "pointer" }} class='fas'>&#xf044;</i></td> */}                                
                            </tr>                            
                        )) : dispatch(getJobs())}
                    </tbody>
                </table>
            </div>

        </main>
    )
}

export default Jobs
