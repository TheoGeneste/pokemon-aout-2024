import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from './Pages/Pokemons'
import PokemonDetails from './Pages/PokemonDetails'
import PokemonsPagination from './Pages/PokemonsPagination'
import NavBar from './Components/NavBar'

function App() {
  return (
    <>
     <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Pokemons />} />
        <Route path='/pokemons' element={<PokemonsPagination />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
