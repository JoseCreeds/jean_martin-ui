import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import '../InscrireClient/inscrireClient.css'

function InscrireClient() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
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

  const insertUser = () => {
    if (checkEmptyData(formData)) {
      fetch(`https://gesperform.online/public/api/insertbenincontroluser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            navigate('/inscrireClient')
            setError('')
            setFormData({
              email: '',
              nom: '',
              prenom: '',
              adresse: '',
              tel: '',
            })
            setSuccess('Your message has been sent successfully!')
          } else {
            setSuccess('')
            setError('Something is wrong. Refresh the page and try again.')
          }
        })
        .then((data) => {
          console.log(data)

          if (data.errors !== undefined) {
            setError('Aucun champs vide ')
          } else {
            setError(data.statut)
          }
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
            to="/secretaireDashbord"
            className="retour"
          >
            Retour
          </Link>
        </div>
        <div className="contain_img_confirm">
          <img src={Logo_one} className="img_confirm" alt="" />
        </div>

        <h2 style={{ color: '#ffffff', textAlign: 'center' }} className="title">
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
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="con_inpone_rapport"
          placeholder="E-mail"
        />

        <input
          className="con_inpone_rapport"
          type="text"
          value={formData.nom}
          placeholder="Nom"
          onChange={handleInputChange}
          name="nom"
          label="Nom"
        />

        <input
          className="con_inpone_rapport"
          type="text"
          value={formData.prenom}
          placeholder="Prenom"
          onChange={handleInputChange}
          name="prenom"
          label="Prenom"
        />
        <input
          className="con_inpone_rapport"
          type="text"
          value={formData.adresse}
          placeholder="Adresse"
          onChange={handleInputChange}
          name="adresse"
          label="Adresse"
        />

        <input
          className="con_inpone_rapport"
          type="text"
          value={formData.tel}
          placeholder="Téléphone"
          onChange={handleInputChange}
          name="tel"
          label="tel"
        />
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
        />

        <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>

        <button onClick={insertUser} className="send_rapport">
          Modifier
        </button>
      </div>
    </div>
    // </div>
  )
}

export default InscrireClient
