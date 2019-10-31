import React, { Component, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { JobContext } from '../JobContext'
import SearchField from '../components/SearchField'
import CardList from '../components/CardList'

const Job = () => {
    const [jobs, setJobs] = useContext(JobContext)
    const [cards, setCards] = useState([
        {
            jobID:1,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:2,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:3,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:4,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:5,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:6,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            jobID:7,
            company: "Apple",
            logo:require('../images/4168236.png'),
            title: "junior analyst",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        },
    ])

    return (
        <>
            <section className="hero-section">
                <div className="text-white container d-flex flex-column justify-content-center text-center">
                    <p className="blockquote">It is never too late to be what you might have been. <span className="blockquote-footer">George Eliot</span></p>
                    <SearchField />
                </div>
            </section>

            <section className="posts-section">
                <div className="posts-grid"> 

                    <div className="posts-grid-left d-flex flex-column">
                        <CardList cards={cards}/>                                              
                    </div>

                    <div className="posts-grid-right">
                        ss
                    </div>

                </div>
                {jobs ? console.log(jobs) : console.log('nothing')}
            </section>

            {/* <section style={{ minHeight: "70vh" }}></section> */}

        </>
    )
}

export default Job
