import React from 'react'

const InfoBar = ({ room }) => {
    return (
        <div className="infobar d-flex flex-row">
            <div className="mr-auto d-flex flex-row">
                <img className="small-icon" src={require('../../images/online.svg')} alt="online"/>
                <h5 className="ml-2">{room}</h5>
            </div>
            <div className="ml-auto">
                <a href="/">X</a>
            </div>
        </div>
    )
}

export default InfoBar
