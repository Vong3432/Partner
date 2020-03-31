import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../actions/jobActions'

const SearchField = ({ handleChange }) => {

    // determine advance search content visibility
    const [show, setShow] = useState(false)

    // set className to blockquote and advSearchClass depends on show variable
    const [blockquoteClass, setBlockQuoteClass] = useState("")
    const [advSearchClass, setAdvSearchClass] = useState("")
    const [isLoading, setIsLoading] = useState(true)  
    
    const dispatch = useDispatch()
    const category = useSelector(state => state.job.category)

    // advance search styling
    const advanceSearchStyling = {
        cursor: "pointer",
        textDecoration: "underline",
        color:"var(--light-grey)"
    }

    useEffect(() => {                
        
        dispatch(getCategory())        
        setIsLoading(false)        

    }, [])

    function handleBlockquote() {
        return show ? setBlockQuoteClass("transition-hide d-none") : setBlockQuoteClass("transition-show d-block")
    }

    function handleAdvSearchContent() {
        return show ? setAdvSearchClass("transition-show d-flex") : setAdvSearchClass("transition-hide d-none")
    }

    useEffect(() => {
        handleBlockquote()
        handleAdvSearchContent()
    }, [show])

    return (
        <>
            {/* hidden blockquote if advance search is clicked */}
            <p className={`blockquote ${blockquoteClass}`}>Start Exploring Jobs on Partner.</p>

            <div className="d-flex flex-column flex-md-column justify-content-between align-items-start" style={{transition: "height 300ms ease-in-out"}}>

                {/* SearchBar */}
                <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className={show ? `shadow my-3 mr-auto` : `shadow my-3 ml-lg-0 `}
                    onChange={handleChange}
                    placeholder="Search Position, Title or ..."
                />                                
            </div>
            <a className="py-2"  onClick={() => setShow(!show)} style={advanceSearchStyling}>Advance Search</a>

            {/* Display advance search content if show is true */}
            <div className={`align-self-start flex-row row-wrap advanceSearchContent ${advSearchClass}`}>

                <div className="w-30 text-left">

                    <label htmlFor="category">Category</label>
                    <select name="category" onChange={handleChange} className="custom-select">
                        <option value="">Open this select menu</option>
                        {category.map((i, index) => <option value={index}>{i.name}</option>)}                                                
                    </select>
                </div>

                {/* <div className="w-30 text-left mx-2">

                    <label htmlFor="bb">Description</label>
                    <select name="bb" className="custom-select">
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div> */}

            </div>
        </>
    )


}

export default SearchField
