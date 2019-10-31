import React, {useContext, useState} from 'react'
import CardList from '../components/CardList'
import Preview from '../components/Preview'


const JobsGrid = () => {    

    return (
        <div className="posts-grid">

            <article className="posts-grid-left d-flex flex-column">
                <CardList />
            </article>

            <div className="posts-grid-right">
                <div className="posts-grid-right-content">
                    <Preview />
                </div>
            </div>

        </div>
    )
}

export default JobsGrid
