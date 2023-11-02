import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIRequest, ApiUrl } from '../../utils/api';
import { toast } from 'react-toastify';
import { ValidatePhone } from '../../utils/validation';
import { position } from '@chakra-ui/react';
import Loader from '../Feature/Loader';

const MobileNumber = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!ValidatePhone(mobileNumber)) {
      toast.error('Please enter valid mobile no!')
      return true
    }
    setisLoading(true)
    let config = {
      url: `${ApiUrl.mobileSendOTP}`,
      method: 'post',
      body: {
        contact: mobileNumber,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        navigate("/account-verification", { state: { number: mobileNumber } })
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );

  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div className='relative'>
                <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Mobile No.</label>
                <p style={{ position: 'absolute', padding: '8px', fontSize: '0.875rem' }}>+91</p>
                <input type="text"
                  style={{ paddingLeft: '40px' }}
                  maxLength={10}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  name="mobileNumber" id="mobileNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7737811699" required />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" onClick={() => setRole(role === "user" ? "retailer" : "user")} aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Are you retailer ?</label>
                  </div>
                </div>
              </div> */}
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you have an account yet? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default MobileNumber
