import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './login.css'
import Userlog from '../../img/user.png'
import Logo_one from '../../img/buildings.png'

export default function Login() {
  const [num_matricul, setNumMatricule] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const generateRandomToken = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''

    for (let i = 0; i < 10; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return token
  }

  const checkEmptyData = () => {
    if (password === '' || num_matricul === '') {
      setError('Aucun champs vide')
    } else if (password !== '' && num_matricul !== '') {
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        localStorage.setItem('token', generateRandomToken())

        fetch(`https://gesperform.online/public/api/backend/handletoken`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            //'Content-Type':'application/json'
          },
          body: JSON.stringify({
            num_matricul: num_matricul,
            token: localStorage.getItem('token'),
          }),
        }).then((response) => response.json())
      }

      fetch(`https://gesperform.online/public/api/connectbenincontroluser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num_matricul: num_matricul,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          if (
            data.statut === 'OK' &&
            data.user[0].type_utilisateur === 'client'
          ) {
            window.location.replace('../../clientPages/ClientDasbord')
            localStorage.setItem(
              'employee_detail',
              JSON.stringify(data.user[0])
            )
          } else if (
            data.statut === 'OK' &&
            data.user[0].type_utilisateur === 'client'
          ) {
            window.location.replace('./Acceuilclient')
            localStorage.setItem('client_detail', JSON.stringify(data.user[0]))
          } else if (
            data.statut === 'OK' &&
            data.user[0].type_utilisateur === 'superviseur'
          ) {
            window.location.replace('./superviseur')
            localStorage.setItem('client_detail', JSON.stringify(data.user[0]))
          } else if (
            data.statut === 'OK' &&
            data.user[0].type_utilisateur === 'admin'
          ) {
            window.location.replace('./admindashboard')
            localStorage.setItem('client_detail', JSON.stringify(data.user[0]))
          } else if (data.statut === 'Bad credentials')
            setError('Mauvais identifiants')
        })
    }
  }

  const connectUsers = () => {
    checkEmptyData()
  }

  return (
    <div className="contain_login">
      <div className="contain_firstpart">
        <div
          className="containlogimg"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <img src={Userlog} className="logimg" alt="" />
        </div>

        <h4 className="">
          Bienvenu sur FacturePro, la plateforme pour générer facilement vos
          factures
        </h4>

        <h2 className="">Se connecter</h2>
      </div>

      <div className="contain_secondpart">
        <div className="contain_form">
          <input
            onChange={(e) => {
              setNumMatricule(e.target.value)
            }}
            className="con_inpone"
            type="email"
            placeholder="Veuillez entrer votre numéro d'identitication"
            required
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="con_inpone"
            type="password"
            placeholder="Veuillez entrer votre mot de passe"
            required
          />

          <h3 style={{ color: 'red' }}> {error} </h3>

          <Link
            // onClick={connectUsers}
            style={{ textDecoration: 'none' }}
            to=""
            className="connect_me"
          >
            Se connecter
          </Link>

          <div className="rester_connecter">
            <div className="f_child">
              <input className="" type="checkbox" />
              <p> Rester connecté </p>
            </div>

            <div className="">
              <a
                style={{ textDecoration: 'none', color: ' rgb(212, 166, 14 )' }}
                href="/#"
              >
                Mot de passe oublié
              </a>
            </div>
          </div>
          <div>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
              }}
            >
              Retour sur l'accueil
            </Link>
          </div>
        </div>

        <div className="contain_img" style={{ marginRight: '60px' }}>
          <img src={Logo_one} className={'logoOne'} alt="" width="100%" />
        </div>
      </div>
    </div>
  )
}
