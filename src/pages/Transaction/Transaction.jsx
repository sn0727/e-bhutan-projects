import React from 'react'
import TransactionContent from './content/TransactionContent';
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer"

const Transaction = () => {
  return (
    <React.Fragment>
      <Header />
      <TransactionContent />
      <Footer />
    </React.Fragment>
  )
}

export default Transaction
