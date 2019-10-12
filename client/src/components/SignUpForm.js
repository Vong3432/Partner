import React, { useState, useEffect } from 'react'

const SignUpForm = () => {

    const [ userInfo, setUserInfo ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: ''
    })

    const [ isFirstForm, setIsFisrtForm ] = useState(false)

    const goToNext = e => {
        e.preventDefault();

        if( isFirstForm )
            setIsFisrtForm(false)        
    }

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
        <>

            { isFirstForm && (
            <form onSubmit={goToNext}>
                <div>

                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    id="firstName"
                    value={ userInfo.firstName }
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text" 
                    name="lastName" 
                    id="lastName"
                    value={ userInfo.lastName }
                    onChange={handleChange}
                />

            </div>            

            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={ userInfo.email }
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={ userInfo.password }
                    onChange={handleChange}
                />
            </div>

            <input type="submit" value="Next"/>
            </form>
            )}   

            { !isFirstForm && (
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="userType">I want to create my account as</label>                    
                    <select name="userType" onChange={handleChange}> 
                        <option value="employer">Employer</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                <input type="button" name="back" value="Back" onClick={() => setIsFisrtForm(true)}/>
                <input type="submit" name="submit" value="Submit"/>
            </form>
            )}                                    
        </>        
    )
}

export default SignUpForm
