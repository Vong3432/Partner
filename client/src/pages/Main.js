import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import JobsGrid from '../components/job/JobsGrid'
import Card from '../components/job/Card'
import { getJobs } from '../actions/jobActions'
// import CardList from '../components/job/CardList'

const Main = () => {

    const user = useSelector(state => state.auth.user)
    // const dispatch = useDispatch()
    // const job = useSelector(state => state.job.jobs)

    useEffect(() => {
        
        if (user && user.category === "ADMIN")
            window.location.href = "/admin/dashboard/main";
       
    }, [])

    return (
        <>
            <section style={{top:"0", bottom:"0", backgroundColor:"var(--primary-color)"}}>
                <div className="d-flex flex-column container align-items-center justify-content-center mx-auto" style={{marginTop:"5rem"}}>
                    <h2 className="mb-0" style={{fontSize:"6rem", color:"white"}}>Partner</h2>
                    <p className="mt-0 text-white" style={{fontSize:"2rem"}}>Discover jobs for now</p>
                    {/* <div id="divider" style={{background:"white !important"}}></div> */}
                    <div className="d-flex flex-row mt-5" style={{fontSize:"1.5rem"}}>
                        <a href="/employee" className="text-white pr-2" style={{borderRight:"5px solid white"}}>Find Jobs</a>
                        <a href="/forum" className="ml-2 text-white">Forum</a>
                    </div>                    
                </div>                
            </section>
        </>
    )
}

export default Main

