import React from 'react';
import WalletContent from './content/WalletContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const Wallet = () => {
  return (
    <React.Fragment>
      <Header />
        <WalletContent />
      <Footer />
    </React.Fragment>
  )
}

export default Wallet
