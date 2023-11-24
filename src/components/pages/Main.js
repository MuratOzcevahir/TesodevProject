import React from 'react'
import Footer from '../globals/Footer'
import { Link } from 'react-router-dom'
import FoundItems from './main-components/FoundItems'

function Main() {
  const dataToPass = { name: 'John Doe', age: 25 };
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
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div className='position-relative w-100'>
                    <div className='search-icon'>
                      <i className="bi bi-search"></i>
                    </div>
                    <input className='search-input' type="text" />
                  </div>
                  <button className='btn-link'>Search</button>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-6 m-auto'>
              <div id='main-search-box'>
                <FoundItems title="Test" smallTitle="testsetetst" />
                <FoundItems title="Test" smallTitle="testsetetst" />
                <FoundItems title="Test" smallTitle="testsetetst" />
                <Link to="/searchresults" state={{name:"hohn", surName:"doe"}} className="more-result">Show More...</Link>
              </div>
            </div>

          </div>


        </div>
      </div>


      <Footer />

    </div>

  )
}

export default Main