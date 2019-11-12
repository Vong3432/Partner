import React from 'react'

const Article = ({ text, author, image }) => {
    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={require('../../images/person.jpg')} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0 header">{author}</h5>
                        <p className="paragraph">
                            {text}
                        </p>
                        {image? <img style={{maxWidth:"100%", maxHeight:"400px", objectFit:"contain"}} src={require(`../../uploads/posts/${image}`)} alt={image}/> : null}
                    </div>
                </div>
            </article>
        </>
    )
}

export default Article
