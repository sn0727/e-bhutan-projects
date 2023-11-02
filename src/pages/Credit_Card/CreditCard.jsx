import React from 'react'
import CreditCardContent from './content/CreditCardContent'
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const CreditCard = () => {
  return (
    <React.Fragment>
      <Header />
      <CreditCardContent />
      <Footer />
    </React.Fragment>
  )
}

export default CreditCard
