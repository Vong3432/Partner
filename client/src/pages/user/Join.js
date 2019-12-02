import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Join = (props) => {   
    
    const {id} = props.match.params
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const user = useSelector(state => state.auth.user)

    useEffect(() => {    
        
        if(id)
        {
            setRoom(id)        
            setName(user.name)
        }
            
    }, [id])    

    return (
        <div style={{marginTop:"5rem"}}>
            <h5>Join</h5>
            <input type="text" placeholder="Name" readOnly value={name} />
            <input type="text" placeholder="Room" readOnly value={room}/>
            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="success-bg-button" type="submit">Enter</button>
            </Link>
        </div>
    )
}

export default Join
