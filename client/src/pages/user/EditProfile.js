import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom'

import { showProfile } from '../../actions/profileActions'
import { getPosts } from '../../actions/postActions'

const EditProfile = (props) => {

    const part = {
        backgroundColor: "var(--white-color)",
        borderRadius: 0
    }

    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.user)
    // const posts = useSelector(state => state.post.posts)
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const [isOwner, setIsOwner] = useState(false)
    const [isEmployer, setIsEmployer] = useState(false)

    useEffect(() => {

        const paramID = props.match.params.id
        //props.loadInitialDataSocket(socket, props.match.params.id)        

        // socket = io.connect("http://localhost:5000")
        // console.dir(socket)

        // socket.on('postLoaded', res=>{
        //     console.dir(res)
        //     dispatch(getPosts(res))
        // })

        dispatch(getPosts(paramID))

        console.log(user)
        if (profile.category === "employer")
            setIsEmployer(true)
        else
            setIsEmployer(false)

        if (user) {
            if (paramID === user.id)
                setIsOwner(true)
            else
                setIsOwner(false)
        }

        dispatch(showProfile(paramID))

    }, [profile.category])

    return (
        <>
            {(!isEmployer || !isOwner) && (
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto">
                        <img id="avatar" src={require('../../images/person.jpg')} alt="avatar" />
                        <h2 className="profile-username mt-2">{profile.name}</h2>
                    </div>

                    {/* social media links */}
                    <div className="container mt-auto mb-5 text-right" style={{ minHeight: "initial" }}>
                        <i style={{ fontSize: "24px" }} className='fab text-white mr-3'>&#xf09a;</i>
                        <i style={{ fontSize: "24px" }} className='fab text-white'>&#xf16d;</i>
                    </div>

                </section>
            )}

            {(isEmployer && isOwner) && (
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto">
                        <img id="avatar" src={require('../../images/person.jpg')} alt="avatar" />
                        <h2 className="profile-username mt-2">{profile.name}</h2>
                    </div>

                    {/* social media links */}
                    <div className="nav employer-navbar mt-auto mb-5" style={{ minHeight: "initial", position: "sticky !important", top: "0", zIndex: "99", }}>
                        <NavLink exact={true} to={{ pathname: `/profile/${props.match.params.id}` }} tag={RRNavLink} activeClassName="employer-navlink-active">Dashboard</NavLink>
                        <NavLink exact={true} to={{ pathname: `/profile/employertable/${props.match.params.id}`, state: { user: user, profile: profile } }} tag={RRNavLink} activeClassName="employer-navlink-active">Job</NavLink>
                        <NavLink exact={true} to={{ pathname: '/profile/messages' }} tag={RRNavLink} activeClassName="employer-navlink-active">Messages</NavLink>
                        <NavLink exact={true} to={{ pathname: '/addJob' }} tag={RRNavLink} activeClassName="employer-navlink-active" className="ml-auto primary-bg-button">Post Job</NavLink>
                    </div>

                </section>
            )}

            <section className="profile-section">

                {/* About */}
                <div className="p-5 card-shadow profile--about-container" style={part}>
                    <h5 className="header">About Me</h5>
                    <textarea name="" style={{maxWidth:"100%", width:"100%", height:"10em", border:".25px solid rgba(0,0,0,0.1)"}} className="paragraph" id="">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</textarea>
                    {/* <p className="paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p> */}

                    {!isEmployer && (
                        <h5 className="mt-5 header">CV/Resume</h5>
                    )}

                </div>

                <div className="profile--contact-container my-3 card-shadow p-5" style={part}>

                    {/* Contact title bar */}
                    <div className="d-flex flex-row row-wrap align-content-center">
                        <h5 className="header" style={{ textTransform: "uppercase" }}>contact and personal info</h5>
                        <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                    </div>

                    {/* Email */}
                    <div className="d-flex flex-row mt-3">
                        <img className="small-icon" src={require('../../images/email.svg')} alt="email" />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="small-header">Email</h6>                            
                            <input type="text" name="email" id="" value={"johndoe@gmail.com"}/>
                        </div>
                    </div>

                    {/* Availability */}
                    {!isEmployer && (
                    <>
                    <div className="d-flex flex-row mt-4">
                        <img className="small-icon" src={require('../../images/availability.svg')} alt="availability" />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="small-header">Availability</h6>
                            <input type="text" name="availability" id="" value={"Full-Time/Part-Time"}/>
                        </div>
                    </div>                    
                    
                    <div className="d-flex flex-row mt-4">
                        <img className="small-icon" src={require('../../images/age.svg')} alt="age" />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="small-header">Age</h6>
                            <input type="text" name="age" id="" value={"30"}/>
                        </div>
                    </div>
                    </>
                    )}

                    {/* Location */}
                    <div className="d-flex flex-row mt-4">
                        <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="small-header">Location</h6>
                            <input type="text" name="location" id="" value={"Los Angeles"}/>
                        </div>
                    </div>

                </div>

                <div className="profile--gallery-container p-5 my-3 card-shadow" style={part}>
                    {/* Gallery title bar */}
                    <div className="d-flex flex-row row-wrap align-content-center">
                        <h5 className="header" style={{ textTransform: "uppercase" }}>gallery</h5>
                        <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                    </div>

                    <div className="gallery-grid mt-3">
                        <div className="gallery-tab-item">

                        </div>
                        <div className="gallery-tab-item">

                        </div>
                        <div className="gallery-tab-item">

                        </div>
                        
                    </div>
                </div>


                {/* Skills */}
                {!isEmployer && (
                    <div className="profile--skills-container p-5 my-3 card-shadow" style={part}>
                        <div className="d-flex flex-row row-wrap align-content-center">
                            <h5 className="header" style={{ textTransform: "uppercase" }}>skills</h5>
                            <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                        </div>
                        <input type="text" name="skills" id=""/>
                        <div className="my-2">
                            <span className="badge mr-1 tag p-2">Primary</span>
                            <span className="badge tag p-2">Some skill</span>
                        </div>
                    </div>
                )}

                <button style={{borderRadius:"0"}} className="mt-3 mb-5 primary-bg-button">Edit</button>

            </section>
        </>
    )
}

export default EditProfile
