import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuIndianRupee } from 'react-icons/lu';
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import BackButton from '../../../components/Button/BackButton';

const MobileRechargePaymentContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;

  const [MyDat, setMyDat] = useState(receivedData ? receivedData : {});
  const [saveBill, setsaveBill] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [PdfLink, setPdfLink] = useState('');
  const { operator, UserData, Plan, circle, ConsumerNumber } = MyDat

  const SendRequest = () => {
    setisLoading(true)
    let body
    if (saveBill) {
      body = {
        consumerId: UserData.consumerId,
        invoiceNo: UserData.invoiceNo,
        operator: operator.id,
        canumber: ConsumerNumber,
        amount: parseInt(Plan.rs),
        referenceid: UserData.invoiceNo,
        isSaved: saveBill
      }
    } else {
      body = {
        consumerId: UserData.consumerId,
        invoiceNo: UserData.invoiceNo,
        operator: operator.id,
        canumber: ConsumerNumber,
        amount: parseInt(Plan.rs),
        referenceid: UserData.invoiceNo
      }
    }
    let config = {
      url: ApiUrl.recharDoRecharge,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        navigate('/payment-success', {
          state: {
            data: {
              invoiceNo: UserData?.invoiceNo,
              amount: Plan?.rs,
              consumerId: UserData?.consumerId,
            },
            PdfLink: PdfLink, operator: operator, pageLink: "home"
          }
        })

      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          alert(err?.message)
          navigate('/home')
        }
      }
    );
  }
  const Submit = () => {
    if (ConsumerNumber) {
      if (ConsumerNumber.length > 9) {
        SendRequest()
      } else {
        alert('Phone number must be 10 digit!')
      }
    } else {
      alert('Phone number must be require!')
    }
  }


  const SendRequest1 = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.generatePdf,
      method: 'post',
      body: {
        orderId: UserData?.invoiceNo,
        consumerId: UserData?.consumerId,
        amount: UserData?.amount,
        invoiceNo: UserData?.invoiceNo,
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


  useEffect(() => {
    !receivedData && navigate('/home')
    SendRequest1()
  }, []);

  return (
    <React.Fragment>
      {receivedData ? <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <BackButton link={"mobile-recharge"} />
          <h1>Mobile Recharge</h1>
        </div>
        <div className="inputFeild">
          <div className="enter-mobilenum">
            <label className='lable-text d-block'>Enter Mobile Number</label>
            <div className='set-p-relative'>
              <input type="text" className='enter-mobile-num'
                placeholder={9354940727} defaultValue={ConsumerNumber} disabled />
            </div>
          </div>
          <div className="enter-mobilenum">
            <label className='lable-text d-block'>Operator</label>
            <div className='set-p-relative'>
              <input type="text" className='enter-mobile-num' defaultValue={operator.name} disabled />
              <Link to={"/mobile-recharge"} className='channge-number-s'>change</Link>
            </div>
          </div>
          <div className="enter-mobilenum">
            <div className='change-number set-p-relative'>
              <input type="text" className='enter-mobile-num pl-4' defaultValue={Plan.rs} disabled />
              <LuIndianRupee className='set-absolute' />
            </div>
            <span className='mt-2'>Enjoy Unlimited Local STD & Roaming <br></br>calls Local STD & Roaming calls on any network 2GB <br></br> Data and 300 SMS. Pack valid for 28 days.</span>
          </div>
        </div>
        <div className='inputFeild1'>
          <p>Save this bill as (optional)</p>
          <div className='buttonBtn'>
            {SaveBillOption.map((item, i) =>
              <button key={`savebillbutton${i}`} onClick={() => setsaveBill(item)} className={saveBill === item ? 'active-btn' : 'btn-sucess'}>{item}</button>
            )}
          </div>
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro'>
            <Link onClick={() => Submit()} >Proceed</Link>
          </button>
        </div>
      </div> :
        <div className="comman-container" style={{ height: '300px' }}>
        </div>}
      <Loader isLoading={isLoading} />
    </React.Fragment>

  )
}

export default MobileRechargePaymentContent
