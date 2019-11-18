import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const LoginForm = (props) => {
    
    LoginForm.propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }    

    const error = useSelector( state => state.error)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const [ userInfo, setUserInfo ] = useState({        
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

        if(isAuthenticated)
            alert('You are logged in!')

        else
        {
            if(userInfo.email && userInfo.password)
            {
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
        if(error.id === "LOGIN_FAIL")
        {
            setErrMsg('Login fail')                                      
        }
        
        else if(isAuthenticated === true)
        {                    
            alert('login successfully')
        }
        return(() => dispatch(clearErrors()))
    }, [error.id])
    

    const handleChange = e => {      
        
        setErrMsg('')
        const { name, value }  = e.target;        
        
        setUserInfo({
            ...userInfo,
            [ name ]: value
        })        

    }    

    return (        
            
        <form method="POST" onSubmit={onSubmit} className="form m-auto p-5" style={{height:"100%"}}>
            <h3>Partner.</h3>            
            <p style={{color:"var(--danger)", fontWeight:"bold"}}>{errMsg}</p>
            <div className="d-flex flex-column mt-4">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={ userInfo.email }
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex flex-column mt-2">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={ userInfo.password }
                    onChange={handleChange}
                />
            </div>                        
            
            <input type="submit" className="my-4 mx-0 primary-bg-button" name="submit" value="Submit"/>
        </form>        
            
    )
}

export default LoginForm
