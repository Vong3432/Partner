import React, { useEffect, useContext, useState } from 'react'
import { PreviewContext } from '../../PreviewContext'
import Spinner from '../../components/Spinner'
// import nl2br from 'react-nl2br'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Preview = (props) => {    

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)
    const [multipleDescription, setMultimeDescription] = useState([])
    const [multipleRequirement, setMultipleRequirement] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const nlb2r = require('react-nl2br')    

    const msg = "Please select a job";

    useEffect(() => {
        console.log('Preview is rerender.')        
        if(selectedJob.title)
            {
                setIsLoading(false)
                // setMultimeDescription(selectedJob.description.split("<next>")) 
                // setMultipleRequirement(selectedJob.requirement.split("<next>"))                                           
            }
        return (() => console.log('Preview unmounted'))
    }, [selectedJob])   

    Preview.propTypes = {        
        user: PropTypes.object.isRequired,   
        isAuthenticated: PropTypes.bool.isRequired
    }

    const onApply = (e) => {
        e.preventDefault()

        if(!props.isAuthenticated || props.user.category === "employer")
            alert("You dont have the authority to apply job.")
        else
            console.log(selectedJob)
    }

    return (
        <>
            {/* {isLoading ? <Spinner />} */}
            {(selectedJob.title) && (
                !isLoading ?
                <>
                    <div className="media align-items-start">
                        <img style={{ maxWidth: "100px", maxHeight: "60px", objectFit: "contain" }} src={require('../../images/jr.jpg')} className="mr-3" alt="..." />
                        <div className="media-body">
                            <h6 className="mt-0 card-companyName">{"Apple"}</h6>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-row">
                                    <img className="small-icon mr-2" src={require('../../images/color-location.svg')} alt="color-location" />
                                    <small className="card-sub-title">Selangor</small>
                                </div>
                                <div className="d-flex flex-row ml-3">
                                    <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds" />
                                    <small className="card-sub-title">RM {selectedJob.salary}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="my-3">{selectedJob.title}</h3>

                    <h5 className="mt-4">Description</h5> 
                    <div id="divider" className="mb-2"></div>
                    {/* {multipleDescription.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}                                        */}
                    <p style={{textAlign:"justify"}} className="paragraph my-2">{nlb2r(selectedJob.description)}</p>                    
                    
                    <h5 className="mt-4">Requirement</h5>
                    <div id="divider" className="mb-2"></div>
                    {/* {multipleRequirement.map((p,index) => <p key={index} style={{textAlign:"justify"}} className="paragraph my-2">{p}</p>)}  */}
                    <p style={{textAlign:"justify"}} className="paragraph my-2">{nlb2r(selectedJob.requirement)}</p>

                    <h5 className="mt-4">Job Type</h5>
                    <div id="divider" className="mb-2"></div>
                    <div className="d-flex flex-row">
                        <p className="paragraph my-2">{selectedJob.type}</p>
                    </div>                    

                    <button onClick={e => onApply(e)} className="primary-bg-button ml-0 mt-5 mw-100">Apply</button>
                </> : <Spinner />
            )}
            {!selectedJob.title ? <h2>{msg}</h2> : ""}
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,        
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {  })(Preview);
