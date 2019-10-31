import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import SearchField from '../components/SearchField'
import JobsGrid from '../components/JobsGrid'
import {PreviewProvider} from '../PreviewContext'

const Job = () => {    

    return (
        <>
            <PreviewProvider>
                <section className="hero-section">
                    <div className="text-white container d-flex flex-column justify-content-center text-center">
                        <p className="blockquote">It is never too late to be what you might have been. <span className="blockquote-footer">George Eliot</span></p>
                        <SearchField />
                    </div>
                </section>

                <section className="posts-section">
                    <JobsGrid />           
                </section>
                {/* <section style={{ minHeight: "70vh" }}></section> */}
            </PreviewProvider>

        </>
    )
}

export default Job
