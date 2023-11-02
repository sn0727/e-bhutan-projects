import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { APIRequest, ApiUrl } from '../../utils/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ValidateEmail, ValidateOtp, ValidateOtp4, ValidatePassword, ValidatePhone } from '../../utils/validation';
import Loader from '../Feature/Loader';


const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailOrNumber2 = location?.state?.emailOrNumber;
  const [emailOrNumber, setEmailOrNumber] = useState(emailOrNumber2);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const ResetPass = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.resetPassword}`,
      method: 'post',
      body: {
        data: emailOrNumber,
        password: password,
        OTP: otp
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        navigate("/reset-password-success")
        setisLoading(false)
      },
      err => {
        console.log(err);
        toast.error(err?.message)
        setisLoading(false)
      }
    );
  }
  const ResendOtp = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.resendOTP}`,
      method: 'post',
      body: {
        data: emailOrNumber,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        setisLoading(false)
      },
      err => {
        console.log(err);
        toast.error(err?.message)
        setisLoading(false)
      }
    );

  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!ValidateEmail(emailOrNumber) && !ValidatePhone(emailOrNumber)) {
      toast.error('Please enter valid mobile no or email!')
      return true
    }
    if (!ValidateOtp4(otp)) {
      toast.error('Please enter valid OTP!')
      return true
    }
    if (!ValidatePassword(password)) {
      toast.error('Password format is incorrect. Please ensure it meets the required criteria.')
      return true
    }
    ResetPass()
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password Enter Detail
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="text"
                  value={emailOrNumber}
                  onChange={(e) => setEmailOrNumber(e.target.value)}
                  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="opt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                <input type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  name="opt" id="opt" maxLength={4} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2222" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <p>Password must contain the following:</p>
                <p>1. A <b>lowercase</b> letter</p>
                <p>2. A <b>capital (uppercase)</b> letter</p>
                <p>3. A <b>number</b></p>
                <p>4. Minimum <b>8 characters</b></p>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
            </form>
            <p>Did't get the otp <button  onClick={()=> ResendOtp()} className='font-weight-bold rounded px-1  ' style={{color:'#2c427d', fontWeight:700}}>RESEND OTP</button></p>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default ResetPassword
