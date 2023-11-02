import React from 'react';
import MobileRechargePaymentContent from './content/MobileRechargePaymentContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const MobileRechargePayment = () => {
  return (
    <React.Fragment>
      <Header />
      <MobileRechargePaymentContent />
      <Footer />
    </React.Fragment>
  )
}

export default MobileRechargePayment
