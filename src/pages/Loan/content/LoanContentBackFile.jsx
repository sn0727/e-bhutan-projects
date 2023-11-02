import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import { Autocomplete, Box, TextField } from '@mui/material';

const LoanContent = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    const [operator, setOperator] = useState(null);
    const [ConsumerNumber, setConsumerNumber] = useState('');
    const [Options, setOptions] = useState([]);
    const [saveBill, setsaveBill] = useState('');

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.loanEmiPaymentGetOperatorList}`,
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
                mode: "online",
                isSaved: saveBill
            }
        } else {
            body = {
                canumber: ConsumerNumber,
                operator: operator?.id,
                mode: "online",
            }
        }
        let config = {
            url: ApiUrl.loanPaymentfetchLoanEMI,
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
                            operator: operator?.id,
                            canumber: ConsumerNumber,
                            uri: ApiUrl.loanPaymentPayLoanEMI,
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
        if (ConsumerNumber) {
            SendRequest1()
        } else {
            toast.error('Business Partner Number must be require!')
        }
    }


    useEffect(() => {
        SendRequest()
    }, [])
    return (
        <>
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <h1>Enter Loan EMI Details</h1>
                </div>

                <div className="inputFeild">
                    <div className="enter-mobilenum">
                        <Autocomplete
                            disablePortal
                            className='autocomplete-custom-style'
                            id="combo-box-demo"
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
                            renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select Lender" />}
                        />
                        <span>Please select your lender</span>
                    </div>
                    <div className="enter-mobilenum select-plan">
                        <div className="enter-mobilenum">
                            <div className='set-p-relative'>
                                <input type="number" placeholder='Loan Account Number' onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                                <span className='mt-1'>Please enter your valid Loan Account Number</span>
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
        </>
    )
}

export default LoanContent;