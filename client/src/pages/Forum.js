import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts, getPosts, getPostLikes } from '../actions/postActions'
import Article from '../components/user/Article'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner'
import axios from 'axios';

const Forum = () => {

    // state
    const [isLoading, setIsLoading] = useState(true)
    const allposts = useSelector(state => state.post.allposts)
    const [hasMore, setHasMore] = useState(true)
    const [length, setLength] = useState(0)
    
    // dispatch
    const dispatch = useDispatch()

    // effect
    useEffect(() => {
        if (isLoading === true) {
            dispatch(getAllPosts(3)); 
            setLength(3)                       
            setIsLoading(false)
        }

        return (() => setIsLoading(true))
    }, [])

    const fetchMoreData = () => {
        console.log('fetching')
        setLength(length => length + 3)                
    }        

    useEffect(() => {
        console.log(length)
        if(length > 3)
        {                           
            setTimeout(() => {
                // this.setState({
                //   items: this.state.items.concat(Array.from({ length: 20 }))
                // });            
                
                dispatch(getAllPosts(length))                                 
              }, 1500);                        
        }        
        
    }, [length])    

    return (
        <>
            <section className="forum-section container">
                <div className="py-5 mr-auto px-2 forum-div">

                {allposts && (
                    <InfiniteScroll
                    dataLength={allposts.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    style={{overflow:"initial"}}
                    // loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >                        
                    {allposts ? allposts.map((item, index) => (
                        // <Article key={index} PostingID={item.PostingID} ProfileID={props.match.params.id} avatar={profile.ProfilePic ? profile.ProfilePic : null} image={item.Picture ? item.Picture : null} text={item.Description} author={profile.Name} />
                        <>
                        <Article length={length} index={index} key={index} LikesCount={item.LikesCount} PostingID={item.PostingID} ProfileID={item.ProfileID} image={item.Picture ? item.Picture : null} avatar={item.ProfilePic} author={item.Username} text={item.Description} />
                        </>
                    )) : null}
                </InfiniteScroll>
                )}
                    

                </div>
            </section>
        </>
    )
}

export default Forum
