import React from 'react'
import MunicipalTaxContent from './content/MunicipalTaxContent'
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const MunicipalTax = () => {
  return (
    <React.Fragment>
      <Header />
      <MunicipalTaxContent />
      <Footer />
    </React.Fragment>
  )
}

export default MunicipalTax
