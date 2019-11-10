import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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

    const [ userInfo, setUserInfo ] = useState({        
        email: '',
        password: '',        
    })    

    const [errMsg, setErrMsg] = useState("")

    const onSubmit = e => {
        e.preventDefault();        
        setErrMsg('')
        
        if(userInfo.email && userInfo.password)
        {
            const User = {
                email: userInfo.email,
                password: userInfo.password
            }

             // Attempt to login
            props.login(User)
            
            
        }
        else
            setErrMsg('Please fill in all information.')

        
    }

    const handleChange = e => {       
        const { name, value }  = e.target;        
        
        setUserInfo({
            ...userInfo,
            [ name ]: value
        })        

    }

    useEffect(() => {           
        
    }, [userInfo])

    return (        
            
        <form method="POST" onSubmit={onSubmit} className="form m-auto p-5" style={{height:"100%"}}>
            <h3>Partner.</h3>            
            {errMsg}
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

function mapStateToProps(state)
{    
    return{
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { login, clearErrors })(LoginForm)
