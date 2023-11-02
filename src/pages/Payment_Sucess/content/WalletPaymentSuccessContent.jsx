import React, { useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlinePrinter } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import styles from "./../style/styles.module.css"
import PaymentSuccess from "../../../assets/loading/payment-success.gif"
import { Link } from 'react-router-dom';
import Loading from '../../../components/Feature/Loading';

const WalletPaymentSuccessContent = () => {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 2000)

  return (
    <React.Fragment>
      {
        isLoading ? <Loading />
          : <div className={styles.main}>
            <div className={styles.paymentSuccess} >
              <img src={PaymentSuccess} alt="payment-success" />
              <h1 className={styles.header1}>Payment Successful</h1>
            </div>
            
            <div className={styles.mediaIcon}>
              <Link><AiOutlineShareAlt /></Link>
              <Link><AiOutlinePrinter /></Link>
              <Link><FiDownload /></Link>
            </div>

            <div className='button-process'>
              <button type='button' className='button-pro'>
                <Link onClick={()=>alert("Comming Soon!")}>Share Bill</Link>
              </button>
            </div>
          </div>
      }

    </React.Fragment>
  )
}

export default WalletPaymentSuccessContent
