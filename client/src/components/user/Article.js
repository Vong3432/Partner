import React from 'react'

const Article = ({ text }) => {
    return (
        <>
            {/* post */}
            <article className="profile-article">
                <div className="media">
                    <img id="avatar--small" src={require('../../images/person.jpg')} className="mr-3" alt="..." />
                    <div className="media-body">
                        <h5 className="mt-0 header">John Doe</h5>
                        <p className="paragraph">
                            {text}
                        </p>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Article
