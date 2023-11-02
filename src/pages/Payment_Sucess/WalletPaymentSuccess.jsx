import React from 'react'
import WalletPaymentSuccessContent from './content/WalletPaymentSuccessContent'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'

const WalletPaymentSuccess = () => {
  return (
    <React.Fragment>
      <Header />
      <WalletPaymentSuccessContent />
      <Footer />
    </React.Fragment>
  )
}

export default WalletPaymentSuccess
