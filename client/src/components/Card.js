import React, { useContext } from 'react'
import {PreviewContext} from '../PreviewContext'

const Card = ({jobID, company, title, logo, description}) => {

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)

    return (
        <>
        <div className="card my-3 card-shadow" 
            onClick={ ()=> setSelectedJob((prevState) => ({...prevState, jobID, title, description})) }
        >
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <div className="media">
                    <img style={{ maxWidth: "100px", maxHeight: "50px", objectFit: "contain" }} src={logo} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h6 className="mt-0 font-weight-bold">{company}</h6>
                    </div>
                </div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
        </>
    )
}

export default Card