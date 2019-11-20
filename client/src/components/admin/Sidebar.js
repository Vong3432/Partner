import React from 'react'
import { logout } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Sidebar = ({toggle, show}) => {
    
    const dispatch = useDispatch()

    return (
        <aside className="dashboard-sidebar d-flex flex-column" style={show ? {maxWidth:"300px"} : {maxWidth:"50px"}} >
            {show ? <h3 className="p-5">Dashboard</h3> : null}
            <p onClick={toggle} className="mr-3 mt-3" style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }}>X</p>

            {show ? (
                <>
                    <NavLink activeClassName="sidebar-active" className="dashboard-sidebar-tab text-white" to="/admin/main">
                        Main
                    </NavLink>
                    <NavLink activeClassName="sidebar-active" className="dashboard-sidebar-tab text-white" to="/admin/jobs">
                        Jobs                        
                    </NavLink>                    
                    <NavLink activeClassName="sidebar-active" className="dashboard-sidebar-tab text-white" to="/admin/users">
                        Users                        
                    </NavLink>          
                    <NavLink activeClassName="sidebar-active" className="dashboard-sidebar-tab text-white" to="/admin/feedbacks">
                        Feedbacks                        
                    </NavLink>          
                    <span activeClassName="sidebar-active" className="dashboard-sidebar-tab" style={{ background: "none" }}>
                        <a onClick={e => dispatch(logout())}>Logout</a>
                    </span>
                </>
            ) : null}
        </aside>
    )
}

export default Sidebar
