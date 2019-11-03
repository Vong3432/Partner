import React from 'react'
import CardList from '../components/CardList'
import Preview from '../components/Preview'


const JobsGrid = ({callbackFunction}) => {         

    return (
        <div className="posts-grid">

            <article className="posts-grid-left d-flex flex-column">
                <CardList jobCallbackFunction={callbackFunction} />
            </article>

            <div className="posts-grid-right">
                <div className="posts-grid-right-content">
                    <Preview />
                </div>
            </div>

            <a onClick={e => 
                {
                    window.scrollTo({
                        'behavior': 'smooth',
                        'left':0,
                        'top': 0
                    })
                }}  
                id="scrollTopBtn"
            >
                Top
            </a>

        </div>
    )
}

export default JobsGrid
