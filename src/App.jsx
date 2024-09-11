import { useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import HomePage from './pages/Home'
import DashboardPage from './pages/Dashboard'
import Coin from "./pages/Coin"
import ComparePage from "./pages/ComparePage"
import Watchlist from "./pages/Watchlist"

function App() {
  return (
      <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/coin/:id" element={<Coin />} />               
                <Route path="/compare" element={<ComparePage />} />               
                <Route path="/watchlist" element={<Watchlist />} />               
            </Routes>
            </BrowserRouter>
      </div>

  )
}

export default App
