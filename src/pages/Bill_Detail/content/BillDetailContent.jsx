import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import BackButton from '../../../components/Button/BackButton';

const BillDetailContent = ({ billDetails }) => {
  const navigate = useNavigate()
  // const { operator, state, canumber, uri, body } = billDetails
  const [isLoading, setisLoading] = useState(false);
  const [billData, setbillData] = useState(billDetails ? billDetails : {});
  const [PdfLink, setPdfLink] = useState('');
  const [OTP, setOTP] = useState('');
  const { data, operator, state, canumber, uri, body, pageLink } = billData

  // console.log(pageLink, "bill details ================")

  const SendRequest = () => {
    let mybody;
    if (billData?.otp) {
      mybody = { ...body, otp: OTP }
    } else {
      mybody = body
    }
    setisLoading(true)
    let config = {
      url: uri,
      method: 'post',
      body: mybody
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        // alert(res.message)
        navigate('/payment-success', { state: { data: data, operator: operator } })
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


  useEffect(() => {
    !billDetails && navigate('/home')
  }, []);
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
        <BackButton link={pageLink} />
          <h1>Bill Payment</h1>
          <h2 className='sdfnsd-dsfldskl'><LuIndianRupee /> <span>{data?.amount}</span></h2>
        </div>
        <div className="bill-details">
          <div className="bill-details-left12">
            <p>Bill Details</p>
            <div className='sdfdsnk'>
              <ul>
                {data?.duedate ? <li>Due Date</li> : null}
                <li>Bill Date</li>
                {data?.name ? <li>Consumer Name</li> : null}
              </ul>
              <ul>
                {data?.duedate ? <li>{data?.duedate}</li> : null}
                <li>{(new Date().toLocaleString().split(',')[0])}</li>
                {data?.name ? <li>{data?.name}</li> : null}
              </ul>
            </div>
          </div>
          <div className="bill-details-right">
            <ul>
              {data?.consumerId ? < li > Consumer Id</li> : null}
              {data?.name ? <li>Consumer Name</li> : null}
              {data?.amount ? < li > Amount</li> : null}
              <li>Bill Date</li>
              {data?.duedate ? <li>Bill Period</li> : null}
              {data?.remarks ? <li>Remarks</li> : null}
            </ul>
            <ul>
              {data?.consumerId ? < li > {data?.consumerId}</li> : null}
              {data?.name ? <li>{data?.name}</li> : null}
              {data?.amount ? < li >{data?.amount}</li> : null}
              <li>{(new Date().toLocaleString().split(',')[0])}</li>
              {data?.duedate ? <li>{data?.duedate}</li> : null}
              {data?.remarks ? <li>{data?.remarks}</li> : null}
            </ul>
          </div>
        </div>

        {billData?.otp ? <div className="enter-mobilenum cs-w-45 mt-5">
          <label className='lable-text d-block mb-2'>Enter OTP</label>
          <div className='set-p-relative'>
            <input type="text" onChange={(e) => setOTP(e.target.value)} maxLength={6} className='enter-mobile-num InputTextColor' placeholder={'123456'} />
          </div>
        </div> : null}
        <div className='button-process'>
          <button type='button' className='button-pro' onClick={() => SendRequest()}>
            <Link>Pay Bill</Link>
          </button>
        </div>
        <Loader isLoading={isLoading} />

      </div>
    </React.Fragment >
  )
}

export default BillDetailContent
