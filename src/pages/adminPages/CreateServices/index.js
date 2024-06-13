import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import './createServices.css'

function CreateServices() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    libelle: '',
    description: '',
    prix_ht: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const checkEmptyData = (data) => {
    for (const key in data) {
      if (data[key] === '') {
        setError('No empty fields !')
        return false
      }
    }
    return true
  }

  const createService = () => {
    if (checkEmptyData(formData)) {
      fetch(`http://127.0.0.1:8000/api/service`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            navigate('/create_service')
            setError('')
            setFormData({
              libelle: '',
              description: '',
              prix_ht: '',
            })
            setSuccess('Service creatd !')
          } else {
            setSuccess('')
            setError('Something is wrong. Refresh the page and try again.')
          }
        })
        .then((data) => {
          // console.log(data)
          // if (data.errors !== undefined) {
          //   setError('No empty fields ! ')
          // } else {
          //   setError(data.statut)
          // }
        })
    } else {
      setError('No empty fields !')
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
          Créer un nouveau service
        </h2>
      </div>

      <div className="contain_secondpart_rapport">
        <h3
          style={{
            color: 'green',
            textAlign: 'center',
            marginTop: '32px',
            marginBottom: '6px',
          }}
        >
          {success}
        </h3>
        <input
          type="text"
          name="libelle"
          value={formData.libelle}
          onChange={handleInputChange}
          className="con_inpone_rapport"
          placeholder="Libellé"
        />

        <textarea
          className="con_inpone_rapport"
          type="text"
          value={formData.description}
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
          value={formData.prix_ht}
          placeholder="Prix"
          onChange={handleInputChange}
          name="prix_ht"
          label="prix"
        />
        {/* 
        <input
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

        <button onClick={createService} className="send_rapport">
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default CreateServices
