import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './login.css'
import Userlog from '../../img/user.png'
import Logo_one from '../../img/buildings.png'

export default function Login() {
  const [email, setEmail] = useState('')
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
    if (password === '' || email === '') {
      setError('Aucun champs vide')
    } else if (password !== '' && email !== '') {
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        localStorage.setItem('token', generateRandomToken())

        fetch(`http://127.0.0.1:8000/api/handletoken`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            //'Content-Type':'application/json'
          },
          body: JSON.stringify({
            email: email,
            token: localStorage.getItem('token'),
          }),
        }).then((response) => response.json())
      }

      fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          if (data.statut === 'OK' && data.user.typeofuser === 'client') {
            window.location.replace('/clientdashbord')
            localStorage.setItem('user_detail', JSON.stringify(data.user.id))
          } else if (
            data.statut === 'OK' &&
            data.user.typeofuser === 'secretaire'
          ) {
            window.location.replace('/secretaireDashbord')
            localStorage.setItem('user_detail', JSON.stringify(data.user.id))
          } else if (
            data.statut === 'OK' &&
            data.user.typeofuser === 'comptable'
          ) {
            window.location.replace('/comptableDashbord')
            localStorage.setItem('user_detail', JSON.stringify(data.user.id))
          } else if (data.statut === 'OK' && data.user.typeofuser === 'admin') {
            window.location.replace('/adminDashbord')
            localStorage.setItem('user_detail', JSON.stringify(data.user.id))
          } else {
            setError('Mauvais identifiants')
          }
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

        <h2 className="" style={{ marginBottom: '7px' }}>
          Se connecter
        </h2>
      </div>

      <div className="contain_secondpart">
        <div className="contain_form">
          <input
            onChange={(e) => {
              setEmail(e.target.value)
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
            onClick={connectUsers}
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
