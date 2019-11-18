import React from 'react'

const Article = ({ text, author, image, avatar }) => {
    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={avatar? '/uploads/profile/' + avatar : null} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0 header">{author}</h5>
                        <p className="paragraph">
                            {text}
                        </p>
                        {image? <img style={{maxWidth:"100%", maxHeight:"400px", objectFit:"contain"}} src={image?'/uploads/posts/' + image :null} alt="img"/> : null}
                    </div>
                </div>
            </article>
        </>
    )
}

export default Article
