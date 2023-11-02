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
import { RadioButton } from '../../../components/Feature/RadioButton';
import BackButton from '../../../components/Button/BackButton';
import jwtDecode from 'jwt-decode';

const DTHRechargeContent = () => {
  const navigate = useNavigate()
  const usertoken = localStorage.getItem('token');
  const usertokenId = jwtDecode(usertoken);
  const [isLoading, setisLoading] = useState(true);
  const [operator, setOperator] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState('');
  const [Options, setOptions] = useState([]);
  const [type, settype] = useState('dth-Recharge');
  const [saveBill, setsaveBill] = useState('');
  const [AddAmount, setAddAmount] = useState('')

  console.log(operator, "Options value ===============")

  const handleChange = (event) => {
    setOperator(event.target.value)
  }

  const radioChangeHandler = (e) => {
    settype(e.target.value);
    setOperator('')
    setConsumerNumber('')
    setsaveBill('')
  };

  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: type === "dth-Recharge" ? `${ApiUrl.DthGetOperatorList}` : `${ApiUrl.CableDthGetOperatorList}`,
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
    if (type === "dth-Recharge") {
      if (saveBill) {
        body = {
          canumber: ConsumerNumber,
          op: operator.operatorName,
          isSaved: saveBill
        }
      } else {
        body = {
          canumber: ConsumerNumber,
          op: operator.operatorName,
        }
      }
    }
    if (type === "dth-cable-recharge") {
      if (saveBill) {
        body = {
          canumber: ConsumerNumber,
          operator: operator.id,
          isSaved: saveBill
        }
      } else {
        body = {
          canumber: ConsumerNumber,
          operator: operator.id,
        }
      }
    }

    let config = {
      url: type === "dth-Recharge" ? ApiUrl.DthGetInfo : ApiUrl.CableDthGetInfo,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        if (type === "dth-Recharge") {
          navigate('/dth-bill-detail',
            {
              state: {
                data: res.data,
                operator: operator,
                canumber: ConsumerNumber,
                uri: ApiUrl.DthDoRecharge,
                dth: true,
                body: {
                  consumerId: res?.data?.consumerId,
                  invoiceNo: res?.data?.invoiceNo,
                  operator: operator.id,
                  canumber: ConsumerNumber,
                  amount: res?.data?.info[0]?.MonthlyRecharge,
                  referenceid: res?.data?.invoiceNo
                }
              }
            }
          )
        }
        if (type === "dth-cable-recharge") {
          navigate('/bill-detail',
            {
              state: {
                data: res.data,
                operator: operator?.id,
                canumber: ConsumerNumber,
                pageLink: "dth-recharge",
                uri: ApiUrl.DthDoRechargeCablePaybill,
                body: {
                  operator: operator?.id,
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
                    billdate: '01Jan1991',
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


  const SendRequest2 = async () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.cardGenerateInvoice,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        GetPdf(res?.invoiceNo)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const SendRequestPay = (invoiceNo, PdfLink) => {
    setisLoading(true)
    let config = {
      url: ApiUrl.DthDoRecharge,
      method: 'post',
      body: {       
        consumerId: usertokenId?.user?.id,
        invoiceNo: invoiceNo,
        operator: operator?.id,
        canumber: ConsumerNumber,
        amount: AddAmount,
        referenceid: invoiceNo
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        // alert(res.message)
        navigate('/payment-success', {
          state: {
            data:
            {
              amount: AddAmount,
              name: 'ebhuktan',
              consumerId: usertokenId?.user?.id,
              invoiceNo: invoiceNo
            }, PdfLink: PdfLink, operator: operator
          }
        })
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
  const GetPdf = (invoiceNo) => {
    setisLoading(true)
    let config = {
      url: ApiUrl.generatePdf,
      method: 'post',
      body: {
        orderId: invoiceNo,
        consumerId: usertokenId?.user?.id,
        consumerName: 'ebhuktan',
        amount: AddAmount,
        invoiceNo: invoiceNo,
        billDate: new Date().toLocaleString().split(',')[0],
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        // setPdfLink(res?.data)
        SendRequestPay(invoiceNo, res?.data)
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
    if (operator) {
      if (ConsumerNumber) {
        if (type==='dth-Recharge') {
          if (operator?.id != '12') {
            if (AddAmount) {
              SendRequest2()
            } else {
              toast.error('Amount must be require!')
            }
          } else {
            SendRequest1()
          }
        } else {
          SendRequest1()
        }
      } else {
        toast.error('Business Partner Number must be require!')
      }
    } else {
      toast.error('All field are required!')
    }
  }

  useEffect(() => {
    SendRequest()
  }, [type])
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>Recharge DTH or TV</h1>
        </div>
        <div className={styles.mainRadioBtn}>
          <div >
            <RadioButton
              changed={radioChangeHandler}
              id="1"
              isSelected={type === "dth-Recharge"}
              label="DTH Recharge"
              className="text-sm"
              value="dth-Recharge"
            />
          </div>
          <div >
            <RadioButton
              changed={radioChangeHandler}
              id="2"
              isSelected={type === "dth-cable-recharge"}
              label="Cable Tv Recharge"
              value="dth-cable-recharge"
            />
          </div>
        </div>

        <div className="inputFeild">
          <div className="enter-mobilenum">
            <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">Search Operator</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={operator}
                label="Search Operator"
                onChange={handleChange}
              >
                {
                  Options?.length > 0 ? Options.map((items, index) => (

                    <MenuItem value={items}>
                      <img src={items.image} alt={''} className='airtal-image mr-2' />
                      <div>
                        <p>{items.category}</p>
                        <p>{items.name}</p>
                      </div>
                    </MenuItem>

                  )) : null
                }
              </Select>
            </FormControl>
            <span>Please select your operator</span>
            {type==='dth-Recharge'? operator?.id != '12' ? <div className='set-p-relative mt-5'>
              <input type="text" placeholder='Enter Amount' onChange={(e) => setAddAmount(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
            </div> : null:null}
            {type==='dth-Recharge'? operator?.id != '12' ? <span className='mt-1'>Minimum amount : 50</span> : null:null}
          </div>
          <div className="enter-mobilenum select-plan mt-2">
            <div className="enter-mobilenum">
              {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
              <div className='set-p-relative'>
                <input type="number" onChange={(e) => setConsumerNumber(e.target.value)} placeholder='Account Number' className='enter-mobile-num bg-white border-cs InputTextColor' value={ConsumerNumber} />
                <span className='mt-1'>Please enter your account number</span>
              </div>
            </div>
          </div>
        </div>
        <div className='inputFeild1'>
          <p>Save this bill as (optional)</p>
          <div className='buttonBtn'>
            {SaveBillOption.map((item, i) =>
              <button key={`savebillbutton${i}`} onClick={() => saveBill === item ? setsaveBill('') : setsaveBill(item)} className={saveBill === item ? 'active-btn' : 'btn-sucess'}>{item}</button>
            )}
          </div>
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro'>
            <Link onClick={() => Submit()}> {type==='dth-Recharge'? operator?.id != '12' ? 'Pay Bill' : 'Proceed' : 'Proceed'}</Link>
            {/* <Link to={"/bill-detail"}>Proceed</Link> */}
          </button>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default DTHRechargeContent
