import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Logo_one from '../../img/document.png'
import Logo_one from '../../../img/document.png'
import Search_logo from '../../../img/search.svg'
import './secretaireDashbord.css'

import { Suspense } from 'react'

function SecretaireDashbord() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [allUsers, setUsers] = useState({})

  const logout = () => {
    localStorage.clear()
  }

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/getallusers`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token JWT dans l'en-tête Authorization
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data)
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

            <h3 className="part_one_one p">Gestion des clients</h3>
          </div>

          <div className="part_two">
            <img src={Logo_one} className="home_img" alt="" />
          </div>
        </div>

        <div className="contain_menus">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/insertClient"
            className="but"
          >
            Inscrire un client
          </Link>
        </div>
      </div>

      <div className="search_container">
        <input type="text" placeholder="Rechercher..." />
        <img
          src={Search_logo}
          alt=""
          height="30px"
          width="30px"
          className="search_img"
        />
      </div>
      {/* <div className="search_bar"></div> */}
      <Suspense fallback={<div> Loading data... </div>}>
        <div className="list_table">
          <table>
            <tr>
              <th>ID</th>
              <th>E-mail</th>
              <th>Nom</th>
              <th>Prénoms</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
            {Object.values(allUsers).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.adresse}</td>
                <td>{user.telephone}</td>
                <td>
                  <a href={`/modifyprofil/${user.id}`}>Editer</a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Suspense>
    </div>
  )
}

export default SecretaireDashbord
