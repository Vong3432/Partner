import React, { Component } from 'react'

class SearchField extends Component{

    state = {
        
    }

    handleChange()
    {
        
    }

    render()
    {    
        return (
            <>
                <div className="d-flex flex-column flex-md-row row-md-nowrap justify-content-between align-items-center">
                    <input 
                        type="text" 
                        name="searchField" 
                        id="searchField" 
                        className="shadow my-3 ml-auto" 
                        onChange={this.handleChange}
                        placeholder="Search Position, Title or ..."
                    />
                    <input 
                        type="submit" 
                        name="submit" 
                        value="Submit" 
                        className="mr-auto ml-0 ml-md-2 primary-bg-button" 
                        style={{height:"50px", borderRadius:"0"}}
                    />
                </div>
            </>
        )
    }

}

export default SearchField
