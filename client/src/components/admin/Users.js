import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, deactiveUser, reactiveUser } from '../../actions/adminActions';

const Users = ({show}) => {

    const [isLoading, setIsLoading] = useState(true);
    const admin = useSelector(state => state.admin)
    
    const dispatch = useDispatch();    

    useEffect(() => {

        if(isLoading === true)
        {
            dispatch(getAllUsers())
            setIsLoading(false)
        }

        return(() => setIsLoading(true))
    }, [])

    // handlers
    const deactive = (e, id) => {
        e.preventDefault()
        console.log(id)        
        dispatch(deactiveUser(id))
    }

    const reactive = (e, id) => {
        e.preventDefault()
        console.log(id)        
        dispatch(reactiveUser(id))
    }

    return (
        <main className="dashboard-content" style={show ? { marginLeft: "300px" } : { marginLeft: "50px" }}>
            <h5 className="dashboard-content-header">Users</h5>
            <p className="ml-auto">Total: {admin.users ? admin.users.length : 0}</p>

            <div className="table-responsive">                
                <table className="table">                    
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Account Type</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {admin.users ? admin.users.map((user, index) => (
                            <tr>                            
                                {user.Status === "1" ? (
                                    <th scope="row"><button onClick={(e) => { deactive(e, user.UserID); dispatch(getAllUsers()) }} className="danger-bg-button" style={{ width: "initial", fontSize: ".7rem" }}>Deactive</button></th>
                                ) : <th scope="row"><button onClick={(e) => { reactive(e, user.UserID); dispatch(getAllUsers()) }} className="success-bg-button" style={{ width: "initial", fontSize: ".7rem" }}>Reactive</button></th> }                                    
                                <td>{user.Name}</td>
                                <td>{user.AccountType}</td>
                                <td>{user.Email}</td>
                                {user.Status === "1" ? <td>Active</td> : <td>Suspend</td> }
                                {/* <td><i onClick={e => { toggle(); displayModal(index) }} style={{ fontSize: ".7rem", cursor: "pointer" }} class='fas'>&#xf044;</i></td> */}                                
                            </tr>                            
                        )) : null}
                    </tbody>
                </table>
            </div>

        </main>
    )
}

export default Users
