import React from 'react'
import CreditCardDetailContent from './content/CreditCardDetailContent'
import { useLocation } from 'react-router-dom';

const CreditCardDetail = () => {
  const location = useLocation();
  const billDetails = location.state;
  return (
    <div>
      <CreditCardDetailContent billDetails={billDetails} />
    </div>
  )
}

export default CreditCardDetail
