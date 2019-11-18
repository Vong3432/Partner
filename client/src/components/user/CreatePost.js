import React, { useState, useCallback, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { addPost, deletePost, editPost, getPosts } from '../../actions/postActions'
import { clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'
import axios from 'axios'
import io from 'socket.io-client'
import { resolve } from 'url'
let socket

const CreatePost = (props) => {

    const [content, setContent] = useState("")
    const [msg, setMsg] = useState("")

    const [file, setFile] = useState("")
    const [name, setImgName] = useState("")
    const [img, setImg] = useState(null)    

    const error = useSelector(state => state.error)
    const dispatch = useDispatch()

    // socket = io.connect("http://localhost:5000")
    // console.dir(socket)

    // socket.on('itemAdded', res=>{
    //     console.dir(res)
    //     props.addPost(res)
    // })

    const handleChange = (e) => {
        dispatch(clearErrors())
        console.log(e.target.value)

        if (e.target.name === "imgPath") {
            setImg(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
            setImgName(e.target.files[0].name)
        }
        else
            setContent(e.target.value)
    }

    CreatePost.propTypes = {
        user: PropTypes.object,
        error: PropTypes.object.isRequired,        
    }

    const onSubmit = e => {        
        e.preventDefault()
        // console.log(file)

        if (content || file) {

            if (file) {
                const data = new FormData()
                data.append('file', file)     
                axios.post("/api/post/upload", data, { 
                    // receive two    parameter endpoint url ,form data
                })
                .then(res => { // then print response status
                    console.log(res.statusText)
                    setFile("")                    
                    setImg(null)
                    setImgName("")
                 })
            }

            const newPost = {
                ProfileID: props.auth.id,
                Description: content || "",
                Picture: name || ""
            }
            // console.log(newPost.Picture)
            dispatch(addPost(newPost))
            if(error.id === "POST_FAIL")
            {
                alert('Something went wrong, please try again.')                
            }
            else
            {
                alert('Post successfully.')                
            }            
            setContent("")                        
            // props.getPosts(props.routeProps.match.params.id)    
            
            // props.addNewItemSocket(socket, newPost)
            // socket.emit('getPost', props.routeProps.match.params.id)                                              
            // console.log(props.routeProps)       
            // props.routeProps.history.push(`/profile/${props.routeProps.user.id}`)
        }
        else
            alert('Please enter text...')
    }

    useEffect(() => {        
        return (()=>console.log('exit'))
    },[])

    // useEffect(() => {

    //     // Check for register error
    //     if (props.error.id === "POST_FAIL")
    //         alert("Post is not sent successfully.")

    // }, [props.error])


    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={props.avatar? '/uploads/profile/' + props.avatar : null} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0 header">{props.auth.name}</h5>
                        <form encType="multipart/form-data" style={{ maxWidth: "100%" }} className="d-flex flex-column">
                            <textarea onChange={e => handleChange(e)} placeholder="Enter something ..." name="content" id="newPostField" value={content}></textarea>
                            <img src={img} style={{ maxWidth: "300px", maxHeight: "300px", width: "100%", height: "100%", objectFit: "cover" }} />
                            <div className="d-flex flex-row mt-3 align-items-center">
                                <input accept='image/*' style={{ maxWidth: "100px" }} type="file" name="imgPath" onChange={(e) => handleChange(e)} />
                                <button onClick={e => onSubmit(e)} className="primary-bg-button--small ml-auto mr-0">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </>
    )
}



export default CreatePost;
