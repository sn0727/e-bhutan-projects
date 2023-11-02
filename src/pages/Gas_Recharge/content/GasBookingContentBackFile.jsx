import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "./../style/style.module.css"
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import { Backdrop, CircularProgress } from '@mui/material';
import Loader from '../../../components/Feature/Loader';
import { RadioButton } from '../../../components/Feature/RadioButton';
import { toast } from 'react-toastify';


const GasRechargeContent = () => {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(true);
  const [operator, setOperator] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState('');
  const [Options, setOptions] = useState([]);
  const [type, settype] = useState('gas');
  const [saveBill, setsaveBill] = useState('');

  // console.log(saveBill)

  // if (saveBill === "Home") {
  //   console.log(1)
  // }else {
  //   console.log(0)
  // }


  const handleChange = (event) => {
    setOperator(event.target.value)
  }

  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: type === 'gas' ? `${ApiUrl.lpgGetOperatorList}` : `${ApiUrl.lpgGetBookingList}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setOptions(res?.data)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }


  const SendRequest1 = () => {
    setisLoading(true)
    let body
    if (saveBill) {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
        isSaved: saveBill
      }
    } else {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
      }
    }
    let config = {
      url: ApiUrl.lpgFetchDetails,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res, "response fetch data alam");
        setisLoading(false)
        navigate('/bill-detail',
          {
            state: {
              data: res.data,
              operator: operator,
              canumber: ConsumerNumber,
              uri: ApiUrl.lpgPayBill,
              body: {
                canumber: ConsumerNumber,
                consumerId: res?.data?.consumerId,
                invoiceNo: res?.data?.invoiceNo,
                operator: operator,
                // amount: res?.data?.amount == '2' ? 50 : res?.data?.amount,
                amount: res?.data?.amount,
                ad1: 33,
                ad2: 357,
                ad3: 1633200,
                referenceid: res?.data?.invoiceNo,
                latitude: 27.232,
                longitude: 78.2535,

                // canumber: ConsumerNumber,
                // consumerId: res?.data?.consumerId,
                // invoiceNo: res?.data?.invoiceNo,
                // operator: operator,
                // amount: res?.data?.amount && 50,
                // ad1: 33,
                // ad2: 357,
                // ad3: 1633200,
                // referenceid: res?.data?.invoiceNo,
                // latitude: 27.232,
                // longitude: 78.2535
              }
            }
          }
        )
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

  const SendRequest2 = () => {
    setisLoading(true)
    let body
    if (saveBill) {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
        mode: "online",
        isSaved: saveBill
      }
    } else {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
        mode: "online"
      }
    }
    let config = {
      url: ApiUrl.lpgFetchBookingDetails,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        navigate('/bill-detail',
          {
            state: {
              data: res.data,
              operator: operator,
              canumber: ConsumerNumber,
              uri: ApiUrl.lpgBookGas,

              body: {
                operator: operator,
                canumber: ConsumerNumber,
                amount: res?.data?.amount,
                referenceid: res?.data?.invoiceNo,
                latitude: 27.232,
                longitude: 78.2535,
                mode: "online",
                consumerId: res?.data?.consumerId,
                invoiceNo: res?.data?.invoiceNo,
                bill_fetch: {
                  billAmount: res?.data?.amount,
                  billnetamount: res?.data?.amount,
                  billdate: '01Jan1991',
                  dueDate: res.data.duedate,
                  acceptPayment: true,
                  acceptPartPay: false,
                  cellNumber: 102277100,
                  userName: res?.data?.name
                }
              }
            }
          }
        )
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
    if (operator === "") {
      toast.error('Service Provider field in empty!')
      console.log(1)
      return false;
    }
    // if (ConsumerNumber.length > 9 || ConsumerNumber.length < 11 || ConsumerNumber === "") {
    //   console.log(1)
    // }else {
    //   console.log(0)
    // }

    if (ConsumerNumber) {
      if (type === 'gas') {
        SendRequest1()
      } else {
        SendRequest2()
      }
    } else {
      toast.error('Business Partner Number must be require!')
    }
  }

  const radioChangeHandler = (e) => {
    settype(e.target.value);
  };
  // useEffect(() => {
  //   SendRequest()
  // }, [])
  useEffect(() => {
    setOperator('')
    setConsumerNumber('')
    setsaveBill('')
    SendRequest()
  }, [type])


  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <h1>Gas Bill Payment Gas Booking</h1>
        </div>
        <div className={styles.mainRadioBtn}>
          <div >
            <RadioButton
              changed={radioChangeHandler}
              id="1"
              isSelected={type === "gas"}
              label="Pay Gas Bill"
              value="gas"
            />
          </div>
          <div >
            <RadioButton
              changed={radioChangeHandler}
              id="2"
              isSelected={type === "gasCylinder"}
              label="Book a Gas Cylinder"
              value="gasCylinder"
            />
          </div>
        </div>
        <div className="inputFeild">
          <div className="enter-mobilenum">
            <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">Select Service Provider</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={operator}
                label="Select Service Provider"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Options?.map((item, i) =>
                  <MenuItem value={item.id} key={`gaslist${i}`}>{item.name.slice(0, 36)}</MenuItem>
                )}
              </Select>
            </FormControl>
            <span>Please select your service provider</span>
          </div>
          <div className="enter-mobilenum select-plan mt-2">
            <div className="enter-mobilenum">
              {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
              <div className='set-p-relative'>
                <input type="number" min="1" max="5" placeholder='1234567890' value={ConsumerNumber} onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor'/>
                <span className='mt-1'>Please enter your 10 digit account number.</span>
                {/* <Link to="/" className='channge-number-s'>View Sample Bill</Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className='inputFeild1'>
          <p>Save this bill as (optional)</p>
          <div className='buttonBtn'>
            {SaveBillOption.map((item, i) =>
              <button key={`savebillbutton${i}`} onClick={() => saveBill===item ? setsaveBill('') : setsaveBill(item)} className={saveBill === item ? 'active-btn' : 'btn-sucess'}>{item}</button>
            )}
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

export default GasRechargeContent
