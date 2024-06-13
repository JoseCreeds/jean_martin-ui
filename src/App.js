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
import GenerateFactureFacture from './pages/comptablePages/GenerateFacture'

import SecretaireDashbord from './pages/secretairePages/SecretaireDashbord'
import InsertClient from './pages/secretairePages/InscrireClient'
import ModifyClientProfile from './pages/secretairePages/ModifierProfile'

import ClientDashbord from './pages/clientPages/ClientDashbord'

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
        <Route path="/modify_service/:id" element={<ModifyService />} />

        {/* Comptable routes */}
        <Route path="/comptableDashbord" element={<ComptableDashbord />} />
        <Route path="/create&facture/:facture_id" element={<CreateFacture />} />
        <Route
          path="/generatefacture/:user_id"
          element={<GenerateFactureFacture />}
        />
        {/* <Route path="/modify_service" element={<ModifyService />} /> */}

        {/* Secretaire routes */}
        <Route path="/secretaireDashbord" element={<SecretaireDashbord />} />
        <Route path="/insertClient" element={<InsertClient />} />
        <Route path="/modifyprofil/:id" element={<ModifyClientProfile />} />

        {/* Client routes */}
        <Route path="/clientdashbord" element={<ClientDashbord />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
