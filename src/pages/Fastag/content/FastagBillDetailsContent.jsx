import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import BackButton from '../../../components/Button/BackButton';

const DTHBillDetailsContent = ({ billDetails }) => {
  const navigate = useNavigate()
  // const { operator, state, canumber, uri, body } = billDetails
  const [isLoading, setisLoading] = useState(false);
  const [billData, setbillData] = useState(billDetails ? billDetails : {});
  const [PdfLink, setPdfLink] = useState('');
  const [AddAmount, setAddAmount] = useState('');
  const { data, operator, state, canumber, uri, body, pageLink } = billData

  const SendRequest = () => {
    setisLoading(true)
    let config = {
      url: uri,
      method: 'post',
      // body:body,
      body: {
        ...body,
        amount: AddAmount,
        bill_fetch: {
          ...body.bill_fetch,
          billAmount: AddAmount,
          billnetamount: AddAmount,
        }
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        // alert(res.message)
        navigate('/payment-success', { state: { data: {...data, amount: AddAmount}, PdfLink: PdfLink, operator: operator } })
      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          alert(err?.message)
        }
      }
    );
  }

  const SendRequest1 = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.generatePdf,
      method: 'post',
      body: {
        orderId: data?.invoiceNo,
        consumerId: data?.consumerId,
        consumerName: data?.name,
        dueDate: data?.duedate,
        amount: data?.amount,
        invoiceNo: data?.invoiceNo,
        billDate: data?.currentDate,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        setPdfLink(res?.data)
      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          alert(err?.message)
        }
      }
    );
  }

  const Submit = () => {
    if (AddAmount) {
      SendRequest()
    } else {
      alert('Amount must be require!')
    }
  }

  useEffect(() => {
    !billDetails && navigate('/home')
    SendRequest1()
  }, []);
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <BackButton link={pageLink} />
          <h1>Bill Payment</h1>
          {/* <h2 className='sdfnsd-dsfldskl'><LuIndianRupee /> <span>{data?.amount}</span></h2> */}
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <input type="text" maxLength="5" placeholder='100' onChange={(e) => setAddAmount(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor text-center' defaultValue={''} />
          </div>

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
              {data?.consumerId ? < li > Consumer Id</li> : null}
              <li>Bill Date</li>
              {data?.duedate ? <li>Bill Period</li> : null}
            </ul>
            <ul>
              {data?.consumerId ? < li > {data?.consumerId}</li> : null}
              {data?.name ? <li>{data?.name}</li> : null}
              {data?.amount ? < li >{data?.amount}</li> : null}
              {data?.consumerId ? < li > {data?.consumerId}</li> : null}
              <li>{(new Date().toLocaleString().split(',')[0])}</li>
              {data?.duedate ? <li>{data?.duedate}</li> : null}
            </ul>
          </div>
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro' onClick={() => Submit()}>
            <Link>Proceed</Link>
          </button>
        </div>
        <Loader isLoading={isLoading} />

      </div>
    </React.Fragment >
  )
}

export default DTHBillDetailsContent
