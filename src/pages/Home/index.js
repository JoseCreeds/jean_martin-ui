import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import LogoFooter from '../../img/logo_home_footer.png'

function Home() {
  return (
    <div className="homeWrapper">
      <div className="homeWrapper_subContainer">
        <h1>FacturePro</h1>
        <p className="qfa">FAQ</p>
        <h2>PROGRAMME SPÉCIAL DE SUIVI DE FACTURES </h2>
        <p>
          Une initiative en faveur de la promotion et du développement des
          entreprises par des factures générées et un suivi de paiement par les
          clients
        </p>
        {/* <di.v > */}
        <Link className="home_btn signup" to="/login">
          CONNEXION
        </Link>
        <Link className="home_btn login" to="/login">
          PAYER
        </Link>
        {/* </div> */}

        <div className="footer_container">
          <div className="logo_footer">
            <img src={LogoFooter} alt="" />
          </div>
          <div className="btn_contact">
            <button>CONTACTEZ-NOUS</button>
          </div>
          <div className="icons_content">
            <ion-icon name="logo-whatsapp"></ion-icon>
            <ion-icon name="logo-facebook"></ion-icon>
            <ion-icon name="logo-twitter"></ion-icon>
            <ion-icon name="logo-linkedin"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
