import React from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { useLocation } from 'react-router-dom'
import DTHBillDetailsContent from './content/DTHBillDetailsContent'

const DTHBillDetails = () => {
  const location = useLocation();
  const billDetails = location.state;
  return (
    <React.Fragment>
      <Header />
      <DTHBillDetailsContent billDetails={billDetails} />
      <Footer />
    </React.Fragment>
  )
}

export default DTHBillDetails
