import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'
import InfoBar from './InfoBar';
import Messages from './Messages';

let socket;
const Chat = ({ location }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {
            
        });

        return (() => {
            socket.emit('disconnect')
            socket.off();
        })

    }, [ENDPOINT, location.search])

    useEffect(() => {        

        socket.on('getDefaultMessages', (results) => {
            console.log(results)
        })
                

        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        console.log(messages)
    }, [messages])

    // functions
    const sendMessage = (e) => {
        e.preventDefault()
        
        if(message)
        {                        
            // socket.emit('addMessage', {message}, () => {})
            socket.emit('sendMessage', message, () => setMessage(''));
        }            
    }

    return (
        <section className="py-4" >
            <div className="container">
                <div className="card p-4 card-shadow" style={{ marginTop: "7rem" }}>
                    <InfoBar room={room}/>
                    <Messages messages={messages} name={name}/>
                    <div className="mt-5 d-flex flex-row">
                        <input 
                            type="text"
                            value={message}
                            className="form-control"
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null }
                        />
                        <button className="success-bg-button" onClick={e => sendMessage(e)}>Send</button>
                    </div>                    
                </div>
            </div>            
        </section>
    )
}

export default Chat
