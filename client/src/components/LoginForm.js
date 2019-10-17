import React, { useState, useEffect } from 'react'

const LoginForm = () => {

    const [ userInfo, setUserInfo ] = useState({        
        email: '',
        password: '',        
    })    

    const onSubmit = e => {
        e.preventDefault();        
        console.log('You have successfully created a new account')        
    }

    const handleChange = e => {       
        const { name, value }  = e.target;        
        
        setUserInfo({
            ...userInfo,
            [ name ]: value
        })

    }

    useEffect(() => {
        console.log('effect after render')
        console.log(userInfo)         
    }, [userInfo])

    return (        
            
        <form onSubmit={onSubmit}>
            <h3>Partner.</h3>
            <div>
                
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={ userInfo.email }
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={ userInfo.password }
                    onChange={handleChange}
                />
                
            </div>
            
            <input type="submit" name="submit" value="Submit"/>
        </form>        
            
    )
}

export default LoginForm
