import React from 'react'
import { Link } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import Search_logo from '../../../img/search.svg'
import './comptableDashbord.css'

function ComptableDashbord() {
  return (
    <div>
      <div className="contain_header">
        <div className="nav_bar">
          <div className="contain_button">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to="/"
              className="but decon"
            >
              Deconnexion
            </Link>
          </div>
        </div>

        <div className="contain_title">
          <div className="part_one">
            <h4 className="part_one_one">Bienvenu sur votre dashboard</h4>

            <h3 className="part_one_one p">Gestion des paiements</h3>
            <h3 className="part_one_one p">Gestion des factures</h3>
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

          {/* <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to=""
            className="but"
          >
            Consulter les crtiques sur un agent
          </Link>

          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/getrapport"
            className="but" 
          >
            Consulter un rapport
          </Link> */}
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
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>
              <a href="/#">Editer</a>
            </td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default ComptableDashbord
