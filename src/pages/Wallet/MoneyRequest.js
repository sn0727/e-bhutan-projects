import React from 'react';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
import MoneyRequestContent from './content/MoneyRequestContent';

const MoneyRequest = () => {
  return (
    <React.Fragment>
      <Header />
        <MoneyRequestContent />
      <Footer />
    </React.Fragment>
  )
}

export default MoneyRequest
