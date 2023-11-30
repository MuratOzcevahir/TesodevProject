import React, { createRef, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import bigData from '../../data/mock-data.json'
import FoundItem from '../search-result-components/FoundItem';
import SearchInput from '../search-components/SearchInput';
function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    let foundData = location.state;
    foundData = location.state != null ? foundData.searchTextFromMain.toLowerCase() : ''; // get search text from state in main page
    let searchValue = createRef(); //access to search input element's properties
    let nextPage = []
    let previousPage = []


    let filteredData = []
    const [mappedData, setmappedData] = useState([]); // data from localstorage/json
    const [currentSlice, setcurrentSlice] = useState(0); //slice the data list by the value
    const [nextSlice, setnextSlice] = useState(5)
    const [currentPage, setcurrentPage] = useState(1) // active page
    const [previousPages, setpreviousPages] = useState([]) // previous page list for user
    const [nextPages, setnextPages] = useState([])// next page list for user
    const [totalItemAmount, settotalItemAmount] = useState(0) // found items by searched or pure data length
    const [searchText, setsearchText] = useState(foundData); // searched text by user
    const [filterStyle, setfilterStyle] = useState(""); // sorted data rule
    useEffect(() => {
        if (localStorage.getItem("items") == null) localStorage.setItem("items", JSON.stringify(bigData))


        const fromLocalStorage = JSON.parse(localStorage.getItem("items"));
        const foundCols = fromLocalStorage.cols;
        const foundItems = fromLocalStorage.data;
        //creating new obj from cols and data
        setmappedData(foundItems.map((item, i) => {
            let obj = {};
            foundCols.forEach((col, coli) => obj[col] = item[coli]);
            return obj;
        }))
        settotalItemAmount(location.state != null ? location.state.itemAmount : foundItems.length)
    }, [])
    useEffect(() => {
        //pagination by some {currentPage mappedData totalItemAmount} changes
        let addPage = currentPage > 2 ? 4 : 1
        if (currentPage < totalItemAmount / nextSlice) {
            for (let i = 0; i <= 2; i++) {
                nextPage.push(currentPage + addPage + i)
            }
        }
        if (currentPage !== 1) {
            for (let i = 1; i >= 0; i--) {
                if ((currentPage - 1 - i) > 0)
                    previousPage.push(currentPage - 1 - i)
            }
        }
        setpreviousPages(previousPage)
        setnextPages(nextPage)
    }, [currentPage, mappedData, totalItemAmount])

    /** sets the variable for sorting array 
     * @param value the rule to sort an array list
    */
    const SetFilterStyleHandler = (value) => {
        setfilterStyle(value)
    }
    useEffect(() => {
        // sorts the data default by "" when page loaded in the first time or when sorting rule changed
        if (filterStyle != "") {
            setmappedData(mappedData.sort(SortDataHandler))
        }
    }, [filterStyle])

    /** Sorting the data by rules
    * @param a property of obj
    * @param b property of obj
    * 
    * returns sorted 
    */
    const SortDataHandler = (a, b) => {
        //data sorting rules
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
    /** Sets the current page by user choices
     * 
     * @param {string} set the type of choice
     * @param {number} page exact page number
     */
    const PageHandler = (set, page) => {
        //page moves
        if (set === 'n') {//sets next page as current page
            setcurrentSlice(currentSlice + nextSlice)
            setcurrentPage(currentPage + 1);
        } else if (set === 'p') { //sets previous page as current page
            setcurrentSlice(currentSlice - nextSlice)
            setcurrentPage(currentPage - 1)

        } else if (set === 'd') { // sets current page
            setcurrentPage(page)
            setcurrentSlice((page * nextSlice) - nextSlice)
        }
    }
    const SearchButtonHandler = () => {
        //data search clicked
        let searched = searchValue.current.value.toLowerCase()
        setsearchText(searched)
        setcurrentPage(1);
        setcurrentSlice(0, nextSlice);
        navigate(location.pathname, "");//resets the location.state
        
        settotalItemAmount(mappedData.filter((p) => {
            return p.nameSurname.toLowerCase().includes(searched)
                || p.date.toLowerCase().includes(searched)
                || p.company.toLowerCase().includes(searched)
                || p.email.toLowerCase().includes(searched)
                || p.website.toLowerCase().includes(searched)
                || p.country.toLowerCase().includes(searched)
        }).length); //returns the length of filtered data
    }
    const FilterHandler = (item) => {
        //returns an item if searchText includes
        return item["nameSurname"].toLowerCase().includes(searchText)
            || item["date"].toLowerCase().includes(searchText)
            || item["company"].toLowerCase().includes(searchText)
            || item["email"].toLowerCase().includes(searchText)
            || item["website"].toLowerCase().includes(searchText)
            || item["country"].toLowerCase().includes(searchText)
            
    }
    return (
        <div id='search-results-page-holder'>
            <div className='container-fluid p-5 '>
                <div className='row row-gap-5 m-0 p-0'>
                    <div className='col-12 col-xl-2 p-0'>
                        <Link to="/"><img src="/img/logo.webp" width="200" /></Link>
                    </div>
                    <div className='col-12 col-xl-8 '>
                        <SearchInput ph={searchText} SearchItems={SearchButtonHandler} inputRef={searchValue} />

                    </div>
                    <div className='col-12 col-xl-2'>
                        <div className='h-100 d-flex align-items-center justify-content-center'>
                            <Link to='/addlink' className='btn-link'>Add new record</Link>
                        </div>
                    </div>
                </div>
                <div className='container d-flex justify-content-end w-75 mt-4'>
                    <div className='show-hidden-menu'>
                        <span className='search-filter'>
                            <span className="material-symbols-outlined">
                                swap_vert
                            </span>
                            Order by</span>
                        <div className='hidden-filter-menu'>
                            {/* sets sort rule */}
                            <span onClick={() => { SetFilterStyleHandler("nameASC") }}> Name Ascending</span>
                            <span onClick={() => { SetFilterStyleHandler("nameDESC") }}>Name Descending</span>
                            <span onClick={() => { SetFilterStyleHandler("yearASC") }}>Year Ascending</span>
                            <span onClick={() => { SetFilterStyleHandler("yearDESC") }}>Year Descending</span>
                        </div>


                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-12 col-lg-8 m-auto'>
                        <div className='items-holder d-flex flex-column' >
                            {
                                totalItemAmount < 1 ? 'no data found, try another' : mappedData
                                    .sort(SortDataHandler)
                                    .filter(FilterHandler)
                                    .slice(currentSlice, currentSlice + nextSlice)
                                    .map((item, i) =>
                                        <FoundItem key={i} obj={item} />
                                    )
                                //final show mapped
                            }
                        </div>
                        {/* pagination */}
                        <div className={totalItemAmount > 3 ? `results-pagination flex-sm-row` : `d-none`} >
                            {currentPage > 4 ? <a className='fs-6 text-dark' onClick={() => { PageHandler('d', 1) }}> {1}</a> : null}
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

                            {currentPage >= Math.ceil(totalItemAmount / nextSlice) ? '' : <a className='fs-6  text-dark' onClick={() => { PageHandler('d', Math.ceil(totalItemAmount / nextSlice)) }}> {Math.ceil(totalItemAmount / nextSlice)}</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults