import React from 'react'
import WalletTransactionContent from './content/WalletTransactionContent';
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer"

const WalletTransaction = () => {
  return (
    <React.Fragment>
      <Header />
      <WalletTransactionContent />
      <Footer />
    </React.Fragment>
  )
}

export default WalletTransaction
