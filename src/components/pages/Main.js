import React, { useEffect, useRef, useState } from 'react'

import Footer from '../globals/Footer'
import { Link } from 'react-router-dom'
import FoundItems from './main-components/FoundItems'
import bigData from '../../data/mock-data.json'
import MainSlider from './main-components/MainSlider'
function Main() {
  const dataToPass = { name: 'John Doe', age: 25 };

  const [searchInputText, setsearchInputText] = useState("");
  const [foundData, setfoundData] = useState([]);
  const inputRef = useRef();
  useEffect(() => {
    if (localStorage.getItem("items") != null) return

    localStorage.setItem("items", JSON.stringify(bigData))


  }, [])
  const SearchItems = () => {
    let searched = inputRef.current.value.toLowerCase();

    if (searched == null || searched == '') return

    setsearchInputText(searched)
    const foundCols = bigData.cols;
    const foundItems = (JSON.parse(localStorage.getItem("items"))).data;



    setfoundData(foundItems.map((item, i) => {
      let obj = {};
      foundCols.forEach((col, coli) => obj[col] = item[coli]);
      return obj;
    }).filter((p) => {
      return p.nameSurname.toLowerCase().includes(searched)
        || p.date.toLowerCase().includes(searched)
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
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <div className='d-flex p-2 '>
                <img src="/img/logo.webp" />
              </div>
              <span>Search app</span>
            </div>
          </div>
          <div className='col'>
            <div id='main-search-holder' className='col-12 col-lg-6 m-auto'>
              <div className='d-flex flex-column align-items-start '>
                <span className='fw-bold fs-1'>Find in records</span>
                <div className='d-flex align-items-center justify-content-between w-100 gap-3'>
                  <div className='position-relative w-100'>
                    <div className='search-icon'>
                      <i className="bi bi-search"></i>
                    </div>
                    <input onKeyDown={e => e.key == 'Enter' ? SearchItems() : ''} className='search-input' type="text" ref={inputRef} />
                  </div>
                  <button className='btn-link' onClick={SearchItems}>Search</button>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-6 m-auto'>
              {
                searchInputText != '' && foundData.length < 1 ? 'no data' : null
              }
              <div id='main-search-box' className={searchInputText == '' || foundData.length < 1 ? 'd-none' : ''}>
                {
                  foundData.slice(0, 3).map((item, i) =>


                    <FoundItems key={i} title={item.nameSurname} smallTitle={item.country} />



                  )
                }

                <Link to="/searchresults" state={{ searchTextFromMain: searchInputText, itemAmount: foundData.length }} className="more-result">Show More... '{foundData.length}'</Link>

              </div>
            </div>

          </div>

          <MainSlider />
        </div>


      </div>


      <Footer />

    </div>

  )
}

export default Main