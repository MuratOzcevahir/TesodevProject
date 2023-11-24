import React from 'react'

function FoundItem(prop) {
    console.log(prop.props, " from items")
    return (
        <div>
            <div className='search-result-item d-flex justify-content-between align-items-center w-100'>
                <div className='d-flex align-items-center'>
                    <i className="bi bi-geo-alt"></i>
                    <div className='d-flex  flex-column'>
                        <span className='found-item-title'> {prop.props[7]}</span>
                        <span className='found-item-mini'> {prop.props[6]} </span>
                    </div>
                </div>
                <div className='d-flex flex-column text-end '>
                    <span> {prop.props[1]}</span>
                    <span> {prop.props[8]} </span>
                </div>

            </div>


            <hr className='w-100' />
        </div>

    )
}

export default FoundItem