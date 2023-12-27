import React, { useEffect, useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import BackButton from '../../components/Button/BackButton'
import SimpleInput from '../../components/Input/SimpleInput'
import { InputFeild } from '../../components/Input/InputFeild'
import { APIRequest, ApiUrl } from '../../utils/api'
import TicketButton from '../../components/Button/TicketButton'
import { toast } from 'react-toastify'
import { ValidateOtp6, ValidatePhone } from '../../utils/validation'
import Loader from '../../components/Feature/Loader'
import QRCode from 'react-qr-code'
import styles from "./style/style.module.css"

const QuickDhan = () => {
    const [GetTokenData, setGetTokenData] = useState({})
    const [contactNo, setContactNo] = useState('');
    const [Amount, setAmount] = useState('');
    const [Otp, setOtp] = useState('');
    const [ResData, setResData] = useState({})
    const [isLoading, setisLoading] = useState(false);
    const [QrCode, setQrCode] = useState('')
    const [seconds, setSeconds] = useState(0);
    const [RefId, setRefId] = useState('')



    // getting details from the user token
    const GetByToken = () => {
        let config = {
            url: ApiUrl.userGetByToken,
            method: "get"
        }
        APIRequest(
            config,
            res => {
                setGetTokenData(res?.user)
            },
            err => {
                console.log(err, "================== err")
            }
        )
    }
    // Sen otp for payment
    const SendOtp = () => {
        if (!ValidatePhone(contactNo)) {
            toast.error('Please enter valid mobile no!')
            return true
        }
        if (Amount < 1) {
            toast.error('Please enter amount!')
            return true
        }
        setisLoading(true)
        let config = {
            url: ApiUrl.dhanSendOTP,
            method: "post",
            body: {
                mobile: contactNo,
                merchant_name: GetTokenData?.name,
                customer_name: GetTokenData?.name,
                amount: Amount,
                address: GetTokenData?.address,
                purpose: 'For Banking Purpose',
                pincode: GetTokenData?.postalCode
            }
        }
        setAmount('')
        setContactNo('')
        APIRequest(
            config,
            res => {
                console.log(res?.data);
                setResData(res?.data?.data)
                toast.success(res?.message)
                setisLoading(false)
            },
            err => {
                console.log(err, "================== err")
                setisLoading(false)

                toast.error(err?.message)
            }
        )
    }
    // Get QrCode
    const GetQrCode = () => {
        if (!ValidateOtp6(Otp)) {
            toast.error('Please enter otp!')
            return true
        }
        setisLoading(true)
        let config = {
            url: ApiUrl.dhanVerifyOTP,
            method: "post",
            body: {
                refid: ResData?.refid,
                mobile: ResData?.mobile,
                merchant_code: ResData?.merchant_code,
                merchant_name: ResData?.merchant_name,
                customer_name: ResData?.customer_name,
                amount: ResData?.amount,
                address: ResData?.address,
                purpose: ResData?.purpose,
                pincode: ResData?.pincode,
                otp_refid: ResData?.otp_refid,
                otp: Otp
            }
        }
        setOtp('')
        setResData({})
        APIRequest(
            config,
            res => {
                console.log(res?.data);
                setQrCode(res?.data?.qr_link)
                toast.success(res?.message)
                setRefId(res?.data?.refid)
                setSeconds(30)
                setisLoading(false)
            },
            err => {
                console.log(err, "================== err")
                setisLoading(false)
                toast.error(err?.message)
            }
        )
    }
    // Check payment status
    const CheckPaymentStatus = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.dhanCheckStatus,
            method: "post",
            body: {
                refid: RefId,
            }
        }
        setRefId('')
        APIRequest(
            config,
            res => {
                console.log(res?.data);
                toast.success(res?.message)
                setisLoading(false)
            },
            err => {
                console.log(err, "================== err")
                setisLoading(false)
                toast.error(err?.message)
            }
        )
    }

    useEffect(() => {
        GetByToken()
    }, [])

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
                if (seconds == 1) {
                    CheckPaymentStatus()
                }

            }, 1000);

            // To clear the interval when the component unmounts or when seconds becomes 0
            return () => clearInterval(intervalId);
        }

        // if (seconds == 1) {
        //     setisLoading(true)
        //     const CheckStatus = setInterval(() => {
        //         CheckPaymentStatus()
        //     }, 1000 * 15);
        //     // To clear the interval when the component unmounts or when seconds becomes 0
        //     return () => clearInterval(CheckStatus);
        // }


        if (seconds === 0) {
            setQrCode('');
        }
    }, [seconds, setQrCode]);

    return (
        <>
            <Header />
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <BackButton link={"home"} />
                    <h1>UPI Cash Withdrawal</h1>
                </div>
                <div className="comman-container px-4">
                    <div className='button-process'>
                        {QrCode ?
                            <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%", padding: "20px" }}>
                                <p className={styles.textAddmon} style={{ paddingTop: '10px', fontSize: 20, marginBottom: 20 }}>Scan and pay</p>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={QrCode}
                                    viewBox={`0 0 256 256`}
                                />
                                <p className={styles.textAddmon} style={{ paddingTop: '10px' }}>The QR code is valid for {seconds} seconds</p>
                            </div>
                            :
                            ResData?.refid ?
                                <div style={{ maxWidth: 400, margin: 'auto' }}>
                                    <InputFeild
                                        type={'number'}
                                        PlaceHolderTitle={'Enter otp'}
                                        InputFeildValue={Otp}
                                        setInputFeildValue={setOtp}
                                        disc={'Please enter otp'}
                                    />

                                    <div className='py-3'>
                                        <TicketButton isActive={true} lable='Verify otp' onClick={() => GetQrCode()} />
                                    </div>

                                </div>
                                :
                                <div style={{ maxWidth: 400, margin: 'auto' }}>
                                    <InputFeild
                                        type={'number'}
                                        PlaceHolderTitle={'Enter mobile number'}
                                        InputFeildValue={contactNo}
                                        setInputFeildValue={setContactNo}
                                        disc={'Please enter your mobile number'}
                                    />
                                    <InputFeild
                                        type={'number'}
                                        PlaceHolderTitle={'Enter amount'}
                                        InputFeildValue={Amount}
                                        setInputFeildValue={setAmount}
                                        disc={'Please enter amount (multiple of 100)'}
                                    />

                                    <div className='py-3'>
                                        <TicketButton isActive={true} lable='Submit' onClick={() => SendOtp()} />
                                    </div>

                                </div>
                        }

                    </div>

                </div>
                <Loader isLoading={isLoading} />
            </div>
            <Footer />
        </>
    )
}

export default QuickDhan