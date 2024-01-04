import React, { useEffect, useState } from 'react'
import Header from '../../../components/Common/Header/Header'
import Footer from '../../../components/Common/Footer/Footer'
import { ApiUrl } from '../../../utils/api'
import SuccessMessage from '../../../components/Common/AminateGIF/SuccessMessage'
import InsuranceForm from '../FormComponent/InsuranceForm/InsuranceForm'
import { useLocation } from 'react-router-dom'

const HealthInsurance = () => {
  const [idComponent, setIdComponent] = useState(1)
  
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <InsuranceForm
            pageTitle={'Health Insurance'}
            pageRequrest={'HealthInsurance'}
            loanServiceAPiRoute={ApiUrl?.healthInsurance}
            setIdComponent={setIdComponent}
          />
        )
      }
      {
        (idComponent === 2) && (
          <SuccessMessage />
        )
      }
      <Footer />
    </>
  )
}

export default HealthInsurance