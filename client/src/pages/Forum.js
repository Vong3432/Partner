import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../actions/postActions'
import Article from '../components/user/Article'

const Forum = () => {

    // state
    const [isLoading, setIsLoading] = useState(true)
    const allposts = useSelector(state => state.post.allposts)

    // dispatch
    const dispatch = useDispatch()
    
    // effect
    useEffect(() => {
        if (isLoading === true) {
            dispatch(getAllPosts());
            console.log(allposts)
            setIsLoading(false)
        }

        return (() => setIsLoading(true))
    }, [])

    return (
        <>
            <section className="forum-section container">
                <div className="mr-auto" style={{maxWidth:"60%"}}>
                    {allposts ? allposts.map((item, index) => (                                          
                        // <Article key={index} PostingID={item.PostingID} ProfileID={props.match.params.id} avatar={profile.ProfilePic ? profile.ProfilePic : null} image={item.Picture ? item.Picture : null} text={item.Description} author={profile.Name} />
                        <Article key={index} PostingID={item.PostingID} ProfileID={item.ProfileID} image={item.Picture ? item.Picture : null} avatar={item.ProfilePic} author={item.Username} text={item.Description} />
                    )) : null}
                </div>                
            </section>
        </>
    )
}

export default Forum
