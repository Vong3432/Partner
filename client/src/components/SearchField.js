import React, { useState, useEffect } from 'react'

const SearchField = ({ handleChange }) => {

    // determine advance search content visibility
    const [show, setShow] = useState(false)

    // set className to blockquote and advSearchClass depends on show variable
    const [blockquoteClass, setBlockQuoteClass] = useState("")
    const [advSearchClass, setAdvSearchClass] = useState("")

    // advance search styling
    const advanceSearchStyling = {
        cursor: "pointer",
        textDecoration: "underline"
    }

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
            <p className={`blockquote ${blockquoteClass}`}>It is never too late to be what you might have been. <span className="blockquote-footer">George Eliot</span></p>

            <div className="d-flex flex-column flex-md-row row-md-nowrap justify-content-between align-items-center" style={{transition: "height 300ms ease-in-out"}}>

                {/* SearchBar */}
                <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className={show ? `mw-70 shadow my-3 mr-auto` : `shadow my-3 ml-auto`}
                    onChange={handleChange}
                    placeholder="Search Position, Title or ..."
                />
                <a className="mr-auto ml-lg-4" onClick={() => setShow(!show)} style={advanceSearchStyling}>Advance Search</a>
                
            </div>

            {/* Display advance search content if show is true */}
            <div className={`align-self-start flex-row row-wrap advanceSearchContent ${advSearchClass}`}>

                <div className="w-30 text-left">

                    <label htmlFor="description">Description</label>
                    <select name="description" onChange={handleChange} class="custom-select">
                        <option selected value="">Open this select menu</option>
                        <option value="software">Software</option>
                        <option value="senior">Senior</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="w-30 text-left mx-2">

                    <label htmlFor="bb">Description</label>
                    <select name="bb" class="custom-select">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

            </div>
        </>
    )


}

export default SearchField
