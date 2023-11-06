// import React, { useEffect, useState } from 'react'
// import Header from "../../components/Common/Header/Header";
// import Footer from "../../components/Common/Footer/Footer";
// import ImageFingerprint from "../../assets/aeps/fingerprint.png"
// import ImageHp from "../../assets/aeps/hp.png"
// import ImageMobile from "../../assets/aeps/mobile.png"
// import ImageAirtal from "../../assets/operator/airtal.png"
// import { SaveBillOption, SaveBillOption1 } from '../../utils/api';
// import "./Css/aeps.css"
// import { Link } from 'react-router-dom';
// import BackButton from '../../components/Button/BackButton';

// const Aeps = () => {

//   const [isActive, setIsActive] = useState('Figure biometric Device');
//   const [saveBill, setsaveBill] = useState('');
//   const [savePaymentOption, setSavePaymentOption] = useState('');

//   const BiometricDeviceOption = [
//     {
//       image: ImageFingerprint,
//       name: "Figure biometric Device"
//     },
//     // {
//     //   image: ImageMobile,
//     //   name: "HP Biometric Device"
//     // },
//     // {
//     //   image: ImageHp,
//     //   name: "Dell Biometric Device"
//     // }
//   ]
//   // console.log(BiometricDeviceOption)
//   return (
//     <>
//       <Header />
//       <div className="comman-container px-4">
//         <div className='mobile-recharge'>
//           <BackButton link={"home"} />
//           <h1>AEPS</h1>
//         </div>
//         <p className='Select-Biometric-Device'>Select Biometric Device</p>
//         <div className='Figure-biometric-Device'>
//           {
//             BiometricDeviceOption.map((items, index) => (
//               <div className={`box-style ${items.name === isActive ? 'box-style-active' : " "}`} onClick={() => items.name === isActive ? setIsActive('') : setIsActive(items.name)} keys={index}>
//                 <div className='Image-Fingerprint-style'>
//                   <img src={items.image} alt="Fingerprint" className={`Image-Fingerprint ${items.name === isActive ? "" : "colorActive"}`} />
//                 </div>
//                 <p className='p-0 m-0'>{items.name}</p>
//               </div>
//             ))
//           }
//         </div>
//         <div className='save-two-btn buttonBtn mt-4'>
//           {
//             SaveBillOption1.map((items, i) => (
//               <button key={i} onClick={() => savePaymentOption === items ? setSavePaymentOption('') : setSavePaymentOption(items)} className={`${savePaymentOption === items ? 'active-btn' : 'btn-sucess'}`}> {items} </button>
//             ))
//           }
//           {/* <button key="2" onClick={() => alert("click")} className="btn-sucess"> Deposit </button> */}
//         </div>

//         <div className="payment_feild">
//           <div className='row'>
//             <div className='size-col-12 '>
//               <div className="Airtel_Payment_Bank">
//                 <img src={ImageAirtal} alt="Airtal" className='airtal-img-style' />
//                 <p>Airtel Payment Bank</p>
//               </div>
//             </div>
//           </div>
//           <div className="style-row">
//             <div className="col-6">
//               <div className="enter-mobilenum select-plan mt-2">
//                 <div className="enter-mobilenum">
//                   <div className='set-p-relative'>
//                     <input type="number" min="1" max="5" placeholder='Aadhar Number' className='enter-mobile-num bg-white border-cs InputTextColor' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6">
//               <div className="enter-mobilenum select-plan mt-2">
//                 <div className="enter-mobilenum">
//                   <div className='set-p-relative'>
//                     <input type="number" min="1" max="5" placeholder='Mobile Number' defaultValue={'91 0000 0000 00'} className='enter-mobile-num bg-white border-cs InputTextColor' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6">
//               <div className="enter-mobilenum select-plan mt-2">
//                 <div className="enter-mobilenum">
//                   <div className='set-p-relative'>
//                     <input type="number" min="1" max="5" placeholder='Amount' defaultValue={'200.00'} className='enter-mobile-num bg-white border-cs InputTextColor' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 aligin-center">
//               <div className='buttonBtn'>
//                 {SaveBillOption.map((item, i) =>
//                   <button key={`savebillbutton${i}`} onClick={() => saveBill === item ? setsaveBill('') : setsaveBill(item)} className={saveBill === item ? 'active-btn' : 'btn-sucess'}>{item}</button>
//                 )}
//                 {/* <button className="btn-sucess">Home</button>
//                 <button className="btn-sucess">Mom</button>
//                 <button className="btn-sucess">Office</button>
//                 <button className="btn-sucess">Other</button> */}
//               </div>
//             </div>
//             <div className="col-6 aligin-center">
//               <div className="check-condition">
//                 <input type="checkbox" id='condition' />
//                 <label htmlFor="condition">I have accepted Aadhar content</label>
//               </div>
//             </div>
//           </div>
//           <div className='button-process'>
//             <button type='button' cla ssName='button-pro'>
//               <Link onClick={() => alert('click')}>Proceed</Link>
//             </button>
//           </div>
//         </div>
//       </div >
//       <Footer />
//     </>
//   )
// }
// export default Aeps






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

let url, finalUrl, MethodCapture, MethodInfo, OldPort, DString, device, thrownError

// Select Biometric Device tab component
const SelectBiometricDeviceTab = () => {
  const [isActive, setIsActive] = useState('Figure biometric Device');
  const [saveBill, setsaveBill] = useState('');
  const [savePaymentOption, setSavePaymentOption] = useState('');
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
        <button key="2" onClick={() => alert("click")} className="btn-sucess"> Deposit </button>
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
      {children}
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
          <div className="col-6 aligin-center">
            <div className="check-condition">
              <input type="checkbox" id='condition' />
              <label htmlFor="condition">I have accepted Aadhar content</label>
            </div>
          </div>
        </div>
        <div className='button-process'>
          <button type='button' cla ssName='button-pro'>
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

  // Merchant On boarding api hit.
  const MerchantBoarding = () => {
    setIsloading(true)
    let config = {
      url: ApiUrl?.aepsRegistration,
      method: 'post',
      body: {
        "accessmodetype": "SITE",
        "merchantcode": getTokenData?.partnerId,
        "adhaarnumber": getTokenData?.aadharNo ? getTokenData?.aadharNo : inputFeildValue?.adhaarnumber,
        "mobilenumber": getTokenData?.contact ? getTokenData?.contact : inputFeildValue?.mobilenumber,
        "latitude": "22.44543",
        "longitude": "77.434",
        "referenceno": invoiceNo,
        "submerchantid": "9891798068",
        "timestamp": formateDate,
        "data": 'data',
        "ipaddress": "192.168.43.232"
      }
    }
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
  }

  const Scan =()=>{
    alert('start')
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
          debugger;
          var CmbData1 = $($doc).find('RDService').attr('status');
          var CmbData2 = $($doc).find('RDService').attr('info');

          if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Morpho_RD_Service' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'SecuGen India Registered device Level 0' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'Precision - Biometric Device is ready for capture' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'RD service for Startek FM220 provided by Access Computech' + '\\b').test(CmbData2) == true || RegExp('\\b' + 'NEXT' + '\\b').test(CmbData2) == true) {

            debugger;
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


              return false;
            }
            else if (CmbData1 == 'USED') {
              $('#method').val(finalUrl + MethodCapture);
              $('#info').val(finalUrl + MethodInfo);

              SuccessFlag = 1;

              alert("Device detected successfully");


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



  function deviceInfoAvdm() {
    var GetCustomDomName = "127.0.0.1";
    var SuccessFlag = 0;
    var primaryUrl1 = "http://" + GetCustomDomName + ":";

    try {
      var protocol = window.location.href;
      if (protocol.indexOf("https") >= 0) {
        primaryUrl1 = "https://" + GetCustomDomName + ":";
      }
    } catch (e) { }

    url = "";
    SuccessFlag = 0;


    var finUrl = $('#info').val();
    url = "";

    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    ;
    $.ajax({

      type: "DEVICEINFO",
      async: false,
      crossDomain: true,
      url: finUrl,
      contentType: "text/xml; charset=utf-8",
      processData: false,
      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
        $('#txtDeviceInfo').val(data);
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        alert(thrownError);
        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });

    return res;

  }

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
      {children}

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
          <button type='button' cla ssName='button-pro'>
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
          <button onClick={()=> Scan()}>Scan</button>

        </div>
      </div>
    </div >
  )
}

// this is perent component
const Aeps = () => {
  const [getTokenData, setGetTokenData] = useState({});
  const [invoiceNo, setInvoiceNo] = useState({});
  const [getLocationData, setGetLocationData] = useState({});

  // getting details from the user token
  const GetByToken = () => {
    let config = {
      url: ApiUrl.userGetByToken,
      method: "get"
    }
    APIRequest(
      config,
      res => {
        console.log(res, "dfdllllllllllllllllll res")
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
        console.log(res, "dfdllllllllllllllllll res")
        setInvoiceNo(res?.invoiceNo)
      },
      err => {
        console.log(err, "================== err")
      }
    )
  }

  // i am geting information from the google api, like this, location, ip
  const geoLocation = () => {
    let config = {
      url: 'https://geolocation-db.com/json/',
    };
    axios.request(config)
      .then((response) => {
        setGetLocationData(response?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(getTokenData?.isAEPS, '==================hhdh')

  useEffect(() => {
    GetByToken()
    GenerateInvoiceNo()
    geoLocation()
  }, [])


  if (getTokenData?.isAEPS) {
    return (
      <>
        <Header />
        <RegistrationOnBoarding getTokenData={getTokenData} invoiceNo={invoiceNo}>
          <SelectBiometricDeviceTab />
        </RegistrationOnBoarding>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Header />

        <MarchantOnBoarding getTokenData={getTokenData}>
          <SelectBiometricDeviceTab />
        </MarchantOnBoarding>

        <Footer />
      </>
    )
  }
}

export default Aeps
