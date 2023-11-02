import React from 'react'
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer"
import MoneyRequestStatusContent from './content/MoneyRequestStatusContent';

const MoneyRequestStatus = () => {
  return (
    <React.Fragment>
      <Header />
      <MoneyRequestStatusContent />
      <Footer />
    </React.Fragment>
  )
}

export default MoneyRequestStatus
