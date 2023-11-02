import React from 'react'
import BillDetailContent from './content/BillDetailContent'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { useLocation } from 'react-router-dom'

const BillDetails = () => {
  const location = useLocation();
  const billDetails = location.state;
  console.log(billDetails, "betails");
  return (
    <React.Fragment>
      <Header />
      <BillDetailContent billDetails={billDetails} />
      <Footer />
    </React.Fragment>
  )
}

export default BillDetails
