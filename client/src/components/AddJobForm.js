import React, { useState } from 'react'
import axios from 'axios';

const AddProduct = () => {

    const [job, setJob] = useState({
        title:"",
        description:""
    })

    const [errMsg, setErrMsg] = useState("")

    const handleChange = e => {       
        const { name, value }  = e.target;        
        
        setJob({
            ...job,
            [ name ]: value
        })

        console.log(job)

    }

    const onSubmit = e => {
        e.preventDefault()
        setErrMsg('')
        
        if(job.title && job.description)
        {
            const newJob = {
                title: job.title,
                description: job.description
            }

            axios
                .post('/api/job', newJob)
                .then(res => res.json)
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        else
            setErrMsg('Please fill in all information.')
    }
    
    return (
        <>            
            <form className="form ml-lg-auto" onSubmit={onSubmit}>

                <div className="d-flex flex-column w-100">
                    <h3 className="title">Welcome to Partner.</h3>
                    <p className="paragraph">Partner provides opportunities for everyone to fullfill needs</p>
                </div>

                <div id="divider" className="mt-0 mb-4" style={{ width: "20%" }}></div>

                {errMsg && (<h3>Err: {errMsg} </h3>)}
                <div className="d-flex flex-row flex-sm-nowrap mt-2">

                    <div className="d-flex flex-column w-50 mr-2">
                        <label htmlFor="title">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={job.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="d-flex flex-column w-50 ml-2">
                        <label htmlFor="description">Job Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={job.description}
                            onChange={handleChange}
                        />
                    </div>

                </div>                

                <input type="submit" value="Continue" className="my-5 ml-0 primary-bg-button" />
            </form>
        </>
    )
}

export default AddProduct
