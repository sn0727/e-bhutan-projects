import React from 'react'
import BroadbandBillContent from './content/BroadbandBillContent'
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const BroadbandBill = () => {
  return (
    <React.Fragment>
      <Header />
      <BroadbandBillContent />
      <Footer />
    </React.Fragment>
  )
}

export default BroadbandBill
