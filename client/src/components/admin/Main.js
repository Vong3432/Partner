import React, {useEffect} from 'react'

const Main = ({ show }) => {    

    return (
        <main className="dashboard-content" style={show ? {marginLeft:"300px"} : {marginLeft:"50px"}}>
            <h5 className="dashboard-content-header">General Information</h5>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                <div className="dashboard-card">
                    <p>Total Registered Users</p>
                    <h3>3 Users</h3>
                </div>
                <div className="dashboard-card">
                    <p>Total Jobs Posted</p>
                    <h3>5 Jobs</h3>
                </div>
            </div>

            <h5 className="dashboard-content-header">Employee and Employer Information</h5>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                <div className="dashboard-card">
                    <p>Total Employee</p>
                    <h3>2 Employee</h3>
                </div>
                <div className="dashboard-card">
                    <p>Total Employer</p>
                    <h3>1 Employer</h3>
                </div>
            </div>

            <h5 className="dashboard-content-header">Feedbacks</h5>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                <div className="dashboard-card">
                    <p>Report feedback</p>
                    <h3>0 Report</h3>
                </div>
                <div className="dashboard-card">
                    <p>System feedback</p>
                    <h3>0 Feedback</h3>
                </div>
            </div>

        </main>                    
    )
}

export default Main
