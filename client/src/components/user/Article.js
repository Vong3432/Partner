import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editPost, deletePost, getPosts } from '../../actions/postActions';

const Article = ({ PostingID, ProfileID, text, author, image, avatar }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [isEdit, setEdit] = useState(false)
    const [content, setContent] = useState({
        content:""
    })

    const onSubmit = (e) => {
        // e.preventDefault();
        console.log(PostingID, content)
        const newContent = {
            Description: content
        }
        dispatch(editPost(PostingID, newContent))
        dispatch(getPosts(ProfileID))
        setEdit(!isEdit)
    }

    useEffect(() => {        
        if(text)
        {
            setContent((prevState) => ({...prevState, content: text}))
        }        
    }, [])

    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={avatar? '/uploads/profile/' + avatar : null} className="mr-3" alt="..." />
                    <div className="media-body">
                        <div className="d-flex flex-row">
                            <h5 className="mt-0 header">{author}</h5>
                            { user && ProfileID === user.id ? (
                            <>
                                <img className="small-icon ml-auto mr-2" style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={() => setEdit(!isEdit)} src={require('../../images/edit.svg')} alt="edit"/>
                                <img className="small-icon"  style={{width:"20px", height:"20px", cursor:"pointer"}} onClick={(e) => {dispatch(deletePost(PostingID)); dispatch(getPosts(ProfileID))}} src={require('../../images/delete.svg')} alt="delete"/>                                
                            </>
                            ): (
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
                                <p className="paragraph">
                                    {text}
                                </p>
                            </>
                        )}                        
                        {image? <img style={{width:"100%", maxHeight:"500px", objectFit:"cover"}} src={image?'/uploads/posts/' + image :null} alt="img"/> : null}
                    </div>
                </div>
            </article>
        </>
    )
}

export default Article
