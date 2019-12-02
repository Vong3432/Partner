import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobRequests, cancelJobRequests } from '../../actions/authActions'
import { useAlert } from 'react-alert'

const Request = () => {

    const alert = useAlert()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user);
    const requests = useSelector(state => state.auth.jobRequests);

    useEffect(() => {
        if (isLoading === true) {
            dispatch(getJobRequests(user.id))
        }
        setIsLoading(false)

        return (() => setIsLoading(true))
    }, [])

    const onCancelRequest = (e, id, jobID) => {
        e.preventDefault()
        dispatch(cancelJobRequests(id, jobID))
        alert.success('Request is cancelled');
    }

    return (
        <section className="employee-request-section">
            <div className="container">
                <table class="table table-hover table-responsive">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Status</th>
                            <th scope="col">Job Status</th>
                            <th scope="col">Chatroom ID</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests !== null && requests.map((req, index) => (
                            <tr key={req.RequestID}>
                                <th scope="row">{index + 1}</th>
                                <td>{req.Title}</td>
                                <td style={{ cursor: "pointer", textDecoration: "underline", color: "var(--primary-color)" }} onClick={e => window.location.href = `/job/previewall/${req.JobID}`}>{req.CompanyName}</td>
                                <td>{req.CandidateStatus}</td>
                                {req.Status === "1" && (<td>Open</td>)}
                                {req.Status === "0" && (<td>Pending</td>)}
                                {req.Status === "-1" && (<td>Closed</td>)}
                                {req.Status === "-2" && (<td>Banned</td>)}
                                {req.CandidateStatus !== "pending" ? <td style={{ cursor: "pointer", textDecoration: "underline", color: "var(--primary-color)" }} onClick={e => window.location.href = `/join/${req.ChatRoomID}`}>{req.ChatRoomID}</td> : <td>You are not approved yet</td>}
                                <td
                                    style={{
                                        color: "var(--danger)",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}
                                    onClick={(e) => { onCancelRequest(e, req.RequestID, req.JobID) }}
                                >
                                    Cancel
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </section>
    )
}

export default Request
