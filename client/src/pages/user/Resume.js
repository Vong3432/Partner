import React, { useState, useEffect } from 'react'

const Resume = () => {

    const [step, setStep] = useState(1)

    useEffect(() => {
        console.log(step)
        return(() => console.log('resume unmounted'))
    }, [step])

    return (
        <>
            <div className="resume-bg"></div>
            <div className="resume-container">
                <div className="resume-header d-flex flex-column flex-md-row align-items-lg-end">
                    <div className="d-flex flex-column mr-auto mb-3">
                        <h4>Create a resume</h4>
                        <p className="paragraph" style={{ textDecoration: "underline", color: "var(--light-grey)" }}>Or upload a resume</p>
                    </div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className={step === 1 ? `breadcrumb-item active` : `breadcrumb-item`}>Profile</li>
                            <li className={step === 2 ? `breadcrumb-item active` : `breadcrumb-item`}>Education</li>
                            <li className={step === 3 ? `breadcrumb-item active` : `breadcrumb-item`}>Experience</li>
                            <li className={step === 4 ? `breadcrumb-item active` : `breadcrumb-item`}>Preferences</li>
                        </ol>
                    </nav>
                </div>

                <form className="resume-form">

                    {/*   Profile   */}
                    {(step === 1) && (
                        <>
                            <h5 className="resume-form--header">Profile</h5>
                            <div id="divider"></div>

                            <div className="d-flex flex-row mt-5 mb-3">
                                <div className="d-flex flex-column w-50 mr-1">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="" placeholder="First name..." />
                                </div>
                                <div className="d-flex flex-column ml-1 w-50">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="" placeholder="Last name..." />
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="" placeholder="e.g Johor Bahru ..." />
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/call.svg')} alt="contact" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="contact">Contact Number</label>
                                    <input type="text" id="" placeholder="012-3456789" />
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/email.svg')} alt="email" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="" placeholder="johndoe@gmail.com..." />
                                </div>
                            </div>
                        </>
                    )}

                    {/*   Education   */}
                    {(step === 2) && (
                        <>
                            <h5 className="resume-form--header">Education</h5>
                            <div id="divider"></div>                            

                            <div className="d-flex flex-row mt-5 my-3 w-100">
                                <img className="small-icon" src={require('../../images/degree.svg')} alt="degree" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="degree">Degree</label>
                                    <select name="degree" id="">
                                        <option value="">Select an option</option>
                                        <option value="Diploma">Diploma</option>
                                    </select>                                    
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/school.svg')} alt="school" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="school">School</label>
                                    <input type="text" id="" placeholder="Southern University College ..." />
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/fieldOfStudy.svg')} alt="fieldOfStudy" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="fos">Field of study</label>
                                    <input type="text" id="" placeholder="Computer Science ..." />
                                </div>
                            </div>

                            <div className="d-flex flex-row my-3 w-100">
                                <img className="small-icon" src={require('../../images/schooladdress.svg')} alt="schooladdress" />
                                <div className="d-flex flex-column ml-3 w-100">
                                    <label htmlFor="schoolAddress">School Address</label>
                                    <input type="text" id="" placeholder="No 100, Jalan 2/1 Johor Bahru ..." />
                                </div>
                            </div>

                        </>
                    )}

                    <div className="d-flex flex-row">
                    {step > 1 && (
                        <button 
                        className="mt-3 mr-auto no-styling-button"
                        onClick={(e) => {
                            e.preventDefault()
                            setStep(step - 1)
                            }}
                        >
                            Previous
                        </button>
                    )}                    
                    
                    <button 
                     className="mt-3 primary-bg-button ml-1"
                     onClick={(e) => {
                         e.preventDefault()
                         setStep(step + 1)
                        }}
                    >
                        Next
                    </button>
                    </div>
                    
                </form>


            </div>
        </>
    )
}

export default Resume
