import React, { useContext, useState, useEffect } from 'react'
import {PreviewContext} from '../../PreviewContext'


const Card = ({job: {EmployerID, JobID, Title, CandidateListID, CompanyName, UploadDate, DueDate, Location, Picture, Description, Requirement, Status, Type, Category, Salary}}) => {

    var mydate = new Date(DueDate)

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)        
    const [typeArr, setTypeArr] = useState([])

    useEffect(() => {        
        if(Type)
            setTypeArr(Type.split(','))
    }, [])    
    
    // {console.log("index" + index)}
    return (
        <>
        <div className="card mb-4 card-shadow" 
            onClick={ ()=> {setSelectedJob((prevState) => ({EmployerID, JobID, Title, Location, CandidateListID, CompanyName, UploadDate, DueDate, Picture, Description, Requirement, Status, Type, Category, Salary})) }}
        >
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <div className="media align-items-start">
                    <img style={{ maxWidth: "100px", maxHeight: "50px", objectFit: "contain" }} src={require('../../images/jr.jpg')} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h6 className="mt-0 card-companyName">{CompanyName}</h6>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-row">
                                <img className="small-icon mr-2"src={require('../../images/color-location.svg')} alt="color-location"/>
                                <small className="card-sub-title">{Location}</small>
                            </div>
                            <div className="d-flex flex-row ml-3">
                                <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds"/>
                                <small className="card-sub-title">RM {Salary}</small>
                            </div>
                        </div>                        
                    </div>
                </div>
                <small>{mydate.toDateString()}</small>
                <h5 className="card-title">{Title}</h5>
                {/* <p className="card-text" style={{maxHeight: "155px", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{description}</p> */}
                {/* <p className="card-text">{console.log(type)}</p> */}
                <div className="d-flex flex-row">
                    {typeArr.map(item => (<span className="mr-1 badge tag">{item}</span>))}
                </div>                
                
            </div>
        </div>
        </>
    )
}

export default Card
