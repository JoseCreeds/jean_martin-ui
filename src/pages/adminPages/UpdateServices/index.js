import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo_one from '../../../img/document.png'

function UpdateServices() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    libelle: '',
    description: '',
    prix: '',
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
      fetch(`http://127.0.0.1:8000/api/service/${id}`, {
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
      fetch(`http://127.0.0.1:8000/api/service/${id}`, {
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
          navigate(`/modify_service/${id}`)
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
            to="/adminDashbord"
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
          Modifier un service
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
        <input
          type="text"
          name="libelle"
          value={userData.libelle}
          onChange={handleInputChange}
          className="con_inpone_rapport"
          placeholder="Libellé"
        />

        <textarea
          className="con_inpone_rapport"
          type="text"
          value={userData.description}
          placeholder="Description"
          onChange={handleInputChange}
          name="description"
          label="description"
          rows="15"
        >
          Description
        </textarea>

        <input
          className="con_inpone_rapport"
          type="text"
          value={userData.prix_ht}
          placeholder="Prix"
          onChange={handleInputChange}
          name="prix_ht"
          label="prix"
        />

        {/* <input
          className="con_inpone_rapport"
          type="text"
          // placeholder="Téléphone"
          // onChange={(e) => {
          //   setTel(e.target.value)
          // }}
          value="1.67"
          readOnly
          name="tel"
          label="tel"
          hidden
        /> */}

        <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>

        <button onClick={modifyProfile} className="send_rapport">
          Modifier
        </button>
      </div>
    </div>
  )
}

export default UpdateServices
