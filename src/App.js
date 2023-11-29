import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/pages/Main'
import SearchResults from './components/pages/SearchResults'
import AddLink from './components/pages/AddLink'
import Footer from './components/globals/Footer'
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/searchresults' element={<SearchResults />} />
          <Route path='/addlink' element={<AddLink />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App