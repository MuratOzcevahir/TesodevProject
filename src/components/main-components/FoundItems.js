import React from 'react'

function FoundItems(prop) {
   
    return (
        <div id='main-found-item' className='d-flex align-items-center'>
            <i className="bi bi-geo-alt"></i>
            <div className='d-flex flex-column'>
                <span>{prop.title}</span>
                <span>{prop.smallTitle}</span>
            </div>
        </div>
    )
}

export default FoundItems