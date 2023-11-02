import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { APIRequest, ApiUrl } from '../../utils/api';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import Loader from '../Feature/Loader';


const AadhaarVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location.state;
  const [otp, setOtp] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [client_id1, setclient_id1] = useState(previousData?.client_id)

  const accountVerify = () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.verifyAadhaarOTP,
      method: 'post',
      body: {
        otp: otp,
        client_id: client_id1
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false);
        toast.success(res?.message)
        navigate("/registration", { state: { number: previousData?.number, aadhaar: previousData?.aadhaar } })
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err?.message)
      }
    );
  }
  const ResendOtp = async () => {
    setisLoading(true)
    let config = {
      url: ApiUrl.aadhaarWithOTP,
      method: 'post',
      body: {
        id_number: previousData?.aadhaar,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        setclient_id1(res?.data?.data?.client_id)
        setisLoading(false)
      },
      err => {
        console.log(err);
        toast.error(err?.message)
        setisLoading(false)
      }
    );

  }

  useEffect(() => {
    if (!previousData?.aadhaar && !previousData?.number && !previousData?.client_id) {
      navigate('/aadhaar-number')
    }
  }, [])

  const submitHandler = (event) => {
    event.preventDefault();
    accountVerify();
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Account Verification
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="opt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                <input type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  name="opt" id="opt" maxLength={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="225553" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
            </form>
            <p>Did't get the otp <button onClick={() => ResendOtp()} className='font-weight-bold rounded px-1  ' style={{ color: '#2c427d', fontWeight: 700 }}>RESEND OTP</button></p>

          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default AadhaarVerification
