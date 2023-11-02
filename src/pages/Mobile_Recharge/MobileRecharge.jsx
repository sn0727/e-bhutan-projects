import React from 'react'
import MobileRechargeContent from './content/MobileRechargeContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const MobileRecharge = () => {

  return (
    <React.Fragment>
        <Header />
        <MobileRechargeContent />
        <Footer />
    </React.Fragment>
  )
}

export default MobileRecharge