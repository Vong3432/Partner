import React, { useEffect, useState, useCallback } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Spinner } from 'reactstrap';

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

    const [isLoading, setIsLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(false)
    const [isEmployer, setIsEmployer] = useState(false)        

    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.auth.user)
    const profile = useSelector(state => state.profile.user)
    const job = useSelector(state => state.job)

    // css
    const part = {
        backgroundColor: "var(--white-color)",
        borderRadius: 0
    }

    // useEffect    
    useEffect(() => {

        setIsLoading(true);

        const loadProfile = () => {
            return dispatch(showProfile(props.match.params.id))
        }

        Promise
            .all([loadProfile()])
            .then(res => {            
                console.log(res)
                if(res[0].account_type === "employer")
                    setIsEmployer(true);
    
                if(auth.isAuthenticated === true) {                    
                    if( user.profile_id === props.match.params.id)
                        setIsOwner(true); 
                }
    
                setIsLoading(false);
            })                                                                          

    }, [props.location.pathname])



    return (
        <section style={{marginTop:"5em"}}>
            {isLoading === false ? (isEmployer ? <EmployerProfile history={props.history} profile={profile} isOwner={isOwner} /> : <EmployeeProfile history={props.history} profile={profile} isOwner={isOwner} />) : <Spinner />}
        </section>
    )
}

const EmployeeProfile = (props) => {

    const { isOwner, src, profile, history } = props
    // const profile = useSelector(state => state.profile.user)
    // const posts = useSelector(state => state.post.posts)
    // const resumes = useSelector(state => state.profile.resumes)
    // const educationInfo = useSelector(state => state.profile.educationInfo)
    // const experienceInfo = useSelector(state => state.profile.experienceInfo)

    return (
        <>
            <h1>Is Employee, {isOwner ? "Is Owner" : "Not Owner"}</h1>
        </>
    )
}

const EmployerProfile = (props) => {

    const { isOwner, src, profile, history } = props

    const [countOpened, setCountOpened] = useState(0)
    const [countPaused, setCountPaused] = useState(0)
    const [countClosed, setCountClosed] = useState(0)    
    
    // const auth = useSelector(state => state.auth)
    // const profile = useSelector(state => state.profile.user)
    // const posts = useSelector(state => state.post.posts)
    // const user = useSelector(state => state.auth.user)

    return (

        <>
            <h1>Is Employer, {isOwner ? "Is Owner" : "Not Owner" }</h1>
            {profile.name}
            {profile.about && profile.about}
            <button onClick={e => history.push('/addjob')}>Add job</button>
        </>

    )
}

export default Profile;
