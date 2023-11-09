
import React, { useEffect, useState } from 'react'
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";
import ImageFingerprint from "../../assets/aeps/fingerprint.png"
import ImageHp from "../../assets/aeps/hp.png"
import ImageMobile from "../../assets/aeps/mobile.png"
import ImageAirtal from "../../assets/operator/airtal.png"
import { APIRequest, ApiUrl, SaveBillOption, SaveBillOption1 } from '../../utils/api';
import "./Css/aeps.css"
import { Link } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


import $ from 'jquery';
import { Autocomplete, TextField } from '@mui/material';
import { ValidateAadhaar, ValidatePhone } from '../../utils/validation';

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
export const MarchantOnBoarding = ({ children, getTokenData }) => {
  const [isLoading, setIsloading] = useState(false);
  const [getUrl, setGetUrl] = useState({});
  const [inputFeildValue, setInputFeildValue] = useState({
    mobileNo: "",
    emailId: ""
  })

  // i am getting input feild value.
  const inputHandle = (event) => {
    setInputFeildValue({ ...inputFeildValue, [event.target.name]: event.target.value })
  }

  // Merchant On boarding api hit.
  const MerchantBoarding = () => {
    setIsloading(true)
    let config = {
      url: ApiUrl?.aepsOnboarding,
      method: 'post',
      body: {
        "merchantcode": getTokenData?.partnerId,
        "mobile": getTokenData?.contact ? getTokenData?.contact : inputFeildValue?.mobileNo,
        "is_new": "0",
        "email": getTokenData?.email ? getTokenData?.email : inputFeildValue?.emailId,
        "firm": "PAYMONEY"
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== de de')
        setGetUrl(res?.data)
        toast.success(res?.message)
        setIsloading(false)
      },
      err => {
        toast.success(err?.message)
        setIsloading(false)
      }
    )
  }

  // redirect url funcation
  function redirectUrl() {
    if (getUrl?.status) {
      setTimeout(() => {
        window.open(getUrl?.redirecturl, '_blank');
        console.log(getUrl?.redirecturl)
      }, 2000)
    }
  }
  redirectUrl();

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
                    name="mobileNo"
                    onChange={inputHandle}
                    placeholder='Mobile Number'
                    defaultValue={getTokenData?.contact}
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
                    name="emailId"
                    defaultValue={getTokenData?.email}
                    onChange={inputHandle}
                    placeholder='Email id'
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
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
export const RegistrationOnBoarding = ({ children, getTokenData, invoiceNo }) => {
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

  const geoLocation = () => {
    var requestOptions = {
      method: 'GET',
    };

    fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=eb7b7d7a8fce4c8187e3da1d70a05f58", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        localStorage.setItem('location_ip', result?.ip)
        localStorage.setItem('location_latitude', result?.location?.latitude)
        localStorage.setItem('location_longitude', result?.location?.longitude)
        console.log('out location');
        return true;
      })
      .catch(error => console.log('error', error));
  };

  // Merchant On boarding api hit.
  const MerchantBoarding = async () => {
    setIsloading(true)
    let location_ip = await localStorage.getItem('location_ip')
    let location_latitude = await localStorage.getItem('location_ip')
    let location_longitude = await localStorage.getItem('location_ip')

    if (!location_ip && !location_latitude && !location_longitude) {
      geoLocation()
    }

    let config = {
      url: ApiUrl?.aepsRegistration,
      method: 'post',
      body: {
        "accessmodetype": "SITE",
        "adhaarnumber": getTokenData?.aadharNo ? getTokenData?.aadharNo : inputFeildValue?.adhaarnumber,
        "mobilenumber": getTokenData?.contact ? getTokenData?.contact : inputFeildValue?.mobilenumber,
        "latitude": location_latitude,
        "longitude": location_longitude,
        "referenceno": invoiceNo,
        "submerchantid": getTokenData?.partnerId,
        "timestamp": formateDate,
        "data": FingerData,
        "ipaddress": location_ip,
      }
    }
    setTimeout(() => {
      APIRequest(
        config,
        res => {
          console.log(res)
          toast.success(res?.message)
          setIsloading(false)
        },
        err => {
          toast.error(err?.message)
          setIsloading(false)
        }
      )
    }, 1000);

  }


  function discoverAvdm() {
    var GetCustomDomName = "127.0.0.1";
    var SuccessFlag = 0;
    var primaryUrl = "http://" + GetCustomDomName + ":";

    try {
      var protocol = window.location.href;
      if (protocol.indexOf("https") >= 0) {
        primaryUrl = "https://" + GetCustomDomName + ":";
      }
    } catch (e) { }

    url = "";

    SuccessFlag = 0;
    for (var i = 11100; i <= 11112; i++) {
      console.log("Discovering RD service on port : " + i.toString());
      var verb = "RDSERVICE";
      var err = "";

      var res;
      $.support.cors = true;
      var httpStaus = false;
      var jsonstr = "";
      var data = new Object();
      var obj = new Object();

      $.ajax({
        type: "RDSERVICE",
        async: false,
        crossDomain: true,
        url: primaryUrl + i.toString(),
        contentType: "text/xml; charset=utf-8",
        processData: false,
        cache: false,
        crossDomain: true,

        success: function (data) {
          httpStaus = true;
          res = {
            httpStaus: httpStaus,
            data: data
          };
          //alert(data);
          $("#txtDeviceInfo").val(data);
          finalUrl = primaryUrl + i.toString();
          var $doc = $.parseXML(data);//$data
          // debugger;
          var CmbData1 = $($doc).find('RDService').attr('status');
          var CmbData2 = $($doc).find('RDService').attr('info');

          if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {

            // debugger;
            console.log($($doc).find('Interface').eq(0).attr('path'));

            if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {

              if ($($doc).find('Interface').eq(0).attr('path') == "/rd/capture") {
                MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              }
              if ($($doc).find('Interface').eq(1).attr('path') == "/rd/capture") {
                MethodCapture = $($doc).find('Interface').eq(1).attr('path');
              }
              if ($($doc).find('Interface').eq(0).attr('path') == "/rd/info") {
                MethodInfo = $($doc).find('Interface').eq(0).attr('path');
              }
              if ($($doc).find('Interface').eq(1).attr('path') == "/rd/info") {
                MethodInfo = $($doc).find('Interface').eq(1).attr('path');
              }
            } else if (RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            }

            if (CmbData1 == 'READY') {

              $('#method').val(finalUrl + MethodCapture);
              $('#info').val(finalUrl + MethodInfo);

              SuccessFlag = 1;

              alert("Device detected successfully");
              CaptureAvdm()
              return false;
            }
            else if (CmbData1 == 'USED') {
              $('#method').val(finalUrl + MethodCapture);
              $('#info').val(finalUrl + MethodInfo);

              SuccessFlag = 1;

              alert("Device detected successfully");
              CaptureAvdm()
              return false;
            }


            else if (CmbData1 == 'NOTREADY') {
              alert("Device Not Discover");
              return false;
            }
          }

        },
        error: function (jqXHR, ajaxOptions, thrownError) {
          if (i == "8005" && OldPort == true) {
            OldPort = false;
            i = "11099";
          }
        },

      });

      if (SuccessFlag == 1) {
        break;
      }
    }

    if (SuccessFlag == 0) {
      alert("Connection failed Please try again.");
    } else {
      //alert("RDSERVICE Discover Successfully");
    }
    $("select#ddlAVDM").prop('selectedIndex', 0);
    return res;
  };

  function CaptureAvdm() {
    DString = '';
    device = "mantra";

    var strWadh = "";
    var strOtp = "";


    var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /> ' + DString + '<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';


    var finUrl = $('#method').val();


    var verb = "CAPTURE";


    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";

    $.ajax({

      type: "CAPTURE",
      async: false,
      crossDomain: true,
      url: finUrl,
      data: XML,
      contentType: "text/xml; charset=utf-8",
      processData: false,
      success: function (data) {

        if (device == "morpho") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //morpho
        } else if (device == "mantra") {
          var xmlString = data;  //mantra
        } else if (device == "secugen") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //secugen
        } else if (device == "precision") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //precision
        } else if (device == "startek") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //startek
        } else if (device == "nextrd") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //next rd
        }
        httpStaus = true;
        res = { httpStaus: httpStaus, data: xmlString };


        setFingerData(xmlString)
        $('#txtPidData').val(xmlString);

        var $doc = data;
        var Message = $($doc).find('Resp').attr('errInfo');
        var errorcode = $($doc).find('Resp').attr('errCode');
        if (errorcode == 0) {

          var $doc = $.parseXML(data);
          var Message = $($doc).find('Resp').attr('errInfo');

          alert(Message);

        } else {
          $('#loaderbala').css("display", "none");
          alert('Capture Failed');
          window.location.reload();
        }

      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        //$('#txtPidOptions').val(XML);
        alert(thrownError);
        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });

    return res;
  }

  function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
      err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
      err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
      err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
      err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
      err = 'Time out error';
    } else if (thrownError === 'abort') {
      err = 'Ajax request aborted';
    } else {
      err = 'Unhandled Error';
    }
    return err;
  }





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
                    defaultValue={getTokenData?.contact}
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
                    defaultValue={getTokenData?.aadharNo}
                    onChange={inputHandle}
                    placeholder='Aadhaar number'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                </div>
              </div>
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
          {FingerData ? <button type='button' className='button-pro'>
            <Link onClick={() => MerchantBoarding()}>
              {
                isLoading ? <div>
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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


export const AepsAuthentication = ({ children, getTokenData, invoiceNo, savePaymentOption}) => {
  const [isLoading, setIsloading] = useState(false);
  const [FingerData, setFingerData] = useState('')
  const [getLocationData, setGetLocationData] = useState({});

  // get current date and time
  const date = new Date();
  let formateDate = moment(date).format('yyyy-DD-mm H:mm:ss');

  const [inputFeildValue, setInputFeildValue] = useState({
    adhaarnumber: "",
    mobilenumber: "",
    amount: ""
  })
  const [BankList, setBankList] = useState([]);
  const [Bank, setBank] = useState('')

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

  const geoLocation = () => {
    var requestOptions = {
      method: 'GET',
    };

    fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=eb7b7d7a8fce4c8187e3da1d70a05f58", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        localStorage.setItem('location_ip', result?.ip)
        localStorage.setItem('location_latitude', result?.location?.latitude)
        localStorage.setItem('location_longitude', result?.location?.longitude)
        console.log('out location');
        return true;
      })
      .catch(error => console.log('error', error));
  };

  // Merchant On boarding api hit.
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
    if (inputFeildValue?.amount < 100) {
      toast.error('Minimum amount limit 100!')
      return true
    }


    setIsloading(true)
    let location_ip = await localStorage.getItem('location_ip')
    let location_latitude = await localStorage.getItem('location_ip')
    let location_longitude = await localStorage.getItem('location_ip')

    if (!location_ip && !location_latitude && !location_longitude) {
      geoLocation()
      alert('please enable location permission in your browser')
      setIsloading(false)
      return true;
    }
    let url
    if (savePaymentOption === 'Withdrawal') {
      url = ApiUrl?.aepsWithdraw
    } else {
      url = ApiUrl?.aepsDeposit
    }
    let config = {
      url: url,
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
        "nationalbankidentification": Bank.iinno,
        "requestremarks": "ok",
        "pipe": "bank1",
        "transactiontype": "CW",
        "amount": inputFeildValue?.amount,
        "is_iris": "NO",
      },

    }
    setTimeout(() => {
      APIRequest(
        config,
        res => {
          console.log(res)
          toast.success(res?.message)
          setIsloading(false)
        },
        err => {
          toast.error(err?.message)
          setIsloading(false)
        }
      )
    }, 1000);

  }

  function discoverAvdm() {
    var GetCustomDomName = "127.0.0.1";
    var SuccessFlag = 0;
    var primaryUrl = "http://" + GetCustomDomName + ":";

    try {
      var protocol = window.location.href;
      if (protocol.indexOf("https") >= 0) {
        primaryUrl = "https://" + GetCustomDomName + ":";
      }
    } catch (e) { }

    url = "";

    SuccessFlag = 0;
    for (var i = 11100; i <= 11112; i++) {
      console.log("Discovering RD service on port : " + i.toString());
      var verb = "RDSERVICE";
      var err = "";

      var res;
      $.support.cors = true;
      var httpStaus = false;
      var jsonstr = "";
      var data = new Object();
      var obj = new Object();

      $.ajax({
        type: "RDSERVICE",
        async: false,
        crossDomain: true,
        url: primaryUrl + i.toString(),
        contentType: "text/xml; charset=utf-8",
        processData: false,
        cache: false,
        crossDomain: true,

        success: function (data) {
          httpStaus = true;
          res = {
            httpStaus: httpStaus,
            data: data
          };
          //alert(data);
          $("#txtDeviceInfo").val(data);
          finalUrl = primaryUrl + i.toString();
          var $doc = $.parseXML(data);//$data
          // debugger;
          var CmbData1 = $($doc).find('RDService').attr('status');
          var CmbData2 = $($doc).find('RDService').attr('info');

          if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {

            // debugger;
            console.log($($doc).find('Interface').eq(0).attr('path'));

            if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {

              if ($($doc).find('Interface').eq(0).attr('path') == "/rd/capture") {
                MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              }
              if ($($doc).find('Interface').eq(1).attr('path') == "/rd/capture") {
                MethodCapture = $($doc).find('Interface').eq(1).attr('path');
              }
              if ($($doc).find('Interface').eq(0).attr('path') == "/rd/info") {
                MethodInfo = $($doc).find('Interface').eq(0).attr('path');
              }
              if ($($doc).find('Interface').eq(1).attr('path') == "/rd/info") {
                MethodInfo = $($doc).find('Interface').eq(1).attr('path');
              }
            } else if (RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            } else if (RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {
              MethodCapture = $($doc).find('Interface').eq(0).attr('path');
              MethodInfo = $($doc).find('Interface').eq(1).attr('path');
            }

            if (CmbData1 == 'READY') {

              $('#method').val(finalUrl + MethodCapture);
              $('#info').val(finalUrl + MethodInfo);

              SuccessFlag = 1;

              alert("Device detected successfully");
              CaptureAvdm()
              return false;
            }
            else if (CmbData1 == 'USED') {
              $('#method').val(finalUrl + MethodCapture);
              $('#info').val(finalUrl + MethodInfo);

              SuccessFlag = 1;

              alert("Device detected successfully");
              CaptureAvdm()
              return false;
            }


            else if (CmbData1 == 'NOTREADY') {
              alert("Device Not Discover");
              return false;
            }
          }

        },
        error: function (jqXHR, ajaxOptions, thrownError) {
          if (i == "8005" && OldPort == true) {
            OldPort = false;
            i = "11099";
          }
        },

      });

      if (SuccessFlag == 1) {
        break;
      }
    }

    if (SuccessFlag == 0) {
      alert("Connection failed Please try again.");
    } else {
      //alert("RDSERVICE Discover Successfully");
    }
    $("select#ddlAVDM").prop('selectedIndex', 0);
    return res;
  };

  function CaptureAvdm() {
    DString = '';
    device = "mantra";

    var strWadh = "";
    var strOtp = "";


    var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /> ' + DString + '<CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';


    var finUrl = $('#method').val();


    var verb = "CAPTURE";


    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";

    $.ajax({

      type: "CAPTURE",
      async: false,
      crossDomain: true,
      url: finUrl,
      data: XML,
      contentType: "text/xml; charset=utf-8",
      processData: false,
      success: function (data) {

        if (device == "morpho") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //morpho
        } else if (device == "mantra") {
          var xmlString = data;  //mantra
        } else if (device == "secugen") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //secugen
        } else if (device == "precision") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //precision
        } else if (device == "startek") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //startek
        } else if (device == "nextrd") {
          var xmlString = (new XMLSerializer()).serializeToString(data);  //next rd
        }
        httpStaus = true;
        res = { httpStaus: httpStaus, data: xmlString };


        setFingerData(xmlString)
        $('#txtPidData').val(xmlString);

        var $doc = data;
        var Message = $($doc).find('Resp').attr('errInfo');
        var errorcode = $($doc).find('Resp').attr('errCode');
        if (errorcode == 0) {

          var $doc = $.parseXML(data);
          var Message = $($doc).find('Resp').attr('errInfo');

          alert(Message);

        } else {
          $('#loaderbala').css("display", "none");
          alert('Capture Failed');
          window.location.reload();
        }

      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        //$('#txtPidOptions').val(XML);
        alert(thrownError);
        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });

    return res;
  }

  function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
      err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
      err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
      err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
      err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
      err = 'Time out error';
    } else if (thrownError === 'abort') {
      err = 'Ajax request aborted';
    } else {
      err = 'Unhandled Error';
    }
    return err;
  }


  useEffect(() => {
    GetBankList()
  }, [])
  useEffect(() => {
    setInputFeildValue(
      {
        adhaarnumber: getTokenData?.aadharNo,
        mobilenumber: getTokenData?.contact,
        amount: ""
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
                // value={Bank}
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
                    defaultValue={inputFeildValue?.mobilenumber }
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
                    defaultValue={inputFeildValue?.adhaarnumber}
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
                    name="amount"
                    defaultValue={inputFeildValue?.amount}
                    onChange={inputHandle}
                    placeholder='Enter amount'
                    className='enter-mobile-num bg-white border-cs InputTextColor' />
                  <span className='mt-1'>Minimum amount : 100</span>
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
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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

// this is perent component
const Aeps = () => {
  const [getTokenData, setGetTokenData] = useState({});
  const [invoiceNo, setInvoiceNo] = useState({});
  const [savePaymentOption, setSavePaymentOption] = useState('');


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


  useEffect(() => {
    GetByToken()
    GenerateInvoiceNo()
  }, [])


  if (getTokenData?.isAEPS === 'false') {
    return (
      <>
        <Header />
        <MarchantOnBoarding getTokenData={getTokenData}>
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </MarchantOnBoarding>
        <Footer />
      </>
    )
  } else if (getTokenData?.isRegister === 'false') {
    return (
      <>
        <Header />
        <RegistrationOnBoarding getTokenData={getTokenData} invoiceNo={invoiceNo} >
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </RegistrationOnBoarding>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Header />
        <AepsAuthentication getTokenData={getTokenData} invoiceNo={invoiceNo} savePaymentOption={savePaymentOption} >
          <SelectBiometricDeviceTab savePaymentOption={savePaymentOption} setSavePaymentOption={setSavePaymentOption} />
        </AepsAuthentication>
        <Footer />
      </>
    )
  }
}

export default Aeps
