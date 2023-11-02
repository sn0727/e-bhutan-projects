import React from 'react'
import GasBookingContent from './content/GasBookingContent'
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

function GasBooking() {
  return (
    <React.Fragment>
      <Header />
      <GasBookingContent pageLink={"gas-booking"} />
      <Footer />
    </React.Fragment>
  )
}

export default GasBooking
