import React, { useState, useEffect } from 'react'
import '../../Admin.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Jobs from './Jobs';
import Users from './Users';
import Feedbacks from './Feedback';
import Main from './Main';

const AdminRouter = (props) => {

    // state
    const user = useSelector(state => state.auth.user)    
    const [show, setShow] = useState(true)

    // effect

    // function
    const toggle = () => {
        setShow(!show);
    }        

    console.log(props)

    return (
        <>
            {user !== null && user.category === "ADMIN" && (
                <div className="dashboard-container">
                    <Router>
                        <Sidebar toggle={toggle} show={show}/>
                        <Switch>
                            <Route exact path={props.match.url + '/main'} render={props=><Main {...props} show={show} />}/>                            
                            <Route exact path={props.match.url + '/jobs'} render={props=><Jobs {...props} show={show} />} />
                            <Route exact path={props.match.url + '/users'} render={props=><Users {...props} show={show} />}/>
                            <Route exact path={props.match.url + '/feedbacks'} render={props=><Feedbacks {...props} show={show} />}/>
                        </Switch>
                    </Router>
                </div>
            )}   
        </>
    )
}

export default AdminRouter
