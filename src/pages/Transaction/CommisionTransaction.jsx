import React from 'react'
import CommisionTransactionContent from './content/CommisionTransactionContent';
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer"

const CommisionTransaction = () => {
  return (
    <React.Fragment>
      <Header />
      <CommisionTransactionContent />
      <Footer />
    </React.Fragment>
  )
}

export default CommisionTransaction
