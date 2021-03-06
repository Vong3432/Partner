import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const SignUpForm = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const [ userInfo, setUserInfo ] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'employer'
    })

    const [ isFirstForm, setIsFisrtForm ] = useState(true)

    const goToNext = e => {
        e.preventDefault();

        if( isFirstForm )
            setIsFisrtForm(false)        
    }

    const onSubmit = e => {
        
        e.preventDefault();        
        
        console.log(error)
        dispatch(register(userInfo))
        if(error.id === "REGISTER_FAIL")
            alert('Ops, there is an error occured. Please try again.')
        else   
        {
            alert('You have register successfully.')
            window.location.href = '/login'
        }            
    }

    const handleChange = e => {       
        const { name, value }  = e.target;   
        dispatch(clearErrors())     
        
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
            {/* <div className="text-center" style={{margin:"4em auto"}}>
                <h3 className="title">Welcome to Partner.</h3>
                <p className="paragraph light-grey-text">Partner provides opportunities for everyone to fullfill needs</p>
            </div> */}            
            <div style={{margin:"4em 0 0em 0", height:"inherit"}}  className="d-flex flex-lg-row flex-lg-nowrap flex-column align-items-center">
            <img src={require('../../images/form.jpg')} alt="form.jpg" className="form-image mr-lg-auto my-4 my-md-0"/>
            { isFirstForm && (
            <form className="form ml-lg-auto" onSubmit={goToNext}>

            <div className="d-flex flex-column w-100">
                <h3 className="title">Welcome to Partner.</h3>
                <p className="paragraph">Partner provides opportunities for everyone to fullfill needs</p>
            </div>

            <div id="divider" className="mt-0 mb-4" style={{width:"20%"}}></div>            

            <div className="d-flex flex-column mt-4">
                <label htmlFor="name">Username</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={ userInfo.name }
                    onChange={handleChange}
                />
            </div>

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

            <div className="d-flex flex-column mt-4">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={ userInfo.password }
                    onChange={handleChange}
                />
            </div>

            <input type="submit" value="Continue" className="my-5 ml-0 primary-bg-button" />
            </form>
            )}   

            { !isFirstForm && (
            <form className="form ml-md-auto" onSubmit={onSubmit}>
                <div className="d-flex flex-column">
                    <label htmlFor="userType">I want to create my account as</label>                    
                    <select 
                        name="userType" 
                        defaultChecked
                        onChange={(e) => handleChange(e)} 
                        style={{
                            fontSize:"1.7rem", 
                            fontFamily:"helveticaMedium",                            
                            padding:".25em .5em",
                            borderRadius:"7px"
                        }}
                    > 
                        <option value="employer">Employer</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                <div className="d-flex flex-column mt-5">
                    <p className="light-grey-text" 
                        style={{textDecoration:"underline", cursor:"pointer"}}
                        onClick={() => setIsFisrtForm(true)}
                    >
                        Go to previous page?
                    </p>
                    {/* <input type="button" className="primary-bg-button" name="back" value="Back" onClick={() => setIsFisrtForm(true)}/> */}
                    <input type="submit" className="primary-bg-button ml-0" name="submit" value="Create account"/>
                </div>

            </form>
            )}      
            </div>                              
        </>        
    )
}

export default SignUpForm
