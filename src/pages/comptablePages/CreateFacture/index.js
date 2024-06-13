import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './createFacture.css'
import html2pdf from 'html2pdf.js'
import QRcode from '../../../img/qrcode.png'

function CreateFacture() {
  const navigate = useNavigate()
  const { facture_id } = useParams()
  const id = localStorage.getItem('user_detail')
  const token = localStorage.getItem('token')
  const [userData, setUserData] = useState(
    useState({
      email: '',
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
    })
  )
  const [facture, setFacture] = useState([])
  const [services, setServices] = useState({})

  //Traitment of Generating facture from html to pdf
  const handleDownloadPDF = () => {
    const element = document.getElementById('content-to-convert')
    const opt = {
      margin: 1,
      filename: 'my_facture.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    html2pdf().from(element).set(opt).save()
  }

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/getfacture/${facture_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFacture(data)
        })
        .catch((error) => {})
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/getuser/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data)
        })
        .catch((error) => {})
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetch(`http://127.0.0.1:8000/api/services_in_facture/${facture_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setServices(data)
        })
        .catch((error) => {})
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [token])

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <button
          style={{ padding: '10px 15px', fontSize: '16px' }}
          onClick={handleDownloadPDF}
        >
          Télécharger en PDF
        </button>
      </div>
      <div id="content-to-convert">
        {facture.map((facture) => (
          <div class="invoice" key={facture.id}>
            <div class="header">
              <h1>Facture</h1>
              <p>Date: {facture.date_facture}</p>
              <p>Numéro facture: {facture.id}</p>
            </div>
            <div class="client-info">
              <h2>Informations Client</h2>
              <p>
                Nom: {userData.nom} {userData.prenom}
              </p>
              <p>Adresse: {userData.adresse}</p>
              <p>Téléphone: {userData.telephone}</p>
              <p>E-mail: {userData.email}</p>
              <p>Indentifiant client: {userData.id}</p>
            </div>
            <div>
              <h2>Services</h2>
              <div class="item"></div>

              {Object.values(services).map((service) => (
                <div key={service.id}>
                  <div class="items">
                    <div class="item">
                      <p>Libellé: {service.description}</p>
                      <p>Prix: {service.prix_unitaire} FCFA</p>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <div
                  class="total"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ marginTop: '20px' }}>
                    <img src={QRcode} alt="qr" width="100px" height="100px" />
                  </div>
                  <div>
                    <h2>Total</h2>
                    <p>TVA: 0.18</p>
                    <p>Total TVA: {facture.montant_tva} FCFA</p>
                    <p>Total à payer: {facture.total_montant} FCFA</p>
                    <p>
                      Statut paiement:{' '}
                      {facture.statut_paiement === 'non_paye'
                        ? 'NON PAYE'
                        : 'PAYE'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateFacture
