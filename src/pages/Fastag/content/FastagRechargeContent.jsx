import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import { Autocomplete, Box, TextField } from '@mui/material';
import BackButton from '../../../components/Button/BackButton';


const FastagRechargeContent = () => {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(true);
  const [operator, setOperator] = useState(null);
  const [state, setstate] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState('');
  const [Options, setOptions] = useState([]);
  const [saveBill, setsaveBill] = useState('');

  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.fastTagGetOperatorList}`,
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
        operator: operator?.id,
        isSaved: saveBill
      }
    } else {
      body = {
        canumber: ConsumerNumber,
        operator: operator?.id,
      }
    }
    let config = {
      url: ApiUrl.fastTagFetchDetails,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        navigate('/fastag-bill-detail',
          {
            state: {
              data: res.data,
              operator: operator?.id,
              canumber: ConsumerNumber,
              pageLink: "fastag-recharge",
              uri: ApiUrl.fastTagDoRecharge,
              body: {
                operator: operator?.id,
                canumber: ConsumerNumber,
                // amount: res?.data?.amount,
                referenceid: res?.data?.invoiceNo,
                latitude: 27.232,
                longitude: 78.2535,
                mode: 'online',
                consumerId: res?.data?.consumerId,
                invoiceNo: res?.data?.invoiceNo,
                bill_fetch: {
                  // billAmount: res?.data?.amount,
                  // billnetamount: res?.data?.amount,
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
    if (operator?.id) {
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
    SendRequest()
  }, [])
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>FASTag Recharge</h1>
        </div>

        <div className="inputFeild">
          <div className="enter-mobilenum">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className='autocomplete-custom-style'
              getOptionLabel={(Options) => Options.name} // Adjust this according to your API response structure
              options={Options}
              sx={{ width: 300 }}
              size='sm'
              value={operator} // Set the value of Autocomplete to the selected option
              onChange={(event, newValue) => {
                setOperator(newValue); // Update the selected option when an option is selected
              }}
              renderOption={(props, Options) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="25"
                    srcSet={Options.image}
                    src={Options.image}
                    alt=""
                  />
                  {Options.name}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Search FASTag Issuing Bank" />}
            />
          </div>
          <div className="enter-mobilenum select-plan">
            <div className="enter-mobilenum">
              <div className='set-p-relative'>
                <input placeholder='UP16DX0995' type="text" onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                <span className='mt-1'>Please enter Vehicle Number (linked to FASTag) without <br /> spaces. E.g: UP16DX0995</span>
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
          </button>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  )
}

export default FastagRechargeContent
