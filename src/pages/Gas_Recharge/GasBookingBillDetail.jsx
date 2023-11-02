import React from 'react'
import GasBookingBillDetailContent from './content/GasBookingBillDetailContent'
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

function GasBookingBillDetail() {
  return (
    <React.Fragment>
      <Header />
      <GasBookingBillDetailContent />
      <Footer />
    </React.Fragment>
  )
}

export default GasBookingBillDetail
