import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom'

import { showProfile, editProfile, addEducationInfo, getEducationInfo, deleteEducation, addExperienceInfo, getExperienceInfo, deleteExperience } from '../../actions/profileActions'
import { clearErrors } from '../../actions/errorActions';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useAlert } from 'react-alert'

const EditProfile = (props) => {    
    const alert = useAlert()

    // css
    const part = {
        backgroundColor: "var(--white-color)",
        borderRadius: 0
    }

    // setting months
    const allMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    let minOffset = 0, maxOffset = 40;
    let thisYear = (new Date()).getFullYear() + 6;
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    // state from reduces
    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.user)    
    const error = useSelector(state => state.error)
    const user = useSelector(state => state.auth.user)
    const educationInfo = useSelector(state => state.profile.educationInfo)
    const experienceInfo = useSelector(state => state.profile.experienceInfo)

    // dispatch
    const dispatch = useDispatch()

    // states
    const [isOwner, setIsOwner] = useState()
    const [isEmployer, setIsEmployer] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // holds current data when user inputing
    const [currentProfileInfo, setCurrentProfileInfo] = useState({
        BackgroundPic: [],
        ProfilePic: ""
    })
    const [currentEducationInfo, setCurrentEducationInfo] = useState({})
    const [currentExperienceInfo, setCurrentExperienceInfo] = useState({})

    // detect error
    const [errMsg, setErrMsg] = useState("")

    // control modals
    const [showEducationModal, setEducationModal] = useState(false)
    const [showExperienceModal, setExperienceModal] = useState(false)

    // gallery
    const [file, setFile] = useState("")
    const [name, setImgName] = useState([])
    const [img, setImg] = useState(null)
    const [src, setSrc] = useState(null)

    // profile
    const [profileImgFile, setProfileImgFile] = useState("")
    const [profileImgName, setProfileImgName] = useState("")
    const [profileImg, setProfileImg] = useState(null)

    // default render
    useEffect(() => {

        if (isLoading === true) {
            dispatch(showProfile(props.match.params.id))
            user.category === "employer" ? setIsEmployer(true) : setIsEmployer(false)
            user.id === props.match.params.id ? setIsOwner(true) : setIsOwner(false)

            if (isOwner === false) {
                alert('You dont have the authority to access this page');
                window.location.href = "/";
            }
            
            setCurrentProfileInfo(profile)
            setSrc(profile.ProfilePic)
            dispatch(getExperienceInfo(props.match.params.id))
            dispatch(getEducationInfo(props.match.params.id))
            setIsLoading(false)
        }

        return (() => setIsLoading(true))
    }, [])

    const onEdit = (e) => {
        e.persist()
        dispatch(clearErrors())
        console.log(e.target.name, e.target.value)

        setCurrentProfileInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

        if (e.target.name === "BackgroundPic") {
            setCurrentProfileInfo((prevState) => ({ ...prevState, BackgroundPic: [] }))
            console.log('is image')
            setFile(e.target.files)

            for (let x = 0; x < e.target.files.length; x++)
                setCurrentProfileInfo((prevState) => ({ ...prevState, BackgroundPic: [...prevState.BackgroundPic, (user.id + "-") + e.target.files[x].name] }))
        }

        if (e.target.name === "ProfilePic") {
            setCurrentProfileInfo((prevState) => ({ ...prevState, ProfilePic: "" }))
            setProfileImgFile(e.target.files[0])
            setProfileImg(URL.createObjectURL(e.target.files[0]))
            setCurrentProfileInfo((prevState) => ({ ...prevState, ProfilePic: (user.id + "-") + e.target.files[0].name }))
        }

    }

    // education
    const toggleEducationModal = e => {
        setEducationModal(!showEducationModal)
    }

    const handleEducationChange = e => {
        e.persist()
        setCurrentEducationInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value}))
    }

    const confirmCurrentEducationInfo = e => {
        // axios.post()
        
        const newEducationInfo = {
            Degree: currentEducationInfo.Degree,
            School: currentEducationInfo.School,
            StartYear: currentEducationInfo.StartYear,
            EndYear: currentEducationInfo.EndYear
        }
        dispatch(addEducationInfo(newEducationInfo, props.match.params.id));                
        alert.success('New education info added.')   
    }

    const deleteInfo = (e, id) => {
        dispatch(deleteEducation(id)); 
        alert.success('Deleted.')                                       
    }

    // experience
    const toggleExperienceModal = e => {
        setExperienceModal(!showExperienceModal)
    }

    const handleExperienceChange = e => {
        e.persist()
        setCurrentExperienceInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value}))
    }

    const confirmCurrentExperienceChange = e => {
        
        console.log(currentExperienceInfo)
        const newExperienceInfo = {
            JobTitle: currentExperienceInfo.JobTitle,
            Company: currentExperienceInfo.Company,
            StartYear: currentExperienceInfo.StartYear,
            EndYear: currentExperienceInfo.EndYear
        }
        dispatch(addExperienceInfo(newExperienceInfo, props.match.params.id));                
        alert.success('New working experience info added.')  
        // axios.post()
    }

    const deleteExperienceInfo = (e, id) => {
        // axios.delete()
        dispatch(deleteExperience(id))
        alert.success('Deleted.')   
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (file) {

            const data = new FormData()

            for (var x = 0; x < file.length; x++) {
                // setImgName(name.push(Date.now() + "-" + file[x].name))  
                setImgName(name.push(file[x].name))
                data.append('file', file[x])
            }

            axios
                .post("/api/profile/upload", data)
                .then(res => console.log(res.statusText))
                .catch(err => console.log(err))

            setCurrentProfileInfo((prevState) => ({ ...prevState, BackgroundPic: [name] }))
        }


        if (profileImgFile) {

            const data = new FormData()
            console.log(profileImgFile)
            setProfileImgName(profileImgFile.name)
            data.append('profile', profileImgFile)

            axios
                .post("/api/profile/uploadProfileImage", data)
                .then(res => console.log(res.statusText))
                .catch(err => console.log(err))

            setCurrentProfileInfo((prevState) => ({ ...prevState, ProfilePic: profileImgName }))
        }

        console.log(currentProfileInfo)
        dispatch(editProfile(props.match.params.id, currentProfileInfo))

        if (error.id === "UPDATE_FAIL") {
            alert('Update fail')
        }
        else
            alert('Update successfully')


    }


    return (
        <>

            <Modal isOpen={showEducationModal} toggle={toggleEducationModal}>
                <ModalHeader toggle={toggleEducationModal}>Education</ModalHeader>
                <ModalBody>
                    <div className="addjob-form--part mb-3">
                        <div className="d-flex flex-column w-100">
                            {/* <h4 className="title">Education Information</h4>
                            <div id="divider"></div> */}

                            <div className="d-flex flex-row mt-2 my-3 w-100">                               
                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="Degree">Degree</label>
                                    <input name="Degree" type="text" onChange={e => handleEducationChange(e)} id="" placeholder="e.g Diploma in Computer Science" />
                                </div>
                            </div>       

                            <div className="d-flex flex-row mt-2 my-3 w-100">                                
                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="School">School</label>
                                    <input name="School" type="text" onChange={e => handleEducationChange(e)} id="" placeholder="e.g SUC" />
                                </div>
                            </div>                      

                            <div className="d-flex flex-row mt-2 my-3 w-100">                                
                                <div className="d-flex flex-row w-100">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <label htmlFor="StartYear">Start Year</label>
                                        <select onChange={e => handleEducationChange(e)} name="StartYear">
                                            <option value="" selected disabled>Select Start Year</option>
                                            {allYears.map((year, index) => <option key={index} value={year}>{year}</option>)}                                            
                                        </select>
                                    </div> 
                                    <div className="d-flex flex-column w-50 ml-1">
                                        <label htmlFor="EndYear">End Year</label>
                                        <select onChange={e => handleEducationChange(e)} name="EndYear">
                                            <option value="" selected disabled>Select End Year</option>
                                            {allYears.map((year, index) => <option key={index} value={year}>{year}</option>)}                                            
                                        </select>
                                    </div>                                    
                                </div>
                            </div>                      

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => { toggleEducationModal(); confirmCurrentEducationInfo(e) }}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleEducationModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showExperienceModal} toggle={toggleExperienceModal}>
                <ModalHeader toggle={toggleExperienceModal}>Experience</ModalHeader>
                <ModalBody>
                    <div className="addjob-form--part mb-3">
                        <div className="d-flex flex-column w-100">
                            {/* <h4 className="title">Education Information</h4>
                            <div id="divider"></div> */}

                            <div className="d-flex flex-row mt-2 my-3 w-100">                               
                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="JobTitle">Job Title</label>
                                    <input name="JobTitle" type="text" onChange={e => handleExperienceChange(e)} id="" placeholder="e.g Programmer" />
                                </div>
                            </div>       

                            <div className="d-flex flex-row mt-2 my-3 w-100">                                
                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="Company">Company</label>
                                    <input name="Company" type="text" onChange={e => handleExperienceChange(e)} id="" placeholder="e.g Apple" />
                                </div>
                            </div>                      

                            <div className="d-flex flex-row mt-2 my-3 w-100">                                
                                <div className="d-flex flex-row w-100">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <label htmlFor="StartYear">Start Year</label>
                                        <select onChange={e => handleExperienceChange(e)} name="StartYear">
                                            <option value="" selected disabled>Select Start Year</option>
                                            {allYears.map((year, index) => <option key={index} value={year}>{year}</option>)}                                            
                                        </select>
                                    </div> 
                                    <div className="d-flex flex-column w-50 ml-1">
                                        <label htmlFor="EndYear">End Year</label>
                                        <select onChange={e => handleExperienceChange(e)} name="EndYear">
                                            <option value="" selected disabled>Select End Year</option>
                                            {allYears.map((year, index) => <option key={index} value={year}>{year}</option>)}                                            
                                        </select>
                                    </div>                                    
                                </div>
                            </div>                      

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => { toggleExperienceModal(); confirmCurrentExperienceChange(e) }}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleExperienceModal}>Cancel</Button>
                </ModalFooter>
            </Modal>


            {((!isEmployer && isOwner) && isLoading === false) && (
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto d-flex flex-column align-items-center">
                        <img alt="avatar" src={profileImg ? profileImg : '/uploads/profile/' + src} id="avatar" style={{ backgroundColor: "grey", borderRadius: "200px", height: "200px", width: "200px" }} />
                        <div className="d-flex flex-row">
                            <h2 className="profile-username mt-2">{user.name}</h2>
                            <div className="image-upload ml-2 my-3">
                                <label htmlFor="ProfilePic">
                                    <img style={{ width: "2em", height: "2em" }} src={require('../../images/photo.svg')} />
                                </label>

                                <input id="ProfilePic" accept="image/*" name="ProfilePic" type="file" style={{ display: "none" }} onChange={e => onEdit(e)} />
                                <small className="ml-2 text-white-50">Upload profile image</small>
                            </div>
                        </div>
                    </div>

                    {/* social media links */}
                    <div className="container mt-auto mb-5 text-right" style={{ minHeight: "initial" }}>
                        <i style={{ fontSize: "24px" }} className='fab text-white mr-3'>&#xf09a;</i>
                        <i style={{ fontSize: "24px" }} className='fab text-white'>&#xf16d;</i>
                    </div>

                </section>
            )}

            {((isEmployer && isOwner) && isLoading === false) && (
                <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                    {/* user avatar and name */}
                    <div className="text-center mt-auto d-flex flex-column align-items-center">
                        {/* <img id="avatar" src={require('../../images/person.jpg')} alt="avatar" /> */}
                        <img alt="avatar" src={profileImg ? profileImg : '/uploads/profile/' + src} id="avatar" style={{ backgroundColor: "grey", borderRadius: "200px", height: "200px", width: "200px" }} />
                        <div className="d-flex flex-row">
                            <h2 className="profile-username mt-2">{user.name}</h2>
                            <div className="image-upload ml-2 my-3">
                                <label htmlFor="ProfilePic">
                                    <img alt="avatar" style={{ width: "2em", height: "2em" }} src={require('../../images/photo.svg')} />
                                </label>

                                <input id="ProfilePic" accept="image/*" name="ProfilePic" type="file" style={{ display: "none" }} onChange={e => onEdit(e)} />
                                <small className="ml-2 text-white-50">Upload profile image</small>
                            </div>
                        </div>
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

            <section className="profile-section mx-auto" style={{maxWidth:"900px"}}>

                {/* About */}
                <div className="p-5 card-shadow profile--about-container" style={part}>
                    <h5 className="header">About</h5>
                    <textarea name="About" onChange={e => onEdit(e)} style={{ maxWidth: "100%", width: "100%", height: "10em", border: ".25px solid rgba(0,0,0,0.1)" }} className="paragraph" id="" value={currentProfileInfo.About}></textarea>                    
                    <div className="d-flex flex-row mt-3">
                        <h5 className="header">Social Media Links</h5>
                        <img className="small-icon ml-auto mr-2" style={{ width: "20px", height: "20px", cursor: "pointer" }} src={require('../../images/edit.svg')} alt="edit" />
                    </div>
                </div>

                {/* Education */}
                {(!isEmployer && isLoading === false) && (
                    <div className="p-5 my-3 card-shadow profile--about-container" style={part}>
                        {/* Education title bar */}
                        <div className="d-flex flex-row row-wrap align-content-center">
                            <h5 className="header" style={{ textTransform: "uppercase" }}>Education</h5>
                            <img className="small-icon ml-auto" onClick={toggleEducationModal} style={{ width: "20px", height: "20px", cursor: "pointer" }} src={require('../../images/plus.svg')} alt="add" />
                        </div>

                        {educationInfo ? educationInfo.map((info, index) => (
                            <div key={index} className="d-flex flex-column mt-4">
                                <div className="d-flex flex">
                                    <h6 className="editprofile-header">{info.Degree}</h6>
                                    <img className="small-icon ml-auto" onClick={e => deleteInfo(e, info.EducationID)} style={{ width: "20px", height: "20px", cursor: "pointer" }} src={require('../../images/delete.svg')} alt="delete" />
                                </div>                                
                                <small>{info.StartYear}-{info.EndYear}</small>
                            </div>
                        )) : null}                        
                    </div>
                )}

                {/* Working experience */}
                {(!isEmployer && isLoading === false) && (
                    <div className="p-5 my-3 card-shadow profile--about-container" style={part}>
                        {/* Working experience title bar */}
                        <div className="d-flex flex-row row-wrap align-content-center">
                            <h5 className="header" style={{ textTransform: "uppercase" }}>Working Experience</h5>
                            <img className="small-icon ml-auto" onClick={toggleExperienceModal} style={{ width: "20px", height: "20px", cursor: "pointer" }} src={require('../../images/plus.svg')} alt="add" />
                        </div>

                        {experienceInfo ? experienceInfo.map((info, index) => (
                            <div key={index} className="d-flex flex-column mt-4">
                                <div className="d-flex flex">
                                    <h6 className="editprofile-header">{info.JobTitle}</h6>
                                    <img className="small-icon ml-auto" onClick={e => deleteExperienceInfo(e, info.WorkExperienceID)} style={{ width: "20px", height: "20px", cursor: "pointer" }} src={require('../../images/delete.svg')} alt="delete" />
                                </div>                                
                                <small>{info.StartYear}-{info.EndYear}</small>
                            </div>
                        )) : null}
                    </div>
                )}

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
                            <h6 className="editprofile-header">Email</h6>
                            <input type="email" name="Email" id="" onChange={e => onEdit(e)} value={currentProfileInfo.Email} />
                        </div>
                    </div>

                    {/* Availability */}
                    {(!isEmployer && isLoading === false) && (
                        <>
                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../../images/availability.svg')} alt="availability" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="editprofile-header">Availability</h6>
                                    <input type="text" name="Availability" id="" onChange={e => onEdit(e)} value={currentProfileInfo.Availability} />
                                </div>
                            </div>

                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../../images/age.svg')} alt="age" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="editprofile-header">Age</h6>
                                    <input type="text" name="Age" id="" onChange={e => onEdit(e)} value={currentProfileInfo.Age} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Location */}
                    <div className="d-flex flex-row mt-4">
                        <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="editprofile-header">Location</h6>
                            <input type="text" name="Location" id="" onChange={e => onEdit(e)} value={currentProfileInfo.Location} />
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
                        {(isLoading === false) ? (
                            <div className="gallery-tab-item">
                                {/* <img style={{ width: "100%" }} src={require(`../../uploads/profile/${profile.ProfileID}-Freelancer_Featured_Image.png`)} alt="img" /> */}
                            </div>
                        ) : <Spinner />}

                    </div>

                    <div className="image-upload ml-1 my-3">
                        <label htmlFor="BackgroundPic">
                            <img alt="bg" style={{ width: "3em", height: "3em" }} src={require('../../images/photo.svg')} />
                        </label>

                        <input id="BackgroundPic" multiple accept="image/*" name="BackgroundPic" type="file" style={{ display: "none" }} onChange={e => onEdit(e)} />
                        <small className="ml-2">Upload images</small>
                    </div>
                </div>


                {/* Skills */}
                {(!isEmployer && isLoading === false) && (
                    <div className="profile--skills-container p-5 my-3 card-shadow" style={part}>
                        <div className="d-flex flex-row row-wrap align-content-center">
                            <h5 className="header" style={{ textTransform: "uppercase" }}>skills</h5>
                            <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                        </div>
                        <input type="text" name="skills" id="" />
                        <div className="my-2">
                            <span className="badge mr-1 tag p-2">Primary</span>
                            <span className="badge tag p-2">Some skill</span>
                        </div>
                    </div>
                )}

                <input type="submit" onClick={e => onSubmit(e)} name="submit" style={{ borderRadius: "0" }} className="mt-3 mb-5 primary-bg-button" value="Edit" />

            </section>
        </>
    )
}

export default EditProfile
