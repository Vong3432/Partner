import React, { useState, useCallback } from 'react'
import SearchField from '../../components/SearchField'
import JobsGrid from '../../components/job/JobsGrid'



const Job = () => {     

    return (
        <>
            
                {/* <section className="hero-section">
                    <div className="text-white container d-flex flex-column justify-content-center text-center">                        
                        
                    </div>
                </section> */}

                <section className="posts-section">
                    <JobsGrid />           
                </section>
                {/* <section style={{ minHeight: "70vh" }}></section> */}
            

        </>
    )
}

export default Job
