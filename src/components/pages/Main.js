import React, { useEffect, useRef, useState } from 'react'
import Footer from '../globals/Footer'
import { Link } from 'react-router-dom'
import FoundItems from '../main-components/FoundItems'
import bigData from '../../data/mock-data.json'
import MainSlider from '../main-components/MainSlider'
import SearchInput from '../search-components/SearchInput'
import { ToastContainer, toast } from 'react-toastify'
function Main() {
  const [searchInputText, setsearchInputText] = useState("");// searched text
  const [foundData, setfoundData] = useState([]); //
  const inputRef = useRef(); // access to input's properties
  useEffect(() => {
    if (localStorage.getItem("items") != null) return // if localstorage is not empty, dont continue
    localStorage.setItem("items", JSON.stringify(bigData)) // otherwise put data in localstorage
  }, [])

  /**  returns list by "searched" text from data  */
  const SearchItems = () => {
    let searched = inputRef.current.value.toLowerCase();

    if (searched == null || searched == '') return toast.error('Write something', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
    setsearchInputText(searched)
    const foundCols = bigData.cols; // cols from array
    const foundItems = (JSON.parse(localStorage.getItem("items"))).data; //parsed data from localstorage
    setfoundData(foundItems.map((item, i) => {
      let obj = {};//create obj for every single item
      foundCols.forEach((col, coli) => obj[col] = item[coli]); // set obj props by 'col'array
      return obj;
    }).filter((p) => {
      return p.nameSurname.toLowerCase().includes(searched)
        || p.date.toLowerCase().includes(searched)
        || p.company.toLowerCase().includes(searched)
        || p.email.toLowerCase().includes(searched)
        || p.website.toLowerCase().includes(searched)
        || p.country.toLowerCase().includes(searched)
    }));
  }
  return (
    <div id='main-page-holder'>
      <div className='container-fluid p-5'>
        <div className='row row-cols-1 row-gap-5'>
          <div className='col main-link'>
            <Link to='/addlink' className='btn-link'>Add new record</Link>
          </div>
          <div className='col'>
            <div className='main-logo-holder' >
              <div className='d-flex p-2'>
                <img src="/img/logo.webp" />
              </div>
              <span>Search app</span>
            </div>
          </div>
          <div className='col'>
            <div id='main-search-holder' className='col-12 col-lg-6 m-auto'>
              <div className='d-flex flex-column align-items-start '>
                <span className='fw-bold fs-1'>Find in records</span>
                <SearchInput SearchItems={SearchItems} inputRef={inputRef} />
              </div>
            </div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className='col-12 col-lg-6 m-auto'>
              {searchInputText != '' && foundData.length < 1 ? 'no data' : null}
              <div id='main-search-box' className={searchInputText == '' || foundData.length < 1 ? 'd-none' : ''}>
                {foundData.slice(0, 3).map((item, i) => <FoundItems key={i} title={item.nameSurname} smallTitle={item.country} />)} 
                {/* map found items by searched text*/}
                <Link to="/searchresults" state={{ searchTextFromMain: searchInputText, itemAmount: foundData.length }} className={foundData.length < 4 ? 'd-none' : 'more-result'}  >Show More... '{foundData.length}'</Link>
                {/* send state to results page to show more items by searched text */}
              </div>
            </div>
          </div>
          <MainSlider /> 
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Main