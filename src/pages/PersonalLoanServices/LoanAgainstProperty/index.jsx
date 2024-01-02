import React, { useState } from 'react'
import Header from '../../../components/Common/Header/Header'
import Footer from '../../../components/Common/Footer/Footer'
import LoanForm from './../components/LoanForm'
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
            pageTitle={'Loan Against Property'}
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