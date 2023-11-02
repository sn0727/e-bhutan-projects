import React from 'react';
import ElectricityBillPaymentContent from './content/ElectricityBillPaymentContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

function ElectricityBillPayment() {
  return (
    <React.Fragment>
      <Header />
      <ElectricityBillPaymentContent />
      <Footer />

    </React.Fragment>
  )
}

export default ElectricityBillPayment
