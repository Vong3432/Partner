import React, { useEffect, useState, useCallback } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'reactstrap';

import Article from '../../components/user/Article'
import { showProfile, getExperienceInfo, getEducationInfo, getResumes } from '../../actions/profileActions'
import { getPosts } from '../../actions/postActions'
import CreatePost from '../../components/user/CreatePost'

import PropTypes from 'prop-types'
import { getSelfJobs } from '../../actions/jobActions';
// import { Document, Page } from 'react-pdf';
// import io from 'socket.io-client'
// let socket

const Profile = (props) => {

    const dispatch = useDispatch()

    // resume
    // const [pageNumber, setPageNumber] = useState(1)
    // const [numPages, setNumPages] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(false)
    const [isEmployer, setIsEmployer] = useState(false)
    const [countOpened, setCountOpened] = useState(0)
    const [countPaused, setCountPaused] = useState(0)
    const [countClosed, setCountClosed] = useState(0)    

    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.user)
    const posts = useSelector(state => state.post.posts)
    const resumes = useSelector(state => state.profile.resumes)
    const educationInfo = useSelector(state => state.profile.educationInfo)
    const experienceInfo = useSelector(state => state.profile.experienceInfo)
    const user = useSelector(state => state.auth.user)
    const job = useSelector(state => state.job)

    // css
    const part = {
        backgroundColor: "var(--white-color)",
        borderRadius: 0
    }

    const [src, setSrc] = useState(null)

    // useEffect 
    useEffect(() => {
        console.log(props)
        if (isLoading === true) {
            dispatch(getPosts(props.match.params.id));
            dispatch(showProfile(props.match.params.id));                                            
            // setSrc(profile.ProfilePic)
            profile && profile.AccountType === "employer" ? setIsEmployer(true) : setIsEmployer(false);
            user && user.id === props.match.params.id ? setIsOwner(true) : setIsOwner(false);     
            setIsLoading(false)
        }        

        return (() => { setIsLoading(true); console.log('profile exit'); setSrc(null); console.log(src + "nu") })
    }, [])

    const loadEmployerData = () => {
        dispatch(getSelfJobs(props.match.params.id))

    }

    const loadEmployeeData = () => {
        dispatch(getResumes(props.match.params.id))
        dispatch(getExperienceInfo(props.match.params.id))
        dispatch(getEducationInfo(props.match.params.id))
    }

    useEffect(() => {
        dispatch(showProfile(props.match.params.id));
        dispatch(getPosts(props.match.params.id));  
        
        

        profile && profile.AccountType === "employer" ? setIsEmployer(true) : setIsEmployer(false);
        user && user.id === props.match.params.id ? setIsOwner(true) : setIsOwner(false);     

        setCountClosed(0)
        setCountPaused(0)
        setCountOpened(0)

        if(isEmployer)
        {
            loadEmployerData()
            setCountClosed(0)
            setCountPaused(0)
            setCountOpened(0)

            job.selfJobs.forEach(element => {
                if (element.Status === "1") setCountOpened(countOpened => countOpened + 1)
                if (element.Status === "0") setCountPaused(countPaused => countPaused + 1)
                if (element.Status === "-1") setCountClosed(countClosed => countClosed + 1)
            });
        }
        else
        {
            loadEmployeeData()
        }

    }, [props.location.pathname])

    useEffect(() => {
        setIsLoading(true)        
        
        dispatch(getSelfJobs(props.match.params.id));
        profile && profile.AccountType === "employer" ? setIsEmployer(true) : setIsEmployer(false);
        user && user.id === props.match.params.id ? setIsOwner(true) : setIsOwner(false);             
        
        if(isEmployer)
        {
            loadEmployerData()
        }
        else
        {
            loadEmployeeData()
        }

        setSrc(profile.ProfilePic)
        setIsLoading(false)
        // dispatch(getPosts(props.match.params.id));
    }, [profile])

    // const onDocumentLoadSuccess = ({numPages}) => {
    //     setNumPages(numPages)
    // }

    return (
        <>

            {(!isEmployer || !isOwner && isLoading === false) && (
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto">
                        <img src={src ? '/uploads/profile/' + src : null} id="avatar" style={{ backgroundColor: "grey", borderRadius: "200px", height: "200px", width: "200px" }} />
                        <h2 className="profile-username mt-2">{profile.Name}</h2>
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
                        <img src={profile.ProfilePic ? '/uploads/profile/' + src : null} id="avatar" style={{ backgroundColor: "grey", borderRadius: "200px", height: "200px", width: "200px" }} />
                        <h2 className="profile-username mt-2">{profile.Name}</h2>
                    </div>

                    {/* social media links */}
                    <div className="nav employer-navbar mt-auto mb-5" style={{ minHeight: "initial", position: "sticky !important", top: "0", zIndex: "99", }}>
                        <NavLink exact={true} to={{ pathname: `/profile/${props.match.params.id}` }} tag={RRNavLink} activeClassName="employer-navlink-active">Dashboard</NavLink>
                        <NavLink exact={true} to={{ pathname: `/profile/employertable/${props.match.params.id}`, state: { user: user, profile: profile } }} tag={RRNavLink} activeClassName="employer-navlink-active">Job</NavLink>
                        {/* <NavLink exact={true} to={{ pathname: '/profile/messages' }} tag={RRNavLink} activeClassName="employer-navlink-active">Messages</NavLink> */}
                        <NavLink exact={true} to={{ pathname: '/addJob' }} tag={RRNavLink} activeClassName="employer-navlink-active" className="ml-auto primary-bg-button">Post Job</NavLink>
                    </div>

                </section>
            )}

            <section className="profile-section">
                <div className="profile-grid">

                    {/* About */}
                    <div className="profile--about-container">
                        <h5 className="header">About Me</h5>                                                                      
                        <p className="paragraph">
                            {profile.About}
                        </p>
                                         

                        {!isEmployer && (
                            <>
                                {/* <h5 className="mt-5 header">CV/Resume</h5> */}
                                <div className="d-flex flex-column">
                                    <h5 className="header">Resume</h5>
                                    {resumes.map((item, index) => (
                                        <a download href={`../../../../../uploads/profile/resume/${props.match.params.id}-${item.Name}`}>{item.Name}</a>
                                    ))}  
                                </div>       

                                <div className="d-flex flex-row row-wrap align-content-center mt-4">
                                    <h5 className="header" style={{ textTransform: "uppercase" }}>Working Experience</h5>
                                </div>

                                {experienceInfo ? experienceInfo.map((info, index) => (
                                    <div key={index} className="d-flex flex-column mt-1">
                                        <div className="d-flex flex">
                                            <h6 style={{ color: "var(--primary-color)", opacity: ".75" }} className="small-header">{info.JobTitle + " (" + info.Company + ")"}</h6>
                                        </div>
                                        <small>{info.StartYear}-{info.EndYear}</small>
                                    </div>
                                )) : null}

                                {/* Education title bar */}
                                <div className="d-flex flex-row row-wrap align-content-center mt-4">
                                    <h5 className="header" style={{ textTransform: "uppercase" }}>Education</h5>
                                </div>

                                {educationInfo ? educationInfo.map((info, index) => (
                                    <div key={index} className="d-flex flex-column mt-1">
                                        <div className="d-flex flex">
                                            <h6 style={{ color: "var(--primary-color)", opacity: ".75" }} className="small-header">{info.Degree + " (" + info.School + ")"} </h6>
                                        </div>
                                        <small>{info.StartYear}-{info.EndYear}</small>
                                    </div>
                                )) : null}
                            </>
                        )}

                    </div>

                    {/* Right bar */}
                    <aside className="profile-grid-right">

                        {/* Contact */}

                        <div className="profile--contact-container">

                            {/* Contact title bar */}
                            <div className="d-flex flex-row row-wrap align-content-center">
                                <h5 className="header">contact and personal info</h5>
                                <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                            </div>

                            {/* Email */}
                            <div className="d-flex flex-row mt-3">
                                <img className="small-icon" src={require('../../images/email.svg')} alt="email" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Email</h6>
                                    <small>{profile.Email}</small>
                                </div>
                            </div>
                            {!isEmployer && isLoading === false && (
                                <>
                                    <div className="d-flex flex-row mt-4">
                                        <img className="small-icon" src={require('../../images/availability.svg')} alt="availability" />
                                        <div className="d-flex flex-column ml-2">
                                            <h6 className="small-header">Availability</h6>
                                            <small>{profile.Availability}</small>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row mt-4">
                                        <img className="small-icon" src={require('../../images/age.svg')} alt="age" />
                                        <div className="d-flex flex-column ml-2">
                                            <h6 className="small-header">Age</h6>
                                            <small>{profile.Age}</small>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Location */}
                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Location</h6>
                                    <small>{profile.Location}</small>
                                </div>
                            </div>

                        </div>

                        {isEmployer && isLoading === false && (
                            <div className="profile--contact-container">

                                {/* Contact title bar */}
                                <div className="d-flex flex-row row-wrap align-content-center">
                                    <h5 className="header">Jobs</h5>
                                    <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                                </div>

                                {/* Open */}
                                <div className="d-flex flex-row mt-2">
                                    <p className="paragraph">Open</p>
                                    <h5 className="ml-auto paragraph">{countOpened}</h5>
                                </div>

                                {/* Paused */}
                                <div className="d-flex flex-row mt-1">
                                    <p className="paragraph">Paused</p>
                                    <h5 className="paragraph ml-auto">{countPaused}</h5>
                                </div>

                                {/* Closed */}
                                <div className="d-flex flex-row mt-1">
                                    <p className="paragraph">Closed</p>
                                    <h5 className="paragraph ml-auto">{countClosed}</h5>
                                </div>

                            </div>
                        )}


                        {/* Skills */}
                        {!isEmployer && (
                            <div className="profile--skills-container">
                                <div className="d-flex flex-row row-wrap align-content-center">
                                    <h5 className="header">skills</h5>
                                    <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                                </div>
                                <div>
                                    <span className="badge badge-primary">Primary</span>
                                    <span className="badge badge-primary">Primary</span>
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {/* <div className="profile--gallery-container">
                            <h5 className="header">Gallery</h5>
                        </div> */}

                    </aside>

                    {/* Article */}
                    <div className="profile--article-container">
                        {(isOwner) && (
                            <CreatePost routeProps={props} auth={user} avatar={profile.ProfilePic ? profile.ProfilePic : null} />
                        )}
                        {/* {props.post.posts.map((item,index) => (
                            <Article key={index} image={item.Picture ? item.Picture : null} text={item.Description} author={props.profile.name} />
                        ))} */}
                        {posts ? posts.map((item, index) => (
                            <Article key={index} PostingID={item.PostingID} ProfileID={props.match.params.id} avatar={profile.ProfilePic ? profile.ProfilePic : null} image={item.Picture ? item.Picture : null} text={item.Description} author={profile.Name} />
                        )) : null}

                    </div>

                </div>

            </section>

        </>
    )
}

export default Profile;
