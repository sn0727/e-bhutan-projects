import React from 'react';
import FastagRechargeContent from './content/FastagRechargeContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const FastagRecharge = () => {
  return (
    <React.Fragment>
      <Header />
      <FastagRechargeContent />
      <Footer />
    </React.Fragment>
  )
}

export default FastagRecharge
