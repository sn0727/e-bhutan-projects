import React, { useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlinePrinter } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import styles from "./../style/styles.module.css"
import PaymentSuccess from "../../../assets/loading/payment-success.gif"
import { Link } from 'react-router-dom';
import Loading from '../../../components/Feature/Loading';
import BackButton from '../../../components/Button/BackButton';

const PaymentSuccessContent = ({ billDetails }) => {
  const [billData, setbillData] = useState(billDetails);
  const [isLoading, setIsLoading] = useState(false);
  const { data, operator, PdfLink, pageLink } = billData

  return (
    <React.Fragment>
      {
        isLoading ? <Loading />
          : <div className={styles.main}>
            <div className={styles.paymentSuccess} >
              <div className="comman-container px-4">
                <BackButton link={'home'} />
              </div>

              <img src={PaymentSuccess} alt="payment-success" />
              <h1 className={styles.header1}>Payment Successful</h1>
              {/* <h2 className={styles.header2}>Bharti Airtel India Lmited</h2> */}
            </div>
            <div className={styles.innerbillDetails}>
              <ul className={styles.liTextL}>
                {data?.invoiceNo ? <li>Order Id</li> : null}
                {data?.consumerId ? < li > Consumer Id</li> : null}
                {data?.name ? <li>Consumer Name</li> : null}
                {data?.amount ? < li > Amount</li> : null}
                <li>Bill Date</li>
                {data?.invoiceNo ? <li>Invoice No</li> : null}
              </ul>
              <ul className={styles.liTextR}>
                {data?.invoiceNo ? <li>{data?.invoiceNo}</li> : null}
                {data?.consumerId ? < li > {data?.consumerId}</li> : null}
                {data?.name ? <li>{data?.name}</li> : null}
                {data?.amount ? < li > {data?.amount}</li> : null}
                <li>{(new Date().toLocaleString().split(',')[0])}</li>
                {data?.invoiceNo ? <li>{data?.invoiceNo}</li> : null}
              </ul>
            </div>
            <div className={styles.mediaIcon}>
              {/* <Link><AiOutlineShareAlt /></Link> */}
              {/* <Link><AiOutlinePrinter /></Link> */}
              <a
                href={PdfLink}
                download="Example-PDF-document"
                target="_blank"
                rel="noreferrer"
              >
                <FiDownload />

              </a>
            </div>
          </div>
      }

    </React.Fragment>
  )
}

export default PaymentSuccessContent
