import React, { useState } from 'react'
import BackButton from '../../components/Button/BackButton'
import AepsFino from './AepsFino';
import AepsPaytm from './AepsPaytm';
import Footer from '../../components/Common/Footer/Footer';
import Header from '../../components/Common/Header/Header';

const SaveBillOption1 = ['Aeps Fino', 'Aeps Paytm']


const AepsParent = () => {
  const [savePaymentOption, setSavePaymentOption] = useState('Aeps Fino');

  return (
    <>
      <Header />
      <div>
        <div className="comman-container px-4">
          <div className='mobile-recharge'>
            <BackButton link={"home"} />
            <h1>AEPS</h1>
          </div>
          <p className='Select-Biometric-Device'>Select your service provider</p>
          <div className='save-two-btn buttonBtn mt-2 mb-4'>
            {
              SaveBillOption1.map((items, i) => (
                <button key={i} onClick={() => savePaymentOption === items ? setSavePaymentOption('') : setSavePaymentOption(items)} className={`${savePaymentOption === items ? 'active-btn' : 'btn-sucess'}`}> {items} </button>
              ))
            }
          </div>
          <div>
            {savePaymentOption === 'Aeps Fino' ?
              <AepsFino /> :
              <AepsPaytm />
            }
          </div>
        </div >
      </div>
      <Footer />
    </>
  )
}

export default AepsParent

