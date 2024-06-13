import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo_one from '../../../img/document.png'
import './generateFacture.css'

function GenerateFacture() {
  const { user_id } = useParams()
  // State pour stocker la liste des services et les services sélectionnés
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/service`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }, [])

  // Gestionnaire d'événements pour mettre à jour les services sélectionnés
  const handleServiceToggle = (serviceId) => {
    const isSelected = selectedServices.includes(serviceId)
    setSelectedServices((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    )
  }

  // Méthode pour créer une ligne de facture
  const createLigneFacture = async () => {
    // Vérifier qu'au moins un service est sélectionné
    if (selectedServices.length === 0) {
      console.error('Veuillez sélectionner au moins un service')
      setError('Veuillez sélectionner au moins un service')
      return
    }

    // Créer un tableau pour stocker les détails de chaque service sélectionné
    const lignesFacture = selectedServices
      .map((serviceId) => {
        const selectedService = services.find(
          (service) => service.id === serviceId
        )
        if (!selectedService) {
          console.error('Service non trouvé pour id:', serviceId)
          return null
        }
        return {
          description: selectedService.libelle,
          quantite: 1,
          prix_unitaire: selectedService.prix_ht,
          taux_tva: selectedService.taux_tva,
        }
      })
      .filter((ligneFacture) => ligneFacture !== null) // Filtrer les lignes de facture nulles

    // console.log(lignesFacture)

    try {
      // Envoyer les lignes de facture à l'API Laravel pour enregistrement

      const response = await fetch(
        `http://127.0.0.1:8000/api/generatefacture`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user_id,
            ligne_factures: lignesFacture,
          }),
        }
      )

      if (response.ok) {
        setSuccess('Facture créée avec succès')
        setError('')

        setTimeout(() => {
          window.location.reload()
        }, 1200)
      } else {
        console.error(
          'Erreur lors de la création de la facture :',
          response.statusText
        )
        setSuccess('')
        setError('Erreur lors de la création de la facture.')
      }
    } catch (error) {
      console.error('Erreur lors de la création de la facture :', error)
      setSuccess('')
      setError('Erreur lors de la création de la facture.')
    }
  }

  return (
    <div className="contain_rapport">
      <div className="contain_rapport_header">
        <div className="contain_nav_confirme">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/comptableDashbord"
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
          Créer facture
        </h2>
      </div>

      <div className="list_facture">
        <h2 className="list_facture_title">Liste des Services</h2>
        <p>Selectionnez des services pour créer une facture pour ce client</p>
        <div className="list_facture_container">
          {services.map((service) => (
            <div className="list_facture_item" key={service.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                  id={service.id}
                />
                {service.libelle} - {service.prix_ht} FCFA
              </label>
            </div>
          ))}
        </div>

        <div
          style={{
            color: 'green',
            // textAlign: 'center',
            marginTop: '25px',
          }}
        >
          {success}
        </div>

        <div style={{ color: 'red', marginTop: '25px' }}>{error}</div>

        <button
          className="send_rapport btn_facture"
          onClick={() => createLigneFacture(selectedServices)}
        >
          Créer Facture
        </button>
      </div>
    </div>
  )
}

export default GenerateFacture
