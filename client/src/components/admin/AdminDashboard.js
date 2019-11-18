import React, { useState } from 'react'
import '../../Admin.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Main from './Main';
import { useSelector } from 'react-redux'

const AdminDashboard = () => {

    // state
    const user = useSelector(state => state.auth.user)    
    const [show, setShow] = useState(true)

    // effect

    // function
    const toggle = () => {
        setShow(!show);
    }

    return (
        <>
            {user !== null && user.category === "ADMIN" && (
                <div className="dashboard-container">
                    <Router>
                        <Sidebar toggle={toggle} show={show}/>
                        <Switch>
                        <Route exact path="/admin/dashboard/" render={props=><Main {...props} show={show} />}/>
                        </Switch>
                    </Router>

                </div>
            )}
        </>
    )
}

export default AdminDashboard
