

import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Room from './components/Room'

function App() {
  return (
    <div>

      <Routes>

        <Route element={<Home />} path='/' />
        <Route element={<Room />} path='/room' />

        






      </Routes>





      
    </div>
  )
}

export default App
