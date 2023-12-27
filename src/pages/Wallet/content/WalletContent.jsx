import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./../style/style.module.css"
import PassbookIcon from "../../../assets/AddWalletIcon/passbook.png"
import ScanIocn from "../../../assets/AddWalletIcon/scan.png"
import TransferIcon from "../../../assets/AddWalletIcon/transfer.png"
import { LuIndianRupee } from 'react-icons/lu';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import jwt_decode from "jwt-decode";
import { APIRequest, ApiUrl } from '../../../utils/api'
import QRCode from 'react-qr-code'
import Loader from '../../../components/Feature/Loader'
import { toast } from 'react-toastify'
import BackButton from '../../../components/Button/BackButton'

const WalletContent = () => {
  const navigate = useNavigate()
  const [WalletAmount, setWalletAmount] = useState('');
  const [AddAmount, setAddAmount] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [Id, setId] = useState('');
  const [QrCode, setQrCode] = useState('');
  const [seconds, setSeconds] = useState(0);

  console.log(contactNumber, "contactNumber")

  const SendRequest = (id) => {
    console.log(id, '0000000');
    setisLoading(true)
    let config = {
      url: `${ApiUrl.getByToken}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setWalletAmount(res.user.amount)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          toast.error(err?.message);
        }
      }
    );
  }
  const Add = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.walletTransfer,
      method: 'post',
      body: {
        contact: contactNumber,
        amount: AddAmount
      }
    };
    setAddAmount('')
    setContactNumber('')
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        SendRequest(Id)
        toast.success(res?.message);
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err?.message);
      }
    );
  }
  const generateQRCode = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.generateQRCode,
      method: 'post',
      body: {
        amount: AddAmount
      }
    };
    setAddAmount('')
    APIRequest(
      config,
      res => {
        console.log(res);
        setQrCode(res?.data?.upiurl);
        setSeconds(20)
        setisLoading(false)
        toast.success(res?.message);
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err?.message);
      }
    );
  }

  const Submit = () => {
    Add()
    // generateQRCode()
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    let decoded = jwt_decode(token);
    console.log(decoded);
    SendRequest(decoded.user.id)
    setId(decoded.user.id)
  }, []);



  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      clearInterval(intervalId);
    }
    if (seconds < 1) {
      setQrCode('')
    }
  }, [seconds]);

  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='pt-5 ps-5'>
          <BackButton link={"home"} />
        </div>
        <div className={styles.WalletBalance}>
          <div className={styles.WalletBalanceLf} style={{ maxWidth: 420 }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="57" height="52" viewBox="0 0 57 52" fill="none">
                <path d="M55.1494 33.2482H43.6956C39.49 33.2457 36.0812 29.8394 36.0787 25.6339C36.0787 21.4283 39.49 18.0221 43.6956 18.0195H55.1494" stroke="#2C427D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M44.9922 25.4512H44.1095" stroke="#2C427D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8471 1H40.3017C48.5014 1 55.1488 7.64741 55.1488 15.8471V36.1529C55.1488 44.3526 48.5014 51 40.3017 51H15.8471C7.64741 51 1 44.3526 1 36.1529V15.8471C1 7.64741 7.64741 1 15.8471 1Z" stroke="#2C427D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.8336 13.8398H29.1089" stroke="#2C427D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div>
              <p className={styles.text}>Wallet Balance</p>
              <strong className={styles.dflex}><LuIndianRupee /> <span>{parseFloat(WalletAmount).toFixed(2)}</span></strong>
            </div>
            <button onClick={() => navigate('/quick-dhan')} type='button' className={styles.addMoney}>
              <div className='text-white'>Add Money</div>
            </button>
          </div>
          {/* <div className={styles.WalletBalanceRf}>
            <div>
              <div className={styles.ImageStyle}>
                <img src={PassbookIcon} alt={'PassbookIcon'} />
              </div>
              <p>Passbook</p>
            </div>
            <div>
              <div className={styles.ImageStyle}>
                <img src={TransferIcon} alt={'TransferIcon'} />
              </div>
              <p>Transfer <br />to Bank</p>
            </div>
            <div>
              <div className={styles.ImageStyle}>
                <img src={ScanIocn} alt={'ScanIocn'} />
              </div>
              <p>Scan & Pay</p>
            </div>
          </div> */}
        </div>
        <div style={{ display: 'none' }}>
          <div className="Wallet-desing">
            <label className={styles.textAddmon}>Send Money to Wallet</label>
            <div className='set-p-relative'>
              <div className={styles.getOffer}>
                <AiOutlineExclamationCircle className={styles.IconSixe} />
                <p>Get Upto 10% on wallet top-up via Axis Bank credit card</p>
              </div>
            </div>
            <div className={`set-p-relative ${styles.getOfferAmount}`}>
              <input type="text" value={AddAmount} maxLength={6} className='enter-mobile-num pl-4' onChange={(e) => setAddAmount(e.target.value)} placeholder={'100.00'} />
              <LuIndianRupee className='set-absolute' />
            </div>
            <div className={`set-p-relative ${styles.getOfferAmount}`}>
              <input type="number" value={contactNumber} className='enter-mobile-num pl-0' onChange={(e) => setContactNumber(e.target.value)} placeholder={'1234567890'} />
            </div>
          </div>
        </div>
        <div className={styles.inputFeild2} style={{ display: 'none' }}>
          <div className='buttonBtn'>
            {
              [200, 500, 1000, 2000].map((items, index) => (
                <button className={`btn-sucess ${items === AddAmount ? "activeColor" : ''}`} onClick={() => setAddAmount(items)}>{items}</button>
              ))
            }
          </div>
        </div>
        {QrCode ?
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%", padding: "20px" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={QrCode}
              viewBox={`0 0 256 256`}
            />
            <p className={styles.textAddmon} style={{ paddingTop: '10px' }}>The QR code is valid for {seconds} seconds</p>

          </div>
          :
          <div className='button-process' style={{ display: 'none' }}>
            <button type='button' className='button-pro'>
              <Link onClick={() => Submit()} className={styles.ButtnWidth}>Send Money {AddAmount}</Link>
            </button>
          </div>
        }
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default WalletContent
