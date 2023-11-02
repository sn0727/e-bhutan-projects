import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "./../../Gas_Recharge/style/style.module.css"
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';


const ElectricityBillPaymentContent = () => {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(true);
  const [saveBill, setsaveBill] = useState('');
  const [operator, setOperator] = useState('');
  const [state, setstate] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState('');
  const [Options, setOptions] = useState([]);
  const [Options1, setOptions1] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setOperator(event.target.value)
  }
  const handleChange1 = (event) => {
    console.log(event.target.value);
    setstate(event.target.value)
  }

  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.electricityGetOperatorList}`,
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
  const getState = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.electricityGetState}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setOptions1(res?.data)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }



  const SendRequest1 = () => {
    console.log(operator,'oooooooooos')
    setisLoading(true)
    let body
    if (saveBill) {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
        mode: 'online',
        isSaved: saveBill
      }
    } else {
      body = {
        canumber: ConsumerNumber,
        operator: operator,
        mode: 'online',
      }
    }
    let config = {
      url: ApiUrl.electricityFetchBill,
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
              uri: ApiUrl.electricityPayBill,
              body: {
                operator: operator,
                canumber: ConsumerNumber,
                amount: res?.data?.amount,
                referenceid: res?.data?.invoiceNo,
                latitude: 27.232,
                longitude: 78.2535,
                mode: 'online',
                consumerId: res?.data?.consumerId,
                invoiceNo: res?.data?.invoiceNo,
                bill_fetch: {
                  billAmount: res?.data?.amount,
                  billnetamount: res?.data?.amount,
                  billdate: res?.data?.currentDate,
                  dueDate: res?.data?.duedate,
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
    if (state && operator) {
      if (ConsumerNumber) {
        SendRequest1()
      } else {
        toast.error('Business Partner Number must be require!')
      }
    } else {
      toast.error('All field are required!')
    }

  }


  useEffect(() => {
    getState()
    SendRequest()

  }, [])
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <h1>Electricity Bill Payment</h1>
        </div>

        <div className="inputFeild">
          <div className="enter-mobilenum">
            <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">Select state</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state}
                label="Select State"
                onChange={handleChange1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Options1?.map((item, i) =>
                  <MenuItem value={item.statename} key={`gaslist${i}`}>{item.statename}</MenuItem>
                )}
              </Select>
            </FormControl>
            <span>Please select your state </span>
          </div>
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
                  <MenuItem value={item.id} key={`gaslist${i}`}>{item.name}</MenuItem>
                )}
              </Select>
            </FormControl>
            <span>Please select your service provider</span>
          </div>
          <div className="enter-mobilenum select-plan mt-2">
            <div className="enter-mobilenum">
              {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
              <div className='set-p-relative'>
                <input type="number" maxLength={10} placeholder='1234567890' onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                <span className='mt-1'>Please enter your 10 digit account number</span>
              </div>
            </div>
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
            <Link onClick={() => Submit()}>Proceed</Link>
            {/* <Link to={"/bill-detail"}>Proceed</Link> */}
          </button>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default ElectricityBillPaymentContent
