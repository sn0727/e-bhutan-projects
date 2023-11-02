import React from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { useLocation } from 'react-router-dom'
import FastagBillDetailsContent from './content/FastagBillDetailsContent'

const FastagBillDetails = () => {
  const location = useLocation();
  const billDetails = location.state;
  return (
    <React.Fragment>
      <Header />
      <FastagBillDetailsContent billDetails={billDetails} />
      <Footer />
    </React.Fragment>
  )
}

export default FastagBillDetails
