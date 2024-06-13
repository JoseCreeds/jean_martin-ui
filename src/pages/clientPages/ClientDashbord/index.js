import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Logo_one from '../../img/document.png'
import Logo_one from '../../../img/document.png'
import Search_logo from '../../../img/search.svg'
import './clientDashbord.css'
import html2pdf from 'html2pdf.js'

import { Suspense } from 'react'

function ClientDashbord() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('user_detail')
  const [factures, setFactures] = useState({})

  const logout = () => {
    localStorage.clear()
  }

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/getfactures/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFactures(data)
        })
        .catch((error) => {})
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token, navigate])

  return (
    <div>
      <div className="contain_header">
        <div className="nav_bar">
          <div className="contain_button">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to="/"
              className="but decon"
              onClick={logout}
            >
              Deconnexion
            </Link>
          </div>
        </div>

        <div className="contain_title">
          <div className="part_one">
            <h4 className="part_one_one">Bienvenu sur votre dashboard</h4>

            <h3 className="part_one_one p">
              Payez ou téléchargez vos factures
            </h3>
          </div>

          <div className="part_two">
            <img src={Logo_one} className="home_img" alt="" />
          </div>
        </div>
      </div>

      <h1 style={{ textAlign: 'center', marginTop: '25px' }}>
        Liste des factures
      </h1>

      {/* <div className="search_bar"></div> */}
      <Suspense fallback={<div> Loading data... </div>}>
        {Object.values(factures).map((facture) => (
          <div key={facture.id} className="facture_contain">
            <div>
              <p className="facture_title">
                Numéro facture : {facture.id}{' '}
                <b style={{ margin: 'auto 20px' }}>|</b> Date:
                {facture.date_facture}
              </p>
              <p>
                <div>
                  <a
                    href={`/create&facture/${facture.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="download_btn"
                  >
                    OUVRIR
                  </a>
                </div>
              </p>
              <div className="facture_statut">
                <p style={{ fontSize: '24px', marginRight: '5px' }}> Statut </p>
                {facture.statut_paiement === 'non_paye' ? (
                  <p className="statut_paiement red"> NON PAYE</p>
                ) : (
                  <p className="statut_paiement green">PAYE</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  )
}

export default ClientDashbord
