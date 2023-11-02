import React from 'react';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
import AddWalletContent from './content/AddWalletContent';

const AddWallet = () => {
  return (
    <React.Fragment>
      <Header />
        <AddWalletContent />
      <Footer />
    </React.Fragment>
  )
}

export default AddWallet
