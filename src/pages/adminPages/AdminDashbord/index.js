import React, { Suspense, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import './adminDashbord.css'
import Meeting from '../../../img/meeting.png'

function AdminDashbord() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [allServices, setServices] = useState({})

  const logout = () => {
    localStorage.clear()
  }

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/service`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token JWT dans l'en-tête Authorization
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setServices(data)
          // setIsLoading(false) // Mettre isLoading à false une fois les données chargées
        })
        .catch((error) => {
          // console.error('Error fetching user data:', error)
          // setIsLoading(false) // isLoading à false même en cas d'erreur
        })
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token, navigate]) // token dans les dépendances pour recharger les données lorsque user token change

  return (
    <div>
      <div className="contain_header">
        <div className="nav_bar">
          <div className="contain_button">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to="/"
              className="btn decon"
              onClick={logout}
            >
              Deconnexion
            </Link>
          </div>
        </div>

        <div className="contain_title">
          <div className="part_one">
            <h4 className="part_one_one">Bienvenu sur votre dashboard</h4>

            <h3 className="part_one_one p">Gestion des services</h3>
          </div>

          <div className="part_two">
            <img src={Logo_one} className="home_img" alt="" />
          </div>
        </div>

        <div className="contain_menus">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/create_service"
            className="btn btn_create"
          >
            Créer un service
          </Link>
        </div>
      </div>

      <div className="middle">
        <div className="middle_top">
          <div className="contain_img">
            <img src={Meeting} className="home_img" alt="" />
          </div>

          <div className="contain_desc">
            <h3 className="">Pléniaire sur les différents services</h3>
            <a
              href="/#"
              style={{ textDecoration: 'none', color: ' rgb(212, 166, 14 )' }}
              className=""
            >
              Parcourez les services en une vue
            </a>
          </div>
        </div>

        <div className="separator"></div>
      </div>

      <Suspense fallback={<div> Loading data... </div>}>
        <div className="list_table">
          <table>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '20%' }}>Libellé</th>
              <th style={{ width: '50%' }}>Description</th>
              <th style={{ width: '10%' }}>Prix</th>
              <th style={{ width: '10%' }}>Action</th>
            </tr>
            {Object.values(allServices).map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.libelle}</td>
                <td>{service.description}</td>
                <td>
                  {service.prix_ht + service.prix_ht * service.taux_tva} FCFA
                </td>
                <td>
                  <a href={`/modify_service/${service.id}`}>Editer</a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Suspense>
    </div>
  )
}

export default AdminDashbord
