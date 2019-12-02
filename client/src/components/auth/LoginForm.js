import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login, logout } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { useAlert } from 'react-alert'

const LoginForm = (props) => {

    const alert = useAlert()

    LoginForm.propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    const error = useSelector(state => state.error)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })

    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        dispatch(clearErrors())
    }, [userInfo])

    const onSubmit = e => {
        e.preventDefault();
        setErrMsg('')

        if (isAuthenticated)
            alert.success('You are logged in!')

        else {
            if (userInfo.email && userInfo.password) {
                const User = {
                    email: userInfo.email,
                    password: userInfo.password
                }

                // Attempt to login
                dispatch(login(User))


                // window.location.href = '/'                
            }
            else
                setErrMsg('Please fill in all information.')
        }


    }

    useEffect(() => {
        if (user && user.category === "ADMIN")
            window.location.href = "/admin/dashboard/main";
    }, [user])

    useEffect(() => {
        if(isAuthenticated===true)
        {            
            console.log(user)
            if(user.status === "-1")
            {
                alert.error('You have been suspended')
                dispatch(logout())
                console.log(user)
            }
                
            else
            {
                alert.success('login successfully')
                setTimeout(() => {window.location.href="/"}, 1500)            
            }
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (error.id === "LOGIN_FAIL") {
            alert.error('Login fail')
        }        
        
        return (() => dispatch(clearErrors()))
    }, [error.id])


    const handleChange = e => {

        setErrMsg('')
        const { name, value } = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        })

    }

    return (

        <form method="POST" onSubmit={onSubmit} className="form m-auto p-5" style={{ height: "100%" }}>
            <h3>Partner.</h3>
            <p style={{ color: "var(--danger)", fontWeight: "bold" }}>{errMsg}</p>
            <div className="d-flex flex-column mt-4">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex flex-column mt-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleChange}
                />
            </div>

            <input type="submit" className="my-4 mx-0 primary-bg-button" name="submit" value="Submit" />
        </form>

    )
}

export default LoginForm
