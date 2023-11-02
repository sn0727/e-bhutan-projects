import React from 'react';
import MobileRechargeBillDetailsContent from './content/MobileRechargeBillDetailsContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const MobileRechargeBillDetails = () => {
  return (
    <React.Fragment>
      <Header />
      <MobileRechargeBillDetailsContent />
      <Footer />
    </React.Fragment>
  )
}

export default MobileRechargeBillDetails
