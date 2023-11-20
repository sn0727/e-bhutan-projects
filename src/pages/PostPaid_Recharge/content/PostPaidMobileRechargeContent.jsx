import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import { Autocomplete, Box, TextField } from '@mui/material';
import BackButton from '../../../components/Button/BackButton';
import jwtDecode from 'jwt-decode';


const WaterBillContent = () => {
    const usertoken = sessionStorage.getItem('token');
    const usertokenId = jwtDecode(usertoken);
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true);
    const [operator, setOperator] = useState(null);
    const [ConsumerNumber, setConsumerNumber] = useState('');
    const [Options, setOptions] = useState([]);
    const [saveBill, setsaveBill] = useState('');
    const [AddAmount, setAddAmount] = useState('');


    const handleOperator = (event, newValue) => {
        setOperator(newValue)
    }
    const filterData = (OperatorName) => {
        const newFilterData = Options.filter((item) => item.name === OperatorName)
        setOperator(newFilterData[0])
    }

    // calling HLR API AUTO FETCH DETAILS.
    const autoFetchDetails = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.rechargeCheckHLR}`,
            method: 'post',
            body: { number: ConsumerNumber }
        };
        APIRequest(
            config,
            res => {
                console.log(res, "new res");
                filterData(res?.data?.info?.operator)
                // setOperator(res?.data?.info)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.recharPostpaidGetOperatorList}`,
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
            url: ApiUrl.recharPostpaidfetchBill,
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
                            uri: ApiUrl.recharPostpaidpayBill,
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
                                    amount: res?.data?.amount,
                                    name: res?.data?.name,
                                    dueDate: res?.data?.duedate,
                                    ad2: "HDA54518010",
                                    ad3: 'VDA63741379',
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
            url: ApiUrl.recharPostpaidpayBill,
            method: 'post',
            body: {
                operator: operator?.id,
                canumber: ConsumerNumber,
                amount: AddAmount,
                referenceid: invoiceNo,
                latitude: 27.232,
                longitude: 78.2535,
                mode: 'online',
                consumerId: usertokenId?.user?.id,
                invoiceNo: invoiceNo,
                bill_fetch: {
                    amount: AddAmount,
                    name: 'ebhuktan',
                    dueDate: '2021-06-16',
                    ad2: "HDA54518010",
                    ad3: 'VDA63741379',
                }
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

    function ValidateNumber(number) {
        if (/^\+?[1-9][0-9]{7,14}$/.test(number)) {
            return (false)
        }
        toast.error('Please enter valid mobile no!');
        return (true)
    }
    const Submit = () => {
        if (!ConsumerNumber) {
            toast.error('Mobile no must be require!');
            return;
        }
        if (ValidateNumber(ConsumerNumber)) {
            return;
        }
        if (ConsumerNumber) {
            if (operator?.viewbill == '0') {
                SendRequest2()
            } else {
                SendRequest1()
            }
        }
    }

    useEffect(() => {
        if (ConsumerNumber.length === 10) {
            autoFetchDetails()
        }
    }, [ConsumerNumber])


    useEffect(() => {
        SendRequest()
    }, [])
    
    return (
        <React.Fragment>
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <BackButton link={"home"} />
                    <h1>Postpaid Bill  Payment</h1>
                </div>

                <div className="inputFeild">
                    <div className="enter-mobilenum select-plan">
                        <div className="enter-mobilenum">
                            <div className='set-p-relative'>
                                <input type="text" placeholder='Enter Mobile Number.' onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                                {/* <span className='mt-1'>Please enter your 10 digit account number.</span> */}
                            </div>
                            {operator?.viewbill == '0' ? <div className='set-p-relative mt-5'>
                                <input type="text" placeholder='Enter Amount' onChange={(e) => setAddAmount(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                            </div> : null}
                            {operator?.viewbill == '0' ? <span className='mt-1'>Minimum amount : 50</span> : null}
                        </div>
                    </div>
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
                            onChange={handleOperator}
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
                            renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select your PostPaid Operator" />}
                        />
                        {/* <span>Please select your service provider</span> */}
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
                        <Link onClick={() => Submit()}>{operator?.viewbill === '0' ? 'Pay Bill' : 'Proceed'}</Link>
                    </button>
                </div>
                <Loader isLoading={isLoading} />
            </div>
        </React.Fragment>
    )
}

export default WaterBillContent
