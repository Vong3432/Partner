import React, { useContext, useState, useEffect } from 'react'
import { PreviewContext } from '../../PreviewContext'


const Card = ({ job: { EmployerID, JobID, Title, ProfilePic, CandidateListID, CompanyName, UploadDate, DueDate, Location, Picture, Description, Requirement, Status, Type, Category, Salary } }) => {

    var todayDate = new Date()
    var duedate = new Date(DueDate)

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)
    const [isMobile, setIsMobile] = useState(false)
    const [typeArr, setTypeArr] = useState([])

    useEffect(() => {

        window.addEventListener('resize', checkDevice)
        if (Type)
            setTypeArr(Type.split(','))

        return(() => window.removeEventListener('resize', checkDevice))
    }, [])

    const checkDevice = () => {
        console.log(window.outerWidth)
        if(window.outerWidth <= 780 )
            setIsMobile(true)
        else
            setIsMobile(false)
    }

    // {console.log("index" + index)}
    return (
        <>
            {Status === "1" && todayDate < duedate && (
                <div className="card mt-4 mb-0 card-shadow"
                    onClick={() => { 
                        if(isMobile)
                        {
                            window.location.href= `/job/previewall/${JobID}`
                        }
                        else
                            setSelectedJob((prevState) => ({ EmployerID, ProfilePic, JobID, Title, Location, CandidateListID, CompanyName, UploadDate, DueDate, Picture, Description, Requirement, Status, Type, Category, Salary })) 
                    }}
                    
                >
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <div className="d-flex flex-row">
                            <small className="card-companyName mr-auto mb-0">{CompanyName}</small>
                            <div className="d-flex flex-row mb-1">
                                <div className="d-flex flex-row">
                                    <img className="small-icon mr-2" src={require('../../images/color-location.svg')} alt="color-location" />
                                    <small className="card-sub-title">{Location}</small>
                                </div>
                                <div className="d-flex flex-row ml-3">
                                    <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds" />
                                    <small className="card-sub-title">RM {Salary}</small>
                                </div>
                            </div>
                        </div>

                        <div className="media align-items-start">
                            <div className="media-body">
                                <h5 className="card-title my-0">{Title}</h5>
                            </div>
                            {/* <img style={{ maxWidth: "50px", maxHeight: "50px", objectFit: "contain" }} src={ProfilePic ? './uploads/profile/' + ProfilePic :null} className="ml-auto mr-3" alt="..." /> */}

                        </div>
                        {/* <p className="card-text" style={{maxHeight: "155px", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{description}</p> */}
                        {/* <p className="card-text">{console.log(type)}</p> */}
                        <div className="d-flex flex-row flex-wrap mt-1 mb-3">
                            {typeArr.map(item => (<span className="mr-1 badge tag">{item}</span>))}
                        </div>
                        <small>Due date until {duedate.toDateString()}</small>

                    </div>
                </div>
            )}

        </>
    )
}

export default Card
