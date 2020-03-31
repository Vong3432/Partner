import React, { useContext, useState, useEffect } from 'react'
import { PreviewContext } from '../../PreviewContext'


const Card = ({ job: { job_id, upload_date, due_date, status, type, candidatelist_id, employer_id, title, description, requirement, company_name, location, category, salary, image_publicID, imageUrl } }) => {

    var todayDate = new Date()
    var dueDate = new Date(due_date)

    const [selectedJob, setSelectedJob] = useContext(PreviewContext)
    const [isMobile, setIsMobile] = useState(false)
    const [typeArr, setTypeArr] = useState([])

    useEffect(() => {

        window.addEventListener('resize', checkDevice)        
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
            {status.toLowerCase() === "opened" && todayDate < dueDate && (
                <div className="card mt-4 mb-0 card-shadow"
                    onClick={() => { 
                        if(isMobile)
                        {
                            window.location.href= `/job/previewall/${job_id}`
                        }
                        else
                            setSelectedJob(() => ({ job_id, upload_date, due_date, status, type, candidatelist_id, employer_id, title, description, requirement, company_name, location, category, salary, image_publicID, imageUrl })) 
                    }}
                    
                >
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <div className="d-flex flex-row">
                            <small className="card-companyName mr-auto mb-0">{company_name}</small>
                            <div className="d-flex flex-row mb-1">
                                <div className="d-flex flex-row">
                                    <img className="small-icon mr-2" src={require('../../images/color-location.svg')} alt="color-location" />
                                    <small className="card-sub-title">{location}</small>
                                </div>
                                <div className="d-flex flex-row ml-3">
                                    <img className="small-icon mr-2" src={require('../../images/color-funds.svg')} alt="color-funds" />
                                    <small className="card-sub-title">RM {salary}</small>
                                </div>
                            </div>
                        </div>

                        <div className="media align-items-start">
                            <div className="media-body">
                                <h5 className="card-title my-0">{title}</h5>
                            </div>
                            {/* <img style={{ maxWidth: "50px", maxHeight: "50px", objectFit: "contain" }} src={ProfilePic ? './uploads/profile/' + ProfilePic :null} className="ml-auto mr-3" alt="..." /> */}

                        </div>
                        {/* <p className="card-text" style={{maxHeight: "155px", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{description}</p> */}
                        {/* <p className="card-text">{console.log(type)}</p> */}
                        <div className="d-flex flex-row flex-wrap mt-1 mb-3">
                            {type.map((item, index) => (<span key={index} className="mr-1 badge tag">{item}</span>))}
                        </div>
                        <small>Due date until {dueDate.toDateString()}</small>

                    </div>
                </div>
            )}

        </>
    )
}

export default Card
