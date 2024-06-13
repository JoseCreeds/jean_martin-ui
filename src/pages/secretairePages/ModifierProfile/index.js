import React, { useState, useEffect, Suspense } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import '../InscrireClient/inscrireClient.css'

function ModifierProfile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
  })
  const token = localStorage.getItem('token')
  const { id } = useParams()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/getuser/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token JWT dans l'en-tête Authorization
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data)
          // setIsLoading(false)
        })
        .catch((error) => {})
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token])

  const modifyProfile = () => {
    if (userData) {
      fetch(`http://127.0.0.1:8000/api/updateprofile/${id}`, {
        method: 'PUT',
        headers: {
          // Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/modifyprofil/${id}`)
          setSuccess('User data updated !')
        })
        .catch((error) => {
          // Handle fetch error
          setError('An error occurred while signing in.')
          navigate('/secretaireDashbord')
        })
    }
  }

  return (
    <div className="contain_rapport">
      <div className="contain_rapport_header">
        <div className="contain_nav_confirme">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/secretaireDashbord"
            className="retour"
          >
            Retour
          </Link>
        </div>
        <div className="contain_img_confirm">
          <img src={Logo_one} className="img_confirm" alt="" />
        </div>

        <h2
          style={{
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '10px',
          }}
          className="title"
        >
          Modifier les informations du client
        </h2>
      </div>

      <div className="contain_secondpart_rapport">
        <h3
          style={{
            color: 'green',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          {success}
        </h3>
        <Suspense fallback={<div> Loading data... </div>}>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="con_inpone_rapport"
            placeholder="E-mail"
          />

          <input
            className="con_inpone_rapport"
            type="text"
            value={userData.nom}
            placeholder="Nom"
            onChange={handleInputChange}
            name="nom"
            label="Nom"
          />

          <input
            className="con_inpone_rapport"
            type="text"
            value={userData.prenom}
            placeholder="Prenom"
            onChange={handleInputChange}
            name="prenom"
            label="Prenom"
          />
          <input
            className="con_inpone_rapport"
            type="text"
            value={userData.adresse}
            placeholder="Adresse"
            onChange={handleInputChange}
            name="adresse"
            label="Adresse"
          />

          <input
            className="con_inpone_rapport"
            type="text"
            value={userData.telephone}
            placeholder="Téléphone"
            onChange={handleInputChange}
            name="telephone"
            label="telephone"
          />

          <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>

          <button onClick={modifyProfile} className="send_rapport">
            Modifier
          </button>
        </Suspense>
      </div>
    </div>
    // </div>
  )
}

export default ModifierProfile
