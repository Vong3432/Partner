import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobRequests } from '../../actions/authActions'

const Request = () => {

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

    return (
        <section className="employee-request-section">
            <div className="container">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={req.JobID}>
                                <th scope="row">{index+1}</th>
                                <td>{req.Title}</td>
                                <td>{req.CompanyName}</td>
                                <td>{req.CandidateStatus}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>

                
            </div>
        </section>
    )
}

export default Request
