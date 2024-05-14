import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'

import AdminDashbord from './pages/adminPages/AdminDashbord'
import CreateService from './pages/adminPages/CreateServices'
import ModifyService from './pages/adminPages/UpdateServices'

import ComptableDashbord from './pages/comptablePages/ComptableDashbord'
import CreateFacture from './pages/comptablePages/CreateFacture'

import SecretaireDashbord from './pages/secretairePages/SecretaireDashbord'
import InsertClient from './pages/secretairePages/InscrireClient'
import ModifyClientProfil from './pages/secretairePages/Modifierprofil'

/* <a
className="App-link"
href="https://reactjs.org"
target="_blank"
rel="noopener noreferrer"
> */

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route path="/adminDashbord" element={<AdminDashbord />} />
        <Route path="/create_service" element={<CreateService />} />
        <Route path="/modify_service" element={<ModifyService />} />

        {/* Comptable routes */}
        <Route path="/comptableDashbord" element={<ComptableDashbord />} />
        <Route path="/create_facture" element={<CreateFacture />} />
        {/* <Route path="/modify_service" element={<ModifyService />} /> */}

        {/* Secretaire routes */}
        <Route path="/secretaireDashbord" element={<SecretaireDashbord />} />
        <Route path="/insertClient" element={<InsertClient />} />
        <Route path="/modifyProfil" element={<ModifyClientProfil />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
