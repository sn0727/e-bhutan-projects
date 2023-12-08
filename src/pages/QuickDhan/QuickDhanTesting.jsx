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

const QuickDhanTest = () => {
    const [mobileNo, setMobileNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [enterOtp, setEnterOtp] = useState('')
    const [otpResponseData, setOtpResponseData] = useState({})
    const [otpVerifyResponseData, setOtpVerifyResponseData] = useState('')
    const [isLoading, setisLoading] = useState(false);
    const [getToken, setGetToken] = useState({})
    const [activeFeild, setActiveFeild] = useState(false)
    const [generateQrCode, setGenerateQrCode] = useState(false)
    const [seconds, setSeconds] = useState(0);

    // reset data funcation
    const resetStateData = () => {
        setMobileNumber('')
        setAmount('')
        setEnterOtp('')
    }

    // i take token from the token api
    const GetByTokenFun = () => {
        let config = {
            url: ApiUrl?.getByToken,
            method: 'get'
        }
        APIRequest(
            config,
            res => {
                setGetToken(res?.user)
            },
            err => {
                console.log(err, 'quick dhan page')
            }
        )
    }

    // these created is sentOtp funcation
    const sentOTP = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl?.dhanSendOTP,
            method: 'post',
            body: {
                "mobile": mobileNo,
                "merchant_name": getToken?.name,
                "customer_name": getToken?.name,
                "amount": amount,
                "address": getToken?.address,
                "purpose": "For Banking Purpose",
                "pincode": getToken?.postalCode,
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res, 'sentOtp res =============')
                setOtpResponseData(res?.data?.data)
                toast.success(res?.message)
                // resetStateData()
                setActiveFeild(true)
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
                resetStateData()
                setisLoading(false)
                console.log(err, 'sentOtp err =============')
            }
        )
    }

    // these created is sentOtp funcation
    const sentOTPVerify = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl?.dhanVerifyOTP,
            method: 'post',
            body: {
                "refid": otpResponseData?.refid,
                "mobile": mobileNo,
                "merchant_code": getToken?.partnerId,
                "merchant_name": getToken?.name,
                "customer_name": getToken?.name,
                "amount": amount,
                "address": getToken?.address,
                "purpose": "For Banking Purpose",
                "pincode": getToken?.postalCode,
                "otp_refid": otpResponseData?.otp_refid,
                "otp": enterOtp
            }
        }
        APIRequest(
            config,
            res => {
                setOtpVerifyResponseData(res?.data?.qr_link)
                setSeconds(20)
                setGenerateQrCode(true)
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
            }
        )
    }

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            // To clear the interval when the component unmounts or when seconds becomes 0
            return () => clearInterval(intervalId);
        }

        if (seconds === 0) {
            setActiveFeild(false)
            setGenerateQrCode(false)
            resetStateData()
        }
    }, [seconds]);


    useEffect(() => {
        GetByTokenFun()
    }, [])

    return (
        <>
            <Header />
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <BackButton link={"home"} />
                    <h1>Send Money</h1>
                </div>
                <div className="comman-container px-4">
                    <div className='button-process'>
                        {
                            !activeFeild ? (
                                <div style={{ maxWidth: 400, margin: 'auto' }}>
                                    <InputFeild
                                        setInputFeildValue={setMobileNumber}
                                        InputFeildValue={mobileNo}
                                        PlaceHolderTitle={'Enter mobile number.'}
                                        disc={'Please enter your mobile number'}
                                    />
                                    <InputFeild
                                        setInputFeildValue={setAmount}
                                        InputFeildValue={amount}
                                        PlaceHolderTitle={'Enter Amount.'}
                                        disc={'Please enter your Amount.'}
                                    />
                                    <div className='py-3'>
                                        <TicketButton isActive={true} lable='Submit' onClick={() => sentOTP()} />
                                    </div>
                                </div>
                            ) : generateQrCode ? (
                                <>
                                    <p className={styles.textAddmon} style={{ paddingTop: '10px', fontSize: 20, marginBottom: 20 }}>Scan and pay</p>
                                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 164, width: "100%" }}>
                                        <QRCode
                                            size={56}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={otpVerifyResponseData}
                                            // viewBox={`0 0 256 256`}
                                            fgColor={'#2c427d'}
                                        />
                                    </div>
                                    <p className={styles.textAddmon} style={{ paddingTop: '10px' }}>The QR code is valid for {seconds} seconds</p>
                                </>

                            ) : (
                                <div style={{ maxWidth: 400, margin: 'auto' }}>
                                    <InputFeild
                                        setInputFeildValue={setEnterOtp}
                                        InputFeildValue={enterOtp}
                                        PlaceHolderTitle={'Enter valid otp'}
                                        disc={'Please enter your valid otp'}
                                    />
                                    <div className='py-3'>
                                        <TicketButton isActive={true} lable='Submit' onClick={() => sentOTPVerify()} />
                                    </div>
                                </div>
                            )
                        }
                        {/* {
                            generateQrCode && (
                                <div style={{ height: "auto", margin: "0 auto", maxWidth: 164, width: "100%" }}>
                                    <QRCode
                                        size={56}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={otpVerifyResponseData?.qr_link}
                                        // viewBox={`0 0 256 256`}
                                        fgColor={'#2c427d'}
                                    />
                                </div>
                            )
                        } */}
                        {/* <div style={{ height: "auto", margin: "0 auto", maxWidth: 164, width: "100%" }}>
                            <QRCode
                                size={56}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={'value'}
                                // viewBox={`0 0 256 256`}
                                fgColor={'#2c427d'}
                            />
                        </div> */}
                    </div>
                </div>
                <Loader isLoading={isLoading} />
            </div>
            <Footer />
        </>
    )
}

export default QuickDhanTest