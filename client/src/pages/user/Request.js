import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobRequests, cancelJobRequests } from '../../actions/authActions'
import { useAlert } from 'react-alert'

const Request = () => {

    const alert = useAlert()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user);
    const requests = useSelector(state => state.auth.jobRequests);

    useEffect(()=>{
        if(isLoading === true)
        {
            dispatch(getJobRequests(user.id))            
        }
        setIsLoading(false)

        return(() => setIsLoading(true))
    }, [])

    const onCancelRequest = (e, id) => {
        e.preventDefault()
        dispatch(cancelJobRequests(id))
        alert.success('Request is cancelled');
    }

    return (
        <section className="employee-request-section">
            <div className="container">
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests !== null && requests.map((req, index) => (
                            <tr key={req.RequestID} style={{cursor:"pointer"}} onClick={e => window.location.href=`/job/previewall/${req.JobID}`}>
                                <th scope="row">{index+1}</th>
                                <td>{req.Title}</td>
                                <td>{req.CompanyName}</td>
                                <td>{req.CandidateStatus}</td>
                                <td 
                                style={{
                                    color:"var(--danger)", 
                                    textDecoration:"underline", 
                                    cursor:"pointer"
                                }}
                                onClick={(e) => {onCancelRequest(e, req.RequestID)}}
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
