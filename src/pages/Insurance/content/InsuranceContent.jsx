import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl, SaveBillOption } from '../../../utils/api';
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import { Autocomplete, Box, TextField } from '@mui/material';
import moment from 'moment';
import BackButton from '../../../components/Button/BackButton';

const InsuranceContent = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    const [operator, setOperator] = useState(null);
    const [ConsumerNumber, setConsumerNumber] = useState('');
    const [Options, setOptions] = useState([]);
    const [saveBill, setsaveBill] = useState('');
    const [Email, setEmail] = useState('')
    const [datePicker, setDate] = useState('')
    const [Mobile, setMobile] = useState('')
    const [VehicleRegNo, setVehicleRegNo] = useState('')
    const [quoteID, setQuoteID] = useState('')

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.insuranceEMIgetOperatorList}`,
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
        let config = {
            url: ApiUrl.emiFetchInsuranceDetails,
            method: 'post',
            body: {
                canumber: ConsumerNumber,
                operator: operator?.id,
                mode: "online",
                ad1: operator?.ad1_name === 'dateofBirth' ? datePicker : operator?.ad1_name === 'emailId' ? Email : operator?.ad1_name === 'mobileNumber' ? Mobile : operator?.ad1_name === 'VehicleRegNo' ? VehicleRegNo : operator?.ad1_name === 'quoteID' ? quoteID : undefined,
                ad2: operator?.ad2_name === 'dateofBirth' ? datePicker : operator?.ad2_name === 'emailId' ? Email : operator?.ad2_name === 'mobileNumber' ? Mobile : undefined,
                ad3: operator?.ad3_name === 'dateofBirth' ? datePicker : operator?.ad3_name === 'emailId' ? Email : operator?.ad3_name === 'mobileNumber' ? Mobile : undefined,
                isSaved: saveBill ? saveBill : undefined
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setisLoading(false)
                navigate('/bill-detail',
                    {
                        state: {
                            data: res?.data,
                            operator: operator?.id,
                            canumber: ConsumerNumber,
                            pageLink: "insurance-emi-payment",
                            uri: ApiUrl.emiPayInsurance,
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
                    // toast.error("There seems to be some issue at lender end. Please try after some time")
                }
            }
        );
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (false)
        }
        toast.error('Please enter valid email address!');
        return (true)
    }
    function ValidateNumber(number) {
        if (/^\+?[1-9][0-9]{7,14}$/.test(number)) {
            return (false)
        }
        toast.error('Please enter valid mobile no!');
        return (true)
    }

    const Submit = () => {
        if (!operator) {
            toast.error('Insurer must be require!');
            return;
        }
        if (!ConsumerNumber) {
            toast.error('Insurance Number must be require!');
            return;
        }
        if (operator?.ad1_name === 'emailId' || operator?.ad2_name === 'emailId' || operator?.ad3_name === 'emailId') {
            if (!Email) {
                toast.error('Email must be require!');
                return (true);
            }
            if (ValidateEmail(Email)) {
                return (true);
            }
        }
        if (operator?.ad1_name === 'dateofBirth' || operator?.ad2_name === 'dateofBirth' || operator?.ad3_name === 'dateofBirth') {
            if (!Date) {
                toast.error('DOB must be require!');
                return (true);
            }
        }

        if (operator?.ad1_name === 'mobileNumber' || operator?.ad2_name === 'mobileNumber' || operator?.ad3_name === 'mobileNumber') {
            if (!Mobile) {
                toast.error('Mobile no must be require!');
                return (true);
            }
            if (ValidateNumber(Mobile)) {
                return (true);
            }
        }
        if (operator?.ad1_name === 'VehicleRegNo' || operator?.ad2_name === 'VehicleRegNo' || operator?.ad3_name === 'VehicleRegNo') {
            if (!VehicleRegNo) {
                toast.error('Vehicle RegNo. must be require!');
                return (true);
            }
        }
        if (operator?.ad1_name === 'quoteID' || operator?.ad2_name === 'quoteID' || operator?.ad3_name === 'quoteID') {
            if (!quoteID) {
                toast.error('Quote must be require!');
                return (true);
            }
        }
        SendRequest1()
    }

    useEffect(() => {
        SendRequest()
    }, [])
    return (
        <>
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <BackButton link={"home"} />
                    <h1>Insurance EMI Payment</h1>
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
                            renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select Service Provider" />}
                        />
                        <span>Please select your insurer </span>
                    </div>
                    <div className="enter-mobilenum select-plan">
                        <div className="enter-mobilenum">
                            <div className='set-p-relative'>
                                <input type="number" placeholder='1234567890' onChange={(e) => setConsumerNumber(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                                <span className='mt-1'>Please enter your insurance number.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inputFeild ">
                    {
                        operator?.ad1_name === 'emailId' || operator?.ad2_name === 'emailId' || operator?.ad3_name === 'emailId' ?

                            <div className="enter-mobilenum select-plan py-5">
                                <div className="enter-mobilenum">
                                    <div className='set-p-relative'>
                                        <input type="email" placeholder='sam@gmail.com'
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='enter-mobile-num bg-white border-cs InputTextColor'
                                            defaultValue={''}
                                            required />
                                        <span className='mt-1'>Please enter your email.</span>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    {
                        operator?.ad1_name === 'dateofBirth' || operator?.ad2_name === 'dateofBirth' || operator?.ad3_name === 'dateofBirth' ?
                            <div className="enter-mobilenum select-plan py-5">
                                <div className="enter-mobilenum">
                                    <div className='set-p-relative'>
                                        <input type="text" placeholder='' onChange={(e) => setDate(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' defaultValue={''} />
                                        {operator?.ad1_name === 'dateofBirth' ? <span className='mt-1'> {operator?.ad1_d_name}</span> : null}
                                        {operator?.ad2_name === 'dateofBirth' ? <span className='mt-1'> {operator?.ad2_d_name}</span> : null}
                                        {operator?.ad3_name === 'dateofBirth' ? <span className='mt-1'>{operator?.ad3_d_name}</span> : null}
                                    </div>
                                </div>
                            </div> : null
                    }

                </div>
                <div className="inputFeild ">
                    {
                        operator?.ad1_name === 'mobileNumber' || operator?.ad2_name === 'mobileNumber' || operator?.ad3_name === 'mobileNumber' ?
                            <div className="enter-mobilenum select-plan py-5">
                                <div className="enter-mobilenum">
                                    <div className='set-p-relative'>
                                        <input type="text" placeholder='7737811622'
                                            onChange={(e) => setMobile(e.target.value)}
                                            className='enter-mobile-num bg-white border-cs InputTextColor'
                                            defaultValue={''}
                                            required />
                                        <span className='mt-1'>Please enter your mobile no.</span>
                                    </div>
                                </div>
                            </div> : null
                    }
                    {
                        operator?.ad1_name === 'VehicleRegNo' || operator?.ad2_name === 'VehicleRegNo' || operator?.ad3_name === 'VehicleRegNo' ?
                            <div className="enter-mobilenum select-plan py-5">
                                <div className="enter-mobilenum">
                                    <div className='set-p-relative'>
                                        <input type="text" placeholder='DL99TLXXXX'
                                            onChange={(e) => setVehicleRegNo(e.target.value)}
                                            className='enter-mobile-num bg-white border-cs InputTextColor'
                                            defaultValue={''}
                                            required />
                                        <span className='mt-1'>Enter wheeler number to get quote</span>
                                    </div>
                                </div>
                            </div> : null
                    }

                </div>
                <div className="inputFeild">
                    {
                        operator?.ad1_name === 'quoteID' || operator?.ad2_name === 'quoteID' || operator?.ad3_name === 'quoteID' ?

                            <div className="enter-mobilenum select-plan py-5">
                                <div className="enter-mobilenum">
                                    <div className='set-p-relative'>
                                        <input type="text" placeholder='Enter quote.'
                                            onChange={(e) => setQuoteID(e.target.value)}
                                            className='enter-mobile-num bg-white border-cs InputTextColor'
                                            defaultValue={''}
                                            required />
                                        <span className='mt-1'>Please Enter quote</span>
                                    </div>
                                </div>
                            </div> : null
                    }
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

export default InsuranceContent;