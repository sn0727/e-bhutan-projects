import React, { useState } from 'react'
import LoanForm from './../components/LoanForm'
import Header from '../../../components/Common/Header/Header'
import Footer from '../../../components/Common/Footer/Footer'
import { ApiUrl } from '../../../utils/api'
import SuccessMessage from '../../../components/Common/AminateGIF/SuccessMessage'

const Index = () => {
  const [idComponent, setIdComponent] = useState(1)
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <LoanForm
            pageTitle={'Business Loan'}
            loanServiceAPiRoute={ApiUrl?.personalLoan}
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

export default Index