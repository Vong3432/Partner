import React from 'react'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase()
console.log(trimmedName)
    if (user === trimmedName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="ml-auto messageContainer justify-items-end">
                    <small className="text-muted">{trimmedName}</small>
                    <div className="messageBox px-2" style={{ backgroundColor: "var(--primary-color)" }}>
                        <p className="py-1 text-white messageText">{text}</p>
                    </div>
                </div>
            ) : (
                <div className="mr-auto messageContainer justify-content-start">
                    <small className="text-muted">{user}</small>
                    <div className="messageBox px-3" style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
                        <p className="py-1 messageText" style={{ color: "var(--dark-color)" }}>{text}</p>
                    </div>
                </div>
            )
    )
}

export default Message
