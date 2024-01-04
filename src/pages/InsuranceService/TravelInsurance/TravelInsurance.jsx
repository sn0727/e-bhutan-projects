import React, { useState } from 'react'
import Footer from '../../../components/Common/Footer/Footer'
import SuccessMessage from '../../../components/Common/AminateGIF/SuccessMessage'
import InsuranceForm from '../FormComponent/InsuranceForm/InsuranceForm'
import { ApiUrl } from '../../../utils/api'
import Header from '../../../components/Common/Header/Header'

const TravelInsurance = () => {
  const [idComponent, setIdComponent] = useState(1)
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <InsuranceForm
            pageTitle={'Travel Insurance'}
            pageRequrest={'TravelInsurance'}
            loanServiceAPiRoute={ApiUrl?.travelInsurance}
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

export default TravelInsurance