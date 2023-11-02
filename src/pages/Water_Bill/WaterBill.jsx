import React from 'react';
import WaterBillContent from './content/WaterBillContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const WaterBill = () => {
  return (
    <React.Fragment>
        <Header />
        <WaterBillContent />
        <Footer />
    </React.Fragment>
  )
}

export default WaterBill
