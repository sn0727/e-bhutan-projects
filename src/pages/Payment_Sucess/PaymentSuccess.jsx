import React, { useEffect } from 'react'
import PaymentSuccessContent from './content/PaymentSuccessContent'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const billDetails = location.state;


  const navigateToAnotherRoute = () => {
    console.log('navigateToAnotherRoute');
    navigate('/home');

  }
  useEffect(() => {
    !billDetails && navigate('/home')

    const handlePopstate = () => {
      // Prevent the default "back" behavior
      // Navigate to another route instead
      navigateToAnotherRoute();
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
  return (
    <React.Fragment>
      <Header />
      <PaymentSuccessContent billDetails={billDetails} />
      <Footer />
    </React.Fragment>
  )
}

export default PaymentSuccess
