import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Like = ({ onLikePost, like }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)    
    

    return (
        <>
            <img className="small-icon mr-2"  src={require('../images/like.svg')} alt="like"/>
            <small>{like}</small>
        </>
    )
}

export default Like
