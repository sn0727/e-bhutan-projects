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

const AddWalletContent = () => {
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
    // Add()
    generateQRCode()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
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

      return () => {
        clearInterval(intervalId);
      };
    }
    if (seconds < 1) {
      setQrCode('')
    }
  }, [seconds]);

  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className={styles.WalletBalance}>
          <button onClick={()=> navigate('/money-request-status')} type='button' style={{width:150}} className={styles.addMoney}>
            <div className={`text-white`}>Request status</div>
          </button>
          <button onClick={()=>navigate('/money-request')} type='button' style={{width:150}} className={styles.addMoney}>
            <div className={`text-white`}>Money Request</div>
          </button>
        </div>
        <div style={{ display: 'block' }}>
          <div className="Wallet-desing">
            <label className={styles.textAddmon}>Add Money to Wallet</label>
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
          </div>
        </div>
        <div className={styles.inputFeild2} style={{ display: 'block' }}>
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
          <div className='button-process' style={{ display: 'block' }}>
            <button type='button' className='button-pro'>
              <Link onClick={() => Submit()} className={styles.ButtnWidth}>Add Money {AddAmount}</Link>
            </button>
          </div>
        }
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default AddWalletContent
