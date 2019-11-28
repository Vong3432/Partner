import React, {useState, useCallback} from 'react'
import CardList from './CardList'
import Preview from './Preview'
import SearchField from '../SearchField'


const JobsGrid = () => {         

    const [searchField, setSearchField] = useState({
        jobTitle: "",
        category:""
    })
        

    const handleChange = e => { 
        e.persist()         
        setSearchField( prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))                  
        console.log(searchField)           
    }

    const searchCallback = useCallback(()=>{        
        return searchField
    }, [searchField])

    return (
        <div className="posts-grid">

            <article className="posts-grid-left d-flex flex-column">
                <SearchField handleChange={handleChange} />
                <CardList jobCallbackFunction={searchCallback} />
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
