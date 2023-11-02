import React from 'react'
import ElectricityBillDetailsContent from './content/ElectricityBillDetailsContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const ElectricityBillDetails = () => {
  return (
    <React.Fragment>
      <Header />
      <ElectricityBillDetailsContent />
      <Footer />
    </React.Fragment>
  )
}

export default ElectricityBillDetails
