import React, { useEffect, useState } from 'react'
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom'

import { deleteJob } from '../../actions/jobActions'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const EmployerTable = (props) => {

    EmployerTable.propTypes = {
        deleteJob: PropTypes.func.isRequired,
        job: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool
    }

    const [isOwner, setIsOwner] = useState(true)
    const [isEmployer, setIsEmployer] = useState(true)
    
    const [data, setData] = useState([
        {
            id:"0fbe0400-ab5b-408e-aea5-027defd793e6",
            title:"1st class chef",
            location:"JB",
            candidates: 5,
            views: 1000,
            lifeSpan: "60d15h05m",
            status:"Open"
        },
        {
            id:2,
            title:"1st class chef",
            location:"KL",
            candidates: 5,
            views: 1000,
            lifeSpan: "60d15h05m",
            status:"Open"
        },
        {
            id:3,
            title:"1st class chef",
            location:"Penang",
            candidates: 5,
            views: 1000,
            lifeSpan: "60d15h05m",
            status:"Open"
        },
    ])        

    const onDelete = (e, id) => {
        e.preventDefault()            
        props.deleteJob(id)
    }

    return (
        <>
            {(isEmployer && isOwner) && (
                <>
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto">
                        <img id="avatar" src={require('../../images/person.jpg')} alt="avatar" />
                        <h2 className="profile-username mt-2">JJ</h2>
                    </div>

                    {/* social media links */}
                    <div className="nav employer-navbar mt-auto mb-5" style={{ minHeight: "initial" }}>
                        <NavLink exact={true} to={{ pathname: `/profile/${props.match.params.id}`, state:{user: props.user, profile: props.profile} }} tag={RRNavLink} activeClassName="employer-navlink-active">Dashboard</NavLink>
                        <NavLink exact={true} to={{ pathname: `/profile/employertable/${props.match.params.id}`, state:{user: props.user, profile: props.profile} }} tag={RRNavLink} activeClassName="employer-navlink-active">Job</NavLink>
                        <NavLink exact={true} to="/messages" tag={RRNavLink} activeClassName="employer-navlink-active">Messages</NavLink>
                    </div>

                </section>

                <table class="table table-hover" style={{marginTop:"90vh", marginBottom:"20vh"}}>
                    <thead>
                        <tr>
                            <th scope="col"></th>                            
                            <th scope="col">Job</th>
                            <th scope="col">Location</th>
                            <th scope="col">Candidates</th>
                            <th scope="col">Views</th>
                            <th scope="col">Life Span</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <th scope="row"><button onClick={(e) => onDelete(e, item.id)} className="danger-bg-button" style={{width:"initial", fontSize:".7rem"}}>X</button></th>                                
                                <td>{item.title}</td>
                                <td>{item.location}</td>
                                <td>{item.candidates} Candidates</td>
                                <td>{item.views}</td>
                                <td>{item.lifeSpan}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}                                                                   
                    </tbody>
                </table>
                
                </>
            )}
        </>
    )
}

function mapStateToProps(state)
{    
    return{
        job: state.job,
        // isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { deleteJob })(EmployerTable);
