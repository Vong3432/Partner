import React, {useState, useEffect} from 'react'

const CreatePost = ({ text }) => {

    const [content, setContent] = useState("")

    const handleChange = (e) => {
        setContent({[e.target.name]: e.target.value})        
    }

    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={require('../../images/person.jpg')} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0 header">John Doe</h5>          
                        <div className="d-flex flex-column">
                            <textarea onChange={e => handleChange(e)} placeholder="Enter something ..." name="content" id="newPostField">{content}</textarea>                        
                            <button className="primary-bg-button--small ml-auto mr-0 mt-3">Post</button>
                        </div>                                      
                    </div>
                </div>
            </article>
        </>
    )
}

export default CreatePost
