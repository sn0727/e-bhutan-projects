import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./../style/style.module.css"
import PassbookIcon from "../../../assets/AddWalletIcon/passbook.png"
import ScanIocn from "../../../assets/AddWalletIcon/scan.png"
import TransferIcon from "../../../assets/AddWalletIcon/transfer.png"
import { LuIndianRupee } from 'react-icons/lu';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import jwt_decode from "jwt-decode";
import { APIRequest, APIRequestWithFile, ApiUrl } from '../../../utils/api'
import QRCode from 'react-qr-code'
import Loader from '../../../components/Feature/Loader'
import { toast } from 'react-toastify'
import BackButton from '../../../components/Button/BackButton'

const MoneyRequestContent = () => {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const [Amount, setAmount] = useState('');
  const [transactionId, settransactionId] = useState('');
  const [filePath, setFilePath] = useState('')

  const MoneyRequest = () => {
    setisLoading(true)
    const fd = new FormData();
    fd.append('transactionId', transactionId);
    fd.append('amount', Amount);
    fd.append('document', filePath);

    let config = {
      url: ApiUrl.requestRise,
      method: 'post',
      body: fd
    };
    APIRequestWithFile(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        toast.success(res?.message);
        navigate('/add-wallet')
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err?.message);
      }
    );
  }



  const Submit = () => {
    if (!Amount) {
      toast.error('Please enter your amount!')
      return true
    }
    if (!transactionId) {
      toast.error('Please enter your transaction id!')
      return true
    }
    MoneyRequest()
  }

  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='pt-5 ps-5'>
          <BackButton link={"add-wallet"} />
        </div>
        <div style={{ display: 'block' }}>
          <div className="Wallet-desing pt-10">
            <label className={styles.textAddmon}>Send  Money Request</label>

            <div className={`set-p-relative ${styles.getOfferAmount}`}>
              <input type="text" value={Amount} maxLength={6} className='enter-mobile-num' onChange={(e) => setAmount(e.target.value)} placeholder={'Enter your amount'} />
            </div>
            <div className={`${styles.getOfferAmount}`}>
              <input type="text" value={transactionId} className='enter-mobile-num' onChange={(e) => settransactionId(e.target.value)} placeholder={'Enter Transaction Id '} />
            </div>

            <label className={styles.textAddmon} style={{ fontSize: 12, fontWeight: 500 }}>Add your screenshot</label>
            <div className={`set-p-relative ${styles.getOfferAmount}`}>
              <input type="file" className='enter-mobile-num' onChange={(e) => setFilePath(e.target.files[0])} />
            </div>
          </div>
          <div className='button-process' style={{ display: 'block' }}>
            <button type='button' className='button-pro'>
              <Link onClick={() => Submit()} className={styles.ButtnWidth}>Send Money</Link>
            </button>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default MoneyRequestContent
