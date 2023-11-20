import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import BackButton from '../../../components/Button/BackButton';

const DTHBillDetailsContent = ({ billDetails }) => {
  const navigate = useNavigate()
  // const { operator, state, canumber, uri, body } = billDetails
  const [isLoading, setisLoading] = useState(false);
  const [billData, setbillData] = useState(billDetails ? billDetails : {});
  const [PdfLink, setPdfLink] = useState('');
  const { data, operator, state, canumber, uri, body } = billData
  console.log(billData, '--------------------');

  const SendRequest = () => {
    setisLoading(true)
    let config = {
      url: uri,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        // alert(res.message)
        navigate('/payment-success', { state: { data: data, PdfLink: PdfLink, operator: operator } })
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
          <BackButton link={"dth-recharge"} />
          <h1> DTH Recharge Info</h1>
          <h2 className='sdfnsd-dsfldskl'><LuIndianRupee /> <span>{data?.info[0]?.MonthlyRecharge}</span></h2>
        </div>
        <div className="bill-details">
          <div className="bill-details-left12">
            <p>Bill Details</p>
            <div className='sdfdsnk'>
              <ul>
                {data?.duedate ? <li>Due Date</li> : null}
                <li>Bill Date</li>
                {data?.info[0]?.customerName ? <li>Consumer Name</li> : null}
              </ul>
              <ul>
                {data?.duedate ? <li>{data?.duedate}</li> : null}
                <li>{(new Date().toLocaleString().split(',')[0])}</li>
                {data?.info[0]?.customerName ? <li>{data?.info[0]?.customerName}</li> : null}
              </ul>
            </div>
          </div>
          <div className="bill-details-right">
            <ul>
              {data?.consumerId ? < li > Consumer Id</li> : null}
              {data?.info[0]?.customerName ? <li>Consumer Name</li> : null}
              {data?.info[0]?.Balance ? < li >Available Amount</li> : null}
              <li>Bill Date</li>
              {data?.info[0]?.NextRechargeDate ? <li>Next Recharge Date</li> : null}
              {data?.info[0]?.MonthlyRecharge ? <li>Monthly Recharge</li> : null}
            </ul>
            <ul>
              {data?.consumerId ? < li > {data?.consumerId}</li> : null}
              {data?.info[0]?.customerName ? <li>{data?.info[0]?.customerName}</li> : null}
              {data?.info[0]?.Balance ? < li >{data?.info[0]?.Balance}</li> : null}
              <li>{(new Date().toLocaleString().split(',')[0])}</li>
              {data?.info[0]?.NextRechargeDate ? <li>{data?.info[0]?.NextRechargeDate}</li> : null}
              {data?.info[0]?.MonthlyRecharge ? <li>{data?.info[0]?.MonthlyRecharge}</li> : null}
            </ul>
          </div>
        </div>
        {/* <div className='button-process'>
          <li>{data?.info[0].planname}</li>
        </div> */}
        <div className='button-process'>
          <button type='button' className='button-pro' onClick={() => SendRequest()}>
            <Link>Proceed</Link>
          </button>
        </div>
        <Loader isLoading={isLoading} />

      </div>
    </React.Fragment >
  )
}

export default DTHBillDetailsContent
