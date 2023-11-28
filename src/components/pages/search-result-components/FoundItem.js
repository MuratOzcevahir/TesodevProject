import React from 'react'


function FoundItem(obj) {
    const item = obj.obj;
    return (
        <div>
            <div className='search-result-item d-flex flex-column flex-sm-row justify-content-between align-items-start w-100'>
                <div className='d-flex flex-sm-row flex-column align-items-start justify-conten-center'>
                    <div>
                    <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='found-item-title'>{item.country} {item.city}</span>
                        <span className='found-item-mini'> {item.email} </span>
                    </div>
                </div>
                <div className='d-flex flex-column text-lg-end '>
                    <span> {item.nameSurname}</span>
                    <span> {item.date} </span>
                </div>

            </div>


            <hr className='w-100' />
        </div>

    )
}

export default FoundItem