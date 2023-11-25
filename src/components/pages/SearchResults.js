import React, { createRef, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FoundItem from './search-result-components/FoundItem';

import bigData from '../../data/mock-data.json'
function SearchResults() {
    const location = useLocation();
    let foundData = location.state;
    let searchValue = createRef();
    let nextPage = []
    let previousPage = []
    const [mappedData, setmappedData] = useState([]);
    const [currentSlice, setcurrentSlice] = useState(0);
    const [nextSlice, setnextSlice] = useState(5)
    const [currentPage, setcurrentPage] = useState(1)
    const [previousPages, setpreviousPages] = useState([])
    const [nextPages, setnextPages] = useState([])
    const [totalPage, settotalPage] = useState(0)

    const [searchText, setsearchText] = useState("")

    const [filterStyle, setfilterStyle] = useState("");

    useEffect(() => {
        console.log(filterStyle, " fiteer")
        const foundCols = bigData.cols;
        const foundItems = bigData.data;
        settotalPage(foundItems.length)
        //creating new obj from cols and data
        setmappedData(foundItems.map((item, i) => {
            let obj = {};
            foundCols.forEach((col, coli) => obj[col] = item[coli]);
            return obj;
        }))


    }, [])

    useEffect(() => {


        for (let i = 0; i <= 2; i++) {
            nextPage.push(currentPage + (currentPage > 2 ? 5 : 1) + i)

        }
        if (currentPage !== 1) {
            for (let i = 1; i >= 0; i--) {
                if ((currentPage - 1 - i) > 0)
                    previousPage.push(currentPage - 1 - i)
            }
        }

        setpreviousPages(previousPage)
        setnextPages(nextPage)

    }, [currentPage])
    const SetFilterStyleHandler = (value) => {
        console.log(value, "value")
        setfilterStyle(value)
    }
    useEffect(() => {
        console.log(filterStyle)
        console.log("çalıştı filtermap")
        console.log(mappedData.length)
        if (mappedData.length > 0) {
            setmappedData(mappedData.sort(FilterData))
        }

    }, [filterStyle])


    const FilterData = (a, b) => {
        switch (filterStyle) {
            case "nameDESC":
                {
                    if (a.nameSurname > b.nameSurname) {
                        return -1;
                    }
                    if (a.nameSurname < b.nameSurname) {
                        return 1;
                    }
                    return 0;
                }

            case "nameASC": {
                if (a.nameSurname < b.nameSurname) {
                    return -1;
                }
                if (a.nameSurname > b.nameSurname) {
                    return 1;
                }
                return 0;
            }
            case "yearASC": {
                return new Date(a.date) - new Date(b.date);
            }
            case "yearDESC": {
                return new Date(b.date) - new Date(a.date);
            }

        }



    }
    const PageHandler = (set, page) => {
        if (set === 'n') {
            setcurrentSlice(currentSlice + 5)
            setnextSlice(nextSlice + 5);
            setcurrentPage(currentPage + 1);
        } else if (set === 'p') {
            setcurrentSlice(currentSlice - 5)
            setnextSlice(nextSlice - 5);
            setcurrentPage(currentPage - 1)

        } else if (set === 'd') {
            setcurrentPage(page)
            setcurrentSlice((page * 5) - 5)
            setnextSlice(page * 5);
        }
    }
    const SearchButtonHandler = () => {

        setsearchText(searchValue.current.value)
    }
    const FilterHandler = (item) => {
        //not dynamic search
        return item["nameSurname"].includes(searchText) || item["date"].includes(searchText);

    }
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
                                <input ref={searchValue} className='search-input' type="text" />
                            </div>
                            <button className='btn-link' onClick={SearchButtonHandler}>Search</button>
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
                            <span onClick={() => { SetFilterStyleHandler("nameASC") }}> Name Ascending</span>
                            <span onClick={() => { SetFilterStyleHandler("nameDESC") }}>Name Descending</span>
                            <span onClick={() => { SetFilterStyleHandler("yearASC") }}>Year Ascending</span>
                            <span onClick={() => { SetFilterStyleHandler("yearDESC") }}>Year Descending</span>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-12 col-lg-8 m-auto'>
                        <div className='d-flex flex-column' style={{ width: "90%" }} >
                            {
                                mappedData
                                    .filter(FilterHandler)
                                    .sort(FilterData)    
                                    .slice(currentSlice, nextSlice)
                                    .map((item, i) =>
                                        <FoundItem key={i} obj={item} />
                                    )
                            }
                        </div>
                        <div className='results-pagination'>
                            <a disabled={true} style={{ pointerEvents: currentPage < 2 ? "none" : '' }} onClick={() => { PageHandler('p') }}> Previous</a>
                            {
                                previousPages.map((p, i) => {
                                    return <a key={i} onClick={() => { PageHandler('d', p) }}> {p}</a>
                                })
                            }
                            <a className='current-page' style={{ pointerEvents: "none" }}> {currentPage}</a>
                            {currentPage > 2 ? <span className='page-seperator'>...</span> : ''}
                            {
                                nextPages.map((p, i) => {
                                    return <a key={i} onClick={() => { PageHandler('d', p) }}> {p}</a>
                                })
                            }
                            <a onClick={() => { PageHandler('n') }}> Next</a>
                            {totalPage}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchResults