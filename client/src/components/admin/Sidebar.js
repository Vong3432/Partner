import React from 'react'
import { logout } from '../../actions/authActions'
import { useDispatch } from 'react-redux'

const Sidebar = ({toggle, show}) => {
    
    const dispatch = useDispatch()

    return (
        <aside className="dashboard-sidebar d-flex flex-column" style={show ? {maxWidth:"300px"} : {maxWidth:"50px"}} >
            {show ? <h3 className="p-5">Dashboard</h3> : null}
            <p onClick={toggle} className="mr-3 mt-3" style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }}>X</p>

            {show ? (
                <>
                    <span className="dashboard-sidebar-tab sidebar-active">
                        Main
                    </span>
                    <span className="dashboard-sidebar-tab">
                        Jobs
                    </span>
                    <span className="dashboard-sidebar-tab">
                        Users
                    </span>
                    <span className="dashboard-sidebar-tab">
                        Feedbacks
                    </span>
                    <span className="dashboard-sidebar-tab" style={{ background: "none" }}>
                        <a onClick={e => dispatch(logout())}>Logout</a>
                    </span>
                </>
            ) : null}
        </aside>
    )
}

export default Sidebar
