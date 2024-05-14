import React from 'react'
import { Link } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import './adminDashbord.css'
import Meeting from '../../../img/meeting.png'

function AdminDashbord() {
  return (
    <div>
      <div className="contain_header">
        <div className="nav_bar">
          <div className="contain_button">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to="/"
              className="btn decon"
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

      <p>hi</p>
    </div>
  )
}

export default AdminDashbord
