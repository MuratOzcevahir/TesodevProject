import React from 'react'

function SearchInput(prop) {
    return (
        <div className='search-holder d-column d-lg-flex justify-content-between text-center align-items-center  gap-3 h-100'>
            <div className='position-relative w-100 d-flex align-items-center '>
                <div className='search-icon'>
                    <i className="fas fa-search"></i>
                </div>
                <input onKeyDown={e => e.key == 'Enter' ? prop.SearchItems() : ''} className='search-input' type="text" ref={prop.inputRef} placeholder={prop.ph}/>
            </div>
            <button className='btn-link mt-3 mt-lg-0' onClick={prop.SearchItems}>Search</button>
        </div>
    )
}

export default SearchInput