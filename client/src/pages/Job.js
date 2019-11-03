import React, { useState, useCallback } from 'react'
import SearchField from '../components/SearchField'
import JobsGrid from '../components/JobsGrid'
import {PreviewProvider} from '../PreviewContext'

const Job = () => { 

    const [searchField, setSearchField] = useState({
        jobTitle: "",
        description:""
    })
    
    const handleChange = e => {          
        setSearchField( prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))                     
    }

    const searchCallback = useCallback(()=>{        
        return searchField
    }, [searchField])

    return (
        <>
            <PreviewProvider>
                <section className="hero-section">
                    <div className="text-white container d-flex flex-column justify-content-center text-center">                        
                        <SearchField handleChange={handleChange} />
                    </div>
                </section>

                <section className="posts-section">
                    <JobsGrid callbackFunction={searchCallback}/>           
                </section>
                {/* <section style={{ minHeight: "70vh" }}></section> */}
            </PreviewProvider>

        </>
    )
}

export default Job
