
import React, { useEffect, useState } from 'react'
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";
import ImageFingerprint from "../../assets/aeps/fingerprint.png"
import ImageHp from "../../assets/aeps/hp.png"
import ImageMobile from "../../assets/aeps/mobile.png"
import ImageAirtal from "../../assets/operator/airtal.png"
import { APIRequest, ApiUrl, SaveBillOption, SaveBillOption1, StatelistCode } from '../../utils/api';
import "./Css/aeps.css"
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


import $ from 'jquery';
import { Autocomplete, TextField } from '@mui/material';
import { ValidateAadhaar, ValidatePan, ValidatePhone, isAddressValid } from '../../utils/validation';
import FingerPrintDevice from '../../utils/FingerPrintDevice';

let url, finalUrl, MethodCapture, MethodInfo, OldPort, DString, device, thrownError

// Select Biometric Device tab component
const SelectBiometricDeviceTab = ({ savePaymentOption, setSavePaymentOption }) => {
  const [isActive, setIsActive] = useState('Figure biometric Device');
  const [saveBill, setsaveBill] = useState('');
  const BiometricDeviceOption = [
    {
      image: ImageFingerprint,
      name: "Figure biometric Device"
    },
    {
      image: ImageMobile,
      name: "HP Biometric Device"
    },
    {
      image: ImageHp,
      name: "Dell Biometric Device"
    }
  ]
  return (
    <>
      <div className='mobile-recharge'>
        <BackButton link={"home"} />
        <h1>AEPS</h1>
      </div>
      {/* <p className='Select-Biometric-Device'>Select Biometric Device</p> */}
      {/* <div className='Figure-biometric-Device'>
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
      </div> */}
      <p className='Select-Biometric-Device'>Select your service</p>
      <div className='save-two-btn buttonBtn mt-2 mb-4'>
        {
          SaveBillOption1.map((items, i) => (
            <button key={i} onClick={() => savePaymentOption === items ? setSavePaymentOption('') : setSavePaymentOption(items)} className={`${savePaymentOption === items ? 'active-btn' : 'btn-sucess'}`}> {items} </button>
          ))
        }
      </div>
    </>
  )
}

// merchant on boarding componen
export const MarchantOnBoarding = ({ children, getTokenData, setStateUpdate }) => {
  const [isLoading, setIsloading] = useState(false);
  const [getUrl, setGetUrl] = useState({});
  const [inputFeildValue, setInputFeildValue] = useState({
    city: "",
    pannumber: getTokenData?.panNo,
    address: getTokenData?.address
  })

  // i am getting input feild value.
  const inputHandle = (event) => {
    setInputFeildValue({ ...inputFeildValue, [event.target.name]: event.target.value })
  }


  // Get state code
  const GetStateCode = (data) => {
    const state = StatelistCode.filter((item) => item.State === data)
    return state[0].Abbreviation
  }

  // Merchant On boarding api hit.
  const MerchantBoarding = async () => {

    if (inputFeildValue?.city?.length < 3) {
      toast.error('Please enter valid city!')
      return true
    }
    if (!isAddressValid(inputFeildValue?.address)) {
      toast.error('Address Should contain minimum 3 word!')
      return true
    }
    if (!ValidatePan(inputFeildValue?.pannumber)) {
      toast.error('Please enter valid pan no!')
      return true
    }


    setIsloading(true)

    let location_ip = await sessionStorage.getItem('location_ip')
    let location_latitude = await sessionStorage.getItem('location_latitude')
    let location_longitude = await sessionStorage.getItem('location_longitude')

    if (!location_ip || !location_latitude || !location_longitude) {
      alert('please enable location permission in your browser')
      setIsloading(false)
      return true;
    }
    const stateCode = GetStateCode(getTokenData?.state);
    let config = {
      url: ApiUrl?.newOnboarding,
      method: 'post',
      body: {
        merchantmobilenumber: getTokenData?.contact,
        latitude: location_latitude,
        longitude: location_longitude,
        submerchantid: getTokenData?.partnerId,
        statecode: stateCode,
        city: inputFeildValue?.city,
        merchant_name: getTokenData?.name,
        address: inputFeildValue?.address,
        pannumber: inputFeildValue?.pannumber,
        pincode: getTokenData?.postalCode,
        pipe: 'bank5',
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== de de')
        toast.success(res?.message)
        // window.location.reload()
        // setStateUpdate('2')
        setIsloading(false)
      },
      err => {
        toast.success(err?.message)
        setIsloading(false)
      }
    )
  }


  return (
    <div className="comman-container px-4">
      {/* {children} */}
      <div className='mobile-recharge'>
        <BackButton link={"home"} />
        <h1>AEPS Onboarding</h1>
      </div>
      {/* <p className='Select-Biometric-Device'>Select Biometric Device</p> */}
      <div className="payment_feild">
        <div className="style-row">
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="city"
                    onChange={inputHandle}
                    placeholder='City'
                    value={inputFeildValue?.city}
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="address"
                    onChange={inputHandle}
                    placeholder='Address'
                    value={inputFeildValue?.address}
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="pannumber"
                    value={inputFeildValue?.pannumber}
                    onChange={inputHandle}
                    placeholder='Pan number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6 aligin-center">
            <div className="check-condition">
              <input type="checkbox" id='condition' />
              <label htmlFor="condition">I have accepted Aadhar content</label>
            </div>
          </div> */}
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro'>
            <Link onClick={() => MerchantBoarding()}>
              {
                isLoading ? <div>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </div> : 'Proceed'
              }
            </Link>
          </button>
        </div>
      </div>
    </div >
  )
}

// registration on boarding componen
export const RegistrationOnBoarding = ({ children, getTokenData, invoiceNo, }) => {
  const [isLoading, setIsloading] = useState(false);
  const [FingerData, setFingerData] = useState('')
  const [getLocationData, setGetLocationData] = useState({});

  // get current date and time
  const date = new Date();
  let formateDate = moment(date).format('yyyy-DD-mm H:mm:ss');

  const [inputFeildValue, setInputFeildValue] = useState({
    adhaarnumber: "",
    mobilenumber: ""
  })

  // i am getting input feild value. 
  const inputHandle = (event) => {
    setInputFeildValue({ ...inputFeildValue, [event.target.name]: event.target.value })
  }

  // Reset state after submit
  const ResetState = () => {
    setInputFeildValue({
      adhaarnumber: "",
      mobilenumber: "",
    })
    setFingerData('')
  }

  // Merchant On boarding api hit.
  const MerchantBoarding = async () => {
    setIsloading(true)
    let location_ip = await sessionStorage.getItem('location_ip')
    let location_latitude = await sessionStorage.getItem('location_latitude')
    let location_longitude = await sessionStorage.getItem('location_longitude')

    if (!location_ip || !location_latitude || !location_longitude) {
      alert('please enable location permission in your browser')
      setIsloading(false)
      return true;
    }

    let config = {
      url: ApiUrl?.aepsRegistration,
      method: 'post',
      body: {
        "accessmodetype": "SITE",
        "adhaarnumber": inputFeildValue?.adhaarnumber,
        "mobilenumber": inputFeildValue?.mobilenumber,
        "latitude": location_latitude,
        "longitude": location_longitude,
        "referenceno": invoiceNo,
        "submerchantid": getTokenData?.partnerId,
        "timestamp": formateDate,
        "data": FingerData,
        "ipaddress": location_ip,
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res)
        toast.success(res?.message)
        ResetState()
        setIsloading(false)
      },
      err => {
        toast.error(err?.message)
        ResetState()
        setIsloading(false)
      }
    )
  }


  function discoverAvdm() {
    const Data = FingerPrintDevice()
    if (Data) {
      setFingerData(Data)
    }
  }

  useEffect(() => {
    setInputFeildValue(
      {
        adhaarnumber: getTokenData?.aadharNo,
        mobilenumber: getTokenData?.contact,
      }
    )
  }, [getTokenData])



  return (
    <div className="comman-container px-4">
      {/* {children} */}

      <div className='mobile-recharge'>
        <BackButton link={"home"} />
        <h1>AEPS Registration</h1>
      </div>

      <div className="payment_feild">
        <div className="style-row">
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="mobilenumber"
                    onChange={inputHandle}
                    placeholder='Mobile Number'
                    value={inputFeildValue?.mobilenumber}
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="adhaarnumber"
                    value={inputFeildValue?.adhaarnumber}
                    onChange={inputHandle}
                    placeholder='Aadhaar number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='button-process'>
          {FingerData ? <button type='button' className='button-pro'>
            <Link onClick={() => MerchantBoarding()}>
              {
                isLoading ? <div>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </div> : 'Proceed'
              }
            </Link>
            {/* <button type="button" className='button-pro' onClick={() => discoverAvdm()}>CHECK DEVICE</button> */}

          </button> :
            <div className='Figure-biometric-Device' onClick={() => discoverAvdm()}>
              <div className={`box-style box-style-active m-auto`} >
                <div className='Image-Fingerprint-style'>
                  <img src={ImageFingerprint} alt="Fingerprint" className={`Image-Fingerprint `} />
                </div>
                <p className='p-0 m-0'>Scan to registration</p>
              </div>
            </div>}
          <input id="method" type="hidden" value="" />
          <input id="info" type="hidden" value="" />
          <input type="hidden" name="txtWadh" id="txtWadh" />

        </div>
      </div>
    </div >
  )
}
// Authentication on boarding componen
export const AepsAuthentication = ({ children, getTokenData, invoiceNo, setStateUpdate }) => {
  const [isLoading, setIsloading] = useState(false);
  const [FingerData, setFingerData] = useState('')

  // get current date and time
  const date = new Date();
  let formateDate = moment(date).format('yyyy-DD-mm H:mm:ss');

  const [inputFeildValue, setInputFeildValue] = useState({
    adhaarnumber: "",
    mobilenumber: ""
  })

  // i am getting input feild value. 
  const inputHandle = (event) => {
    setInputFeildValue({ ...inputFeildValue, [event.target.name]: event.target.value })
  }


  // Reset state after submit
  const ResetState = () => {
    setInputFeildValue({
      adhaarnumber: "",
      mobilenumber: "",
    })
    setFingerData('')
  }


  // Merchant On boarding api hit.
  const MerchantBoarding = async () => {

    if (!ValidateAadhaar(inputFeildValue?.adhaarnumber)) {
      toast.error('Please enter valid aadhaar no!')
      return true
    }
    if (!ValidatePhone(inputFeildValue?.mobilenumber)) {
      toast.error('Please enter valid mobile no!')
      return true
    }

    setIsloading(true)
    let location_ip = await sessionStorage.getItem('location_ip')
    let location_latitude = await sessionStorage.getItem('location_latitude')
    let location_longitude = await sessionStorage.getItem('location_longitude')

    if (!location_ip || !location_latitude || !location_longitude) {
      alert('please enable location permission in your browser')
      setIsloading(false)
      return true;
    }

    let config = {
      url: ApiUrl?.twoFactorAuthLogin,
      method: 'post',
      body: {
        "accessmodetype": "SITE",
        "adhaarnumber": inputFeildValue?.adhaarnumber,
        "mobilenumber": inputFeildValue?.mobilenumber,
        "latitude": location_latitude,
        "longitude": location_longitude,
        "referenceno": invoiceNo,
        "submerchantid": getTokenData?.partnerId,
        "timestamp": formateDate,
        "data": FingerData,
        "ipaddress": '106.210.102.217',
        // "ipaddress": location_ip,
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res)
        toast.success(res?.message)
        ResetState()
        setStateUpdate('1')
        // window.location.reload()
        setIsloading(false)
      },
      err => {
        toast.error(err?.message)
        ResetState()
        setIsloading(false)
      }
    )
  }


  function discoverAvdm() {
    const Data = FingerPrintDevice()
    if (Data) {
      setFingerData(Data)
    }
  }

  useEffect(() => {
    setInputFeildValue(
      {
        adhaarnumber: getTokenData?.aadharNo,
        mobilenumber: getTokenData?.contact,
      }
    )
  }, [getTokenData])


  return (
    <div className="comman-container px-4">
      {/* {children} */}

      <div className='mobile-recharge'>
        <BackButton link={"home"} />
        <h1>AEPS Authentication</h1>
      </div>

      <div className="payment_feild">
        <div className="style-row">
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="mobilenumber"
                    onChange={inputHandle}
                    placeholder='Mobile Number'
                    value={inputFeildValue?.mobilenumber}
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-2">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="adhaarnumber"
                    value={inputFeildValue?.adhaarnumber}
                    onChange={inputHandle}
                    placeholder='Aadhaar number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6 aligin-center">
            <div className="check-condition">
              <input type="checkbox" id='condition' />
              <label htmlFor="condition">I have accepted Aadhar content</label>
            </div>
          </div> */}
        </div>
        <div className='button-process'>
          {FingerData ? <button type='button' className='button-pro'>
            <Link onClick={() => MerchantBoarding()}>
              {
                isLoading ? <div>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </div> : 'Proceed'
              }
            </Link>
            {/* <button type="button" className='button-pro' onClick={() => discoverAvdm()}>CHECK DEVICE</button> */}

          </button> :
            <div className='Figure-biometric-Device' onClick={() => discoverAvdm()}>
              <div className={`box-style box-style-active m-auto`} >
                <div className='Image-Fingerprint-style'>
                  <img src={ImageFingerprint} alt="Fingerprint" className={`Image-Fingerprint `} />
                </div>
                <p className='p-0 m-0'>Scan to authentication</p>
              </div>
            </div>}
          <input id="method" type="hidden" value="" />
          <input id="info" type="hidden" value="" />
          <input type="hidden" name="txtWadh" id="txtWadh" />

        </div>
      </div>
    </div >
  )
}


export const AepsServices = ({ children, getTokenData, invoiceNo, savePaymentOption, setSavePaymentOption }) => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [FingerData, setFingerData] = useState('')

  // get current date and time
  const date = new Date();
  let formateDate = moment(date).format('yyyy-DD-mm H:mm:ss');

  const [inputFeildValue, setInputFeildValue] = useState({
    adhaarnumber: getTokenData?.aadharNo,
    mobilenumber: getTokenData?.contact,
    amount: "",
    pannumber: getTokenData?.panNo,
    city: ''
  })
  const [BankList, setBankList] = useState([]);
  const [Bank, setBank] = useState({ bankName: '' })

  // i am getting input feild value. 
  const inputHandle = (event) => {
    setInputFeildValue({ ...inputFeildValue, [event.target.name]: event.target.value })
  }

  const GetBankList = () => {
    setIsloading(true)
    let config = {
      url: ApiUrl?.aepsGetBankList,
      method: 'get',
    }
    APIRequest(
      config,
      res => {
        console.log(res)
        setBankList(res?.data)
        setIsloading(false)
      },
      err => {
        toast.error(err?.message)
        setIsloading(false)
      }
    )
  }


  const ResetState = () => {
    setInputFeildValue({
      adhaarnumber: "",
      mobilenumber: "",
      amount: '',
      pannumber: '',
      city: ''
    })
    setFingerData('')
    setBank({ bankName: '' })
    setSavePaymentOption('')
  }

  // Get state code
  const GetStateCode = (data) => {
    const state = StatelistCode.filter((item) => item.State === data)
    return state[0].Abbreviation
  }


  // Withdraw and deposit api hit.
  // const MerchantBoarding = () => {
  //   navigate('/aeps-success', {
  //     state: {
  //       data: {
  //         "error": false,
  //         "message": "Transaction is successful",
  //         "data": {
  //             "status": true,
  //             "message": "Transaction is successful",
  //             "ackno": 59,
  //             "amount": 0,
  //             "balanceamount": "AVL.BA",
  //             "bankrrn": "208113393345",
  //             "bankiin": "990320",
  //             "ministatement": null,
  //             "ministatementlist": {
  //                 "npcidata": "14/05/19 DR       125.00            14/05/19 DR       120.00            14/05/19 DR       125.00            14/05/19 DR       120.00            14/05/19 DR       110.00            13/05/19 DR       110.00            13/05/19 DR       118.00            13/05/19 DR       117.00            13/05/19 DR       112.00            AVL.BAL           155544           "
  //             },
  //             "response_code": 1,
  //             "errorcode": "AEPS-NPCI-00",
  //             "clientrefno": 100004635,
  //             "last_aadhar": "4234",
  //             "name": "Rizwan "
  //         }
  //     }
  //     }
  //   })
  // }
  const MerchantBoarding = async () => {



    if (!savePaymentOption) {
      toast.error('Please select your service!')
      return true
    }
    if (!Bank?.bankName) {
      toast.error('Please select your bank!')
      return true
    }
    if (!ValidateAadhaar(inputFeildValue?.adhaarnumber)) {
      toast.error('Please enter valid aadhaar no!')
      return true
    }
    if (!ValidatePhone(inputFeildValue?.mobilenumber)) {
      toast.error('Please enter valid mobile no!')
      return true
    }
    if (!ValidatePan(inputFeildValue?.pannumber)) {
      toast.error('Please enter valid pan no!')
      return true
    }
    if (inputFeildValue?.city?.length < 3) {
      toast.error('Please enter valid city!')
      return true
    }
    if (savePaymentOption === 'Withdrawal' || savePaymentOption === 'Deposit') {
      if (inputFeildValue?.amount < 100) {
        toast.error('Minimum amount limit 100!')
        return true
      }
    }



    setIsloading(true)
    let location_ip = await sessionStorage.getItem('location_ip')
    let location_latitude = await sessionStorage.getItem('location_latitude')
    let location_longitude = await sessionStorage.getItem('location_longitude')

    if (!location_ip || !location_latitude || !location_longitude) {
      alert('please enable location permission in your browser')
      setIsloading(false)
      return true;
    }
    const stateCode = GetStateCode(getTokenData?.state);
    let url, transcationtype;
    if (savePaymentOption === 'Withdrawal') {
      transcationtype = 'CW'
      url = ApiUrl?.withdrawal
    } else if (savePaymentOption === 'Deposit') {
      transcationtype = 'M'
      url = ApiUrl?.aepsDeposit
    } else if (savePaymentOption === 'Balance Enquiry') {
      transcationtype = 'BE'
      url = ApiUrl?.balanceEnquiry
    } else if (savePaymentOption === 'Mini Statement') {
      transcationtype = 'MS'
      url = ApiUrl?.getMiniStatement
    }
    let config = {
      url: url,
      method: 'post',
      body: {

        'merchant_name': getTokenData?.name,
        'pannumber': inputFeildValue?.pannumber,
        'address': getTokenData?.address,
        'city': inputFeildValue?.city,
        'pincode': getTokenData?.postalCode,
        'statecode': stateCode,
        'merchantmobilenumber': getTokenData?.contact,
        'mobilenumber': inputFeildValue?.mobilenumber,
        'accessmodetype': 'SITE',
        // 'ipaddress': location_ip,
        "ipaddress": '106.210.102.217',
        'adhaarnumber': inputFeildValue?.adhaarnumber,
        'latitude': location_latitude,
        'longitude': location_longitude,
        'referenceno': invoiceNo,
        'nationalbankidentification': Bank.iinno,
        'pipe': 'bank5',
        'transcationtype': transcationtype,
        'requestremarks': 'Ok',
        'submerchantid': getTokenData?.partnerId,
        'data': FingerData,
        'timestamp': formateDate,
        'amount': savePaymentOption === 'Withdrawal' || savePaymentOption === 'Deposit' ? inputFeildValue?.amount : null
      },

    }
    APIRequest(
      config,
      res => {
        console.log(res)
        toast.success(res?.message)
        ResetState()
        setIsloading(false)
        navigate('/aeps-success', { state: { data: res?.data } })
      },
      err => {
        toast.error(err?.message)
        ResetState()
        setIsloading(false)
      }
    )
  }

  function discoverAvdm() {
    const Data = FingerPrintDevice()
    if (Data) {
      setFingerData(Data)
    }
  }


  useEffect(() => {
    GetBankList()
  }, [])
  useEffect(() => {
    setInputFeildValue(
      {
        adhaarnumber: getTokenData?.aadharNo,
        mobilenumber: getTokenData?.contact,
        amount: "",
        pannumber: getTokenData?.panNo,
        city: ''
      }
    )
  }, [getTokenData])



  return (
    <div className="comman-container px-4">
      {children}

      <div className="payment_feild">
        <div className="style-row">
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <Autocomplete
                value={Bank}
                getOptionLabel={(Options) => Options.bankName}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setBank(newValue);
                }}
                size='sm'
                id="controllable-states-demo"
                options={BankList}
                renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select bank" />}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="mobilenumber"
                    onChange={inputHandle}
                    placeholder='Mobile Number'
                    value={inputFeildValue?.mobilenumber}
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="adhaarnumber"
                    value={inputFeildValue?.adhaarnumber}
                    onChange={inputHandle}
                    placeholder='Aadhaar number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="pannumber"
                    value={inputFeildValue?.pannumber}
                    onChange={inputHandle}
                    placeholder='Pan number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="city"
                    value={inputFeildValue?.city}
                    onChange={inputHandle}
                    placeholder='City'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
            </div>
          </div>
          {(savePaymentOption === 'Withdrawal' || savePaymentOption === 'Deposit') ? <div className="col-6">
            <div className="enter-mobilenum select-plan mt-5">
              <div className="enter-mobilenum">
                <div className='set-p-relative'>
                  <input type="text" min="1" max="5"
                    name="amount"
                    value={inputFeildValue?.amount}
                    onChange={inputHandle}
                    placeholder='Enter amount'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                  <span className='mt-1'>Minimum amount : 100</span>
                </div>
              </div>
            </div>
          </div> : null}
          {/* <div className="col-6 aligin-center">
            <div className="check-condition">
              <input type="checkbox" id='condition' />
              <label htmlFor="condition">I have accepted Aadhar content</label>
            </div>
          </div> */}
        </div>
        <div className='button-process'>
          {FingerData ? <button type='button' className='button-pro'>
            <Link onClick={() => MerchantBoarding()}>
              {
                isLoading ? <div>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </div> : 'Proceed'
              }
            </Link>
            {/* <button type="button" className='button-pro' onClick={() => discoverAvdm()}>CHECK DEVICE</button> */}

          </button> :
            <div className='Figure-biometric-Device'
              onClick={() => discoverAvdm()}
            // onClick={() => MerchantBoarding()}
            >
              <div className={`box-style box-style-active m-auto`} >
                <div className='Image-Fingerprint-style'>
                  <img src={ImageFingerprint} alt="Fingerprint" className={`Image-Fingerprint `} />
                </div>
                <p className='p-0 m-0'>Scan Finger</p>
              </div>
            </div>}
          <input id="method" type="hidden" value="" />
          <input id="info" type="hidden" value="" />
          <input type="hidden" name="txtWadh" id="txtWadh" />

        </div>
      </div>
    </div >
  )
}

// this is perent component
const Aeps = () => {
  const [getTokenData, setGetTokenData] = useState({});
  const [invoiceNo, setInvoiceNo] = useState({});
  const [savePaymentOption, setSavePaymentOption] = useState('');
  const [StateUpdate, setStateUpdate] = useState('')


  // getting details from the user token
  const GetByToken = () => {
    let config = {
      url: ApiUrl.userGetByToken,
      method: "get"
    }
    APIRequest(
      config,
      res => {
        setGetTokenData(res?.user)
      },
      err => {
        console.log(err, "================== err")
      }
    )
  }

  // getting details from the user token
  const GenerateInvoiceNo = () => {
    let config = {
      url: ApiUrl.cardGenerateInvoice,
      method: "get"
    }
    APIRequest(
      config,
      res => {
        setInvoiceNo(res?.invoiceNo)
      },
      err => {
        console.log(err, "================== err")
      }
    )
  }

  // i am geting information from the google api, like this, location, ip
  const geoLocation = () => {
    var requestOptions = {
      method: 'GET',
    };

    fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=eb7b7d7a8fce4c8187e3da1d70a05f58", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        sessionStorage.setItem('location_ip', result?.ip)
        sessionStorage.setItem('location_latitude', result?.location?.latitude)
        sessionStorage.setItem('location_longitude', result?.location?.longitude)
        console.log('out location');
        return true;
      })
      .catch(error => console.log('error', error));
  };

  const CheckLocation = async () => {
    let location_ip = await sessionStorage.getItem('location_ip')
    let location_latitude = await sessionStorage.getItem('location_latitude')
    let location_longitude = await sessionStorage.getItem('location_longitude')
    if (!location_ip || !location_latitude || !location_longitude) {
      geoLocation()
    }
  }


  useEffect(() => {
    GetByToken()
    GenerateInvoiceNo()
    CheckLocation()
  }, [])



  if (getTokenData?.isAEPS === 'false') {
    return (
      <>
        <Header />
        <MarchantOnBoarding getTokenData={getTokenData} setStateUpdate={setStateUpdate}>
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </MarchantOnBoarding>
        <Footer />
      </>
    )
  }
  // else if (getTokenData?.isRegister === 'false') {
  //   return (
  //     <>
  //       <Header />
  //       <RegistrationOnBoarding getTokenData={getTokenData} invoiceNo={invoiceNo} >
  //         <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
  //       </RegistrationOnBoarding>
  //       <Footer />
  //     </>
  //   )
  // }
  else if (getTokenData?.isAuthentication === null || moment().diff(getTokenData?.isAuthentication, 'hours') > 24) {
    return (
      <>
        <Header />
        <AepsAuthentication getTokenData={getTokenData} invoiceNo={invoiceNo} setStateUpdate={setStateUpdate} >
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </AepsAuthentication>
        <Footer />
      </>
    )
  }
   else {
    return (
      <>
        <Header />
        <AepsServices getTokenData={getTokenData} invoiceNo={invoiceNo} savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption}>
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </AepsServices>
        <Footer />
      </>
    )
  }
}

export default Aeps
