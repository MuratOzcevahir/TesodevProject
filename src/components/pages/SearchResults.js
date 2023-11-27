import React, { createRef, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FoundItem from './search-result-components/FoundItem';

import bigData from '../../data/mock-data.json'
function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    let foundData = location.state;
    foundData = location.state != null ? foundData.searchTextFromMain : '';
    console.log(location.state, " location state")
    let searchValue = createRef();
    let nextPage = []
    let previousPage = []

    let filteredData = []
    const [mappedData, setmappedData] = useState([]);
    const [currentSlice, setcurrentSlice] = useState(0);
    const [nextSlice, setnextSlice] = useState(5)
    const [currentPage, setcurrentPage] = useState(1)
    const [previousPages, setpreviousPages] = useState([])
    const [nextPages, setnextPages] = useState([])
    const [totalItemAmount, settotalItemAmount] = useState(0)
    const [searchText, setsearchText] = useState(foundData);
    const [filterStyle, setfilterStyle] = useState("");
    useEffect(() => {
        console.log(filterStyle, " fiteer")

        const fromLocalStorage = JSON.parse(localStorage.getItem("items"));
        const foundCols = fromLocalStorage.cols;
        const foundItems = fromLocalStorage.data;
        //creating new obj from cols and data
        setmappedData(foundItems.map((item, i) => {
            let obj = {};
            foundCols.forEach((col, coli) => obj[col] = item[coli]);
            return obj;
        }))
        settotalItemAmount(foundItems.length)
    }, [])
    useEffect(() => {
        console.log(totalItemAmount, " from totalItemAmountchange")
        let addPage = currentPage > 2 ? 4 : 1
        //######## NEED FIX  IMPORTANT(dont forget)
        console.log(nextPage, " next page after effec")
        if (currentPage < totalItemAmount / nextSlice) {
            for (let i = 0; i <= 2; i++) {
                nextPage.push(currentPage + addPage + i)
            }

        }


        console.log(nextPage, "nexpage")
        if (currentPage !== 1) {
            for (let i = 1; i >= 0; i--) {
                if ((currentPage - 1 - i) > 0)
                    previousPage.push(currentPage - 1 - i)
            }
        }
        setpreviousPages(previousPage)
        setnextPages(nextPage)


    }, [currentPage, mappedData, totalItemAmount])
    const SetFilterStyleHandler = (value) => {
        console.log(value, "value")
        setfilterStyle(value)
    }
    useEffect(() => {
        console.log(filterStyle)
        console.log("çalıştı filtermap")
        console.log(mappedData.length)
        if (filterStyle != "") {
            setmappedData(mappedData.sort(SortDataHandler))
        }

    }, [filterStyle])
    const SortDataHandler = (a, b) => {
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
            setcurrentSlice(currentSlice + nextSlice)
            setcurrentPage(currentPage + 1);
        } else if (set === 'p') {
            setcurrentSlice(currentSlice - nextSlice)
            setcurrentPage(currentPage - 1)

        } else if (set === 'd') {
            setcurrentPage(page)
            setcurrentSlice((page * nextSlice) - nextSlice)
        }
    }
    const SearchButtonHandler = () => {
        setsearchText(searchValue.current.value)
        setcurrentPage(1);
        setcurrentSlice(0, nextSlice);
        navigate(location.pathname, "");

        settotalItemAmount(mappedData.filter((p) => { return p.nameSurname.includes(searchValue.current.value) || p.date.includes(searchValue.current.value) }).length);
    }

    const FilterHandler = (item) => {

        console.log("filter çalıştı")
        //not dynamic search
        // if (item["nameSurname"].includes(searchText) || item["date"].includes(searchText)) {
        //     console.log(item, " found array")
        //     filteredData.push(item);
        // }

        //Few props dont forget
        return item["nameSurname"].includes(searchText) || item["date"].includes(searchText);

    }
    const NoFilter = () => {

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
                                <input ref={searchValue} className='search-input' type="text" placeholder={searchText} />
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
                                    .sort(SortDataHandler)
                                    .filter(FilterHandler)
                                    .slice(currentSlice, currentSlice + nextSlice)
                                    .map((item, i) =>
                                        <FoundItem key={i} obj={item} />
                                    )
                            }
                        </div>
                        <div className='results-pagination'>
                            <a style={{ pointerEvents: currentPage < 2 ? "none" : '' }} onClick={() => { PageHandler('p') }}> Previous</a>
                            {
                                previousPages.map((p, i) => {
                                    return <a key={i} onClick={() => { PageHandler('d', p) }}> {p}</a>
                                })
                            }
                            <a className='current-page' > {currentPage}</a>
                            {currentPage > 2 ? <span style={{ display: currentPage >= (totalItemAmount / nextSlice) ? "none" : '' }} className='page-seperator'>...</span> : ''}
                            {
                                nextPages.map((p, i) => {
                                    return <a key={i} style={{ display: currentPage + 5 >= (totalItemAmount / nextSlice) ? "none" : '' }} onClick={() => { PageHandler('d', p) }}> {p}</a>
                                })
                            }
                            <a style={{ pointerEvents: currentPage >= (totalItemAmount / nextSlice) ? "none" : '' }} onClick={() => { PageHandler('n') }}> Next</a>
                            {totalItemAmount}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchResults