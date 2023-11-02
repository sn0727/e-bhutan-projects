import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePaymentInputs } from 'react-payment-inputs';
import { APIRequest, ApiUrl } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import BackButton from '../../../components/Button/BackButton';

const CreditCardContent = () => {
  const navigate = useNavigate();
  const [ConsumerNumber, setConsumerNumber] = useState('')
  const [saveBill, setsaveBill] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [network, setnetwork] = useState('');
  const [remarks, setremarks] = useState('');
  const [mobile, setmobile] = useState('');
  const [name, setname] = useState('');
  const [amount, setamount] = useState('');
  const [refId, setrefId] = useState('');

  const { getCardNumberProps } = usePaymentInputs();

  // const handleChangeCardNumber = (event) => {
  //   setConsumerNumber(event.target.value)
  // }


  const SendRequest1 = async () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.cardGenerateInvoice,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setrefId(res?.invoiceNo)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }
  const SendRequest = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.cardPaymentGenerateOTP,
      method: 'post',
      body: {
        refid: refId,
        name: name,
        mobile: mobile,
        card_number: ConsumerNumber,
        amount: amount,
        remarks: remarks,
        network: network,

        // refid: 20210389,
        // name: 'JOHN',
        // mobile: 9891798868,
        // card_number: 374245455400126,
        // amount: 200.00,
        // remarks: 'BILL PAYMENT',
        // network: 'VISA'
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        if (res?.data) {
          navigate('/bill-detail',
            {
              state: {
                data: res.data,
                canumber: ConsumerNumber,
                pageLink: "credit-card",
                uri: ApiUrl.cardPaymentPaybill,
                otp: true,
                body: {
                  refid: res?.data?.refid,
                  name: res?.data?.name,
                  mobile: res?.data?.mobile,
                  consumerId: res?.data?.consumerId,
                  invoiceNo: res?.data?.invoiceNo,
                  card_number: res?.data?.card_number,
                  amount: res?.data?.amount,
                  remarks: res?.data?.remarks,
                  network: res?.data?.network,
                }
              }
            }
          )
        }
      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          toast.error(err?.message)
        }
      }
    );
  }
  const Submit = () => {
    // to={"/credit-card-detail"}
    if (ConsumerNumber && name && mobile && name && amount && network && remarks) {
      SendRequest()
    } else {
      toast.error('Please fill all fields')
    }
  }
  useEffect(() => {
    SendRequest1()
  }, [])

  return (
    <React.Fragment>
      <div className="comman-container">
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>Pay Credit Card Bill</h1>
        </div>
        <div className="inputFeild">
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Credit Card Number</p>
              <input type='number' placeholder='Card Number' value={ConsumerNumber} className='enter-mobile-num bg-white InputTextColor' onChange={(e) => setConsumerNumber(e.target.value)} />
            </div>
          </div>
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Your Full Name</p>
              <input value={name} type="text" onChange={(e) => setname(e.target.value)} className='enter-mobile-num bg-white InputTextColor' placeholder={'Enter Name'} />
            </div>
          </div>
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Your Mobile Number</p>
              <input value={mobile} type="number" onChange={(e) => setmobile(e.target.value)} className='enter-mobile-num bg-white InputTextColor' placeholder={'Mobile Number'} />
            </div>
          </div>
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Your Amount</p>
              <input value={amount} type="number" onChange={(e) => setamount(e.target.value)} className='enter-mobile-num bg-white InputTextColor' placeholder={'Amount'} />
              <span className='mt-1'>Minimum payment 200</span>
            </div>
          </div>
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Your Network</p>
              <input value={network} type="text" onChange={(e) => setnetwork(e.target.value)} className='enter-mobile-num bg-white InputTextColor' placeholder={'VISA'} />
            </div>
          </div>
          <div className="enter-mobilenum mt-2">
            <div className='set-p-relative'>
              <p>Enter Your Remarks</p>
              <input value={remarks} type="text" onChange={(e) => setremarks(e.target.value)} className='enter-mobile-num bg-white InputTextColor' placeholder={'Remarks'} />
            </div>
          </div>
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro'>
            <Link onClick={() => Submit()}>Proceed</Link>
          </button>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default CreditCardContent
