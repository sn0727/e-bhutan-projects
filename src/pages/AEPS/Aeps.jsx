import React, { useEffect, useState } from 'react'
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";
import ImageFingerprint from "../../assets/aeps/fingerprint.png"
import ImageHp from "../../assets/aeps/hp.png"
import ImageMobile from "../../assets/aeps/mobile.png"
import ImageAirtal from "../../assets/operator/airtal.png"
import { SaveBillOption, SaveBillOption1 } from '../../utils/api';
import "./Css/aeps.css"
import { Link } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';

const Aeps = () => {

  const [isActive, setIsActive] = useState('Figure biometric Device');
  const [saveBill, setsaveBill] = useState('');
  const [savePaymentOption, setSavePaymentOption] = useState('');

  const BiometricDeviceOption = [
    {
      image: ImageFingerprint,
      name: "Figure biometric Device"
    },
    // {
    //   image: ImageMobile,
    //   name: "HP Biometric Device"
    // },
    // {
    //   image: ImageHp,
    //   name: "Dell Biometric Device"
    // }
  ]
  // console.log(BiometricDeviceOption)
  return (
    <>
      <Header />
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>AEPS</h1>
        </div>
        <p className='Select-Biometric-Device'>Select Biometric Device</p>
        <div className='Figure-biometric-Device'>
          {
            BiometricDeviceOption.map((items, index) => (
              <div className={`box-style ${items.name === isActive ? 'box-style-active' : " "}`} onClick={() => items.name === isActive ? setIsActive('') : setIsActive(items.name)} keys={index}>
                <div className='Image-Fingerprint-style'>
                  <img src={items.image} alt="Fingerprint" className={`Image-Fingerprint ${items.name === isActive ? "" : "colorActive"}`} />
                </div>
                <p className='p-0 m-0'>{items.name}</p>
              </div>
            ))
          }
        </div>
        <div className='save-two-btn buttonBtn mt-4'>
          {
            SaveBillOption1.map((items, i) => (
              <button key={i} onClick={() => savePaymentOption === items ? setSavePaymentOption('') : setSavePaymentOption(items)} className={`${savePaymentOption === items ? 'active-btn' : 'btn-sucess'}`}> {items} </button>
            ))
          }
          {/* <button key="2" onClick={() => alert("click")} className="btn-sucess"> Deposit </button> */}
        </div>

        <div className="payment_feild">
          <div className='row'>
            <div className='size-col-12 '>
              <div className="Airtel_Payment_Bank">
                <img src={ImageAirtal} alt="Airtal" className='airtal-img-style' />
                <p>Airtel Payment Bank</p>
              </div>
            </div>
          </div>
          <div className="style-row">
            <div className="col-6">
              <div className="enter-mobilenum select-plan mt-2">
                <div className="enter-mobilenum">
                  <div className='set-p-relative'>
                    <input type="number" min="1" max="5" placeholder='Aadhar Number' className='enter-mobile-num bg-white border-cs InputTextColor' />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="enter-mobilenum select-plan mt-2">
                <div className="enter-mobilenum">
                  <div className='set-p-relative'>
                    <input type="number" min="1" max="5" placeholder='Mobile Number' defaultValue={'91 0000 0000 00'} className='enter-mobile-num bg-white border-cs InputTextColor' />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="enter-mobilenum select-plan mt-2">
                <div className="enter-mobilenum">
                  <div className='set-p-relative'>
                    <input type="number" min="1" max="5" placeholder='Amount' defaultValue={'200.00'} className='enter-mobile-num bg-white border-cs InputTextColor' />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 aligin-center">
              <div className='buttonBtn'>
                {SaveBillOption.map((item, i) =>
                  <button key={`savebillbutton${i}`} onClick={() => saveBill === item ? setsaveBill('') : setsaveBill(item)} className={saveBill === item ? 'active-btn' : 'btn-sucess'}>{item}</button>
                )}
                {/* <button className="btn-sucess">Home</button>
                <button className="btn-sucess">Mom</button>
                <button className="btn-sucess">Office</button>
                <button className="btn-sucess">Other</button> */}
              </div>
            </div>
            <div className="col-6 aligin-center">
              <div className="check-condition">
                <input type="checkbox" id='condition' />
                <label htmlFor="condition">I have accepted Aadhar content</label>
              </div>
            </div>
          </div>
          <div className='button-process'>
            <button type='button' cla ssName='button-pro'>
              <Link onClick={() => alert('click')}>Proceed</Link>
            </button>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

export default Aeps
