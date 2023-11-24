import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FoundItem from './search-result-components/FoundItem';

import bigData from '../../data/mock-data.json'
function SearchResults(props) {
    const location = useLocation()
    let foundData = location.state;
    let foundItems = bigData.data.slice(0, 5);
    console.log(foundItems)


    return (
        <div id='search-results-page-holder'>
            <div className='container-fluid p-5'>
                <div className='row row-gap-5'>
                    <div className='col-12 col-lg-2'>
                        <img src="/img/logo.webp" width="200" />
                    </div>
                    <div className='col-12 col-lg-8 '>
                        <div style={{ width: "90%" }} className='d-column d-lg-flex justify-content-between align-items-center h-100'>
                            <div className='position-relative w-100 '>
                                <div className='search-icon'>
                                    <i className="bi bi-search"></i>
                                </div>
                                <input className='search-input' type="text" />
                            </div>
                            <button className='btn-link'>Search</button>
                        </div>
                    </div>

                    <div className='col-12 col-lg-2'>
                        <div className='h-100 d-flex align-items-center justify-content-center'>
                            <Link to='/addlink' className='btn-link'>Add new record</Link>
                        </div>
                    </div>
                </div>
                <div className='container d-flex justify-content-end w-75 mt-4'>
                    <div className='show-hidden-menu  z-3'>
                        <span className='search-filter'><i className="bi bi-shuffle"></i> Order by</span>
                        <div className='hidden-filter-menu'>
                            <span> Name Ascending</span>
                            <span>Name Descending</span>
                            <span>Year Ascending</span>
                            <span>Year Descending</span>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-12 col-lg-8 m-auto'>
                        <div className='d-flex flex-column' style={{ width: "90%" }} >
                            {
                                foundItems.map((item, i) =>
                                    <FoundItem key={i} props={item} />
                                )
                            }
                        </div>
                      <div className='results-pagination'>
                        asdasd
                      </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchResults