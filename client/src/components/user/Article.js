import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editPost, deletePost, getPosts, getAllPosts } from '../../actions/postActions';
// import Like from '../Like';
// import socketIOClient from 'socket.io-client'
import { useAlert } from 'react-alert'

const Article = ({ length, index, LikesCount, PostingID, ProfileID, text, author, image, avatar }) => {

    const alert = useAlert()

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)    
    // const AccountID = useSelector(state => state.auth.user.id)    

    const [isEdit, setEdit] = useState(false)
    const [content, setContent] = useState({
        content: ""
    })

    // const [like, setLike] = useState(0)
    // const [onLike, setOnLike] = useState(false)

    // const endpoint = "http://127.0.0.1:5000"
    // const socket = socketIOClient(endpoint);

    // socket.on("displayLikes", data => { 
    //     console.log(data)           
    //     setLike(data)                                    
    //     // dispatch(getAllPosts())
    // })

    const onLikePost = (e) => {
        console.log('click')
        e.preventDefault()                
        //dispatch(likePost(postingID, ProfileID, user.id))                    
        // socket.emit("onLike", {PostingID, AccountID})           
        // socket.emit("getLikes", {PostingID})
    }  


    const onSubmit = (e) => {
        // e.preventDefault();
        console.log(PostingID, content)
        const newContent = {
            Description: content
        }
        text = content;
        dispatch(editPost(PostingID, newContent))
        dispatch(getPosts(ProfileID))
        setEdit(!isEdit)
        dispatch(getAllPosts())
        setContent((prevState) => ({ ...prevState, content: text }))
    }

    useEffect(() => {                
        // socket.emit("getLikes", {PostingID}) 
        if (text) {
            setContent((prevState) => ({ ...prevState, content: text }))
        }
    }, [])        

    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={avatar ? '/uploads/profile/' + avatar : null} className="mr-3" alt="..." />
                    <div className="media-body">
                        <div className="d-flex flex-row">
                            <h5 className="mt-0 header">{author}</h5>
                            {user && ProfileID === user.id ? (
                                <>
                                    <img className="small-icon ml-auto mr-2" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={() => setEdit(!isEdit)} src={require('../../images/edit.svg')} alt="edit" />
                                    <img className="small-icon" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={(e) => { dispatch(deletePost(PostingID)); dispatch(getPosts(ProfileID)); alert.success('Post has been deleted') }} src={require('../../images/delete.svg')} alt="delete" />
                                </>
                            ) : (
                                    <>
                                        <a href={`/profile/${ProfileID}`} className="primary-bg-button--small ml-auto">View Profile</a>
                                    </>
                                )}
                        </div>
                        {isEdit ? (
                            <>
                                <div className="d-flex flex-row flex-wrap">
                                    <textarea name="newDescription" id="newPostField" onChange={(e) => setContent(e.target.value)} value={content.content}></textarea>
                                    <input type="submit" name="edit" className="ml-auto mr-0 mt-2 primary-bg-button" onClick={e => onSubmit(e)} value="Edit" />
                                </div>
                            </>
                        ) : (
                                <>
                                    <p className="mt-2 paragraph">
                                        {text}
                                    </p>
                                </>
                            )}
                        {image ? <img style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }} src={image ? '/uploads/posts/' + image : null} alt="img" /> : null}
                    </div>
                </div>
                
                {/* <div className="post-footer mt-4">
                    <span className="post-footer-icon" onClick={e => onLikePost(e)}>
                        <Like like={LikesCount}  />
                    </span>             
                    <span className="post-footer-icon">
                        <img className="small-icon mr-2" src={require('../../images/comment.svg')} alt="comment"/>
                        <small>0</small>
                    </span>                           
                </div> */}
            </article>
        </>
    )
}

export default Article
