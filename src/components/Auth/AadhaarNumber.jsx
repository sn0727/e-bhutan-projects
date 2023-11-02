import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { APIRequest, ApiUrl } from '../../utils/api';
import { toast } from 'react-toastify';
import { ValidateAadhaar, ValidatePhone } from '../../utils/validation';
import { position } from '@chakra-ui/react';
import Loader from '../Feature/Loader';

const AadhaarNumber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location.state;
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!ValidateAadhaar(aadhaarNumber)) {
      toast.error('Please enter valid aadhaar no!')
      return true
    }
    setisLoading(true)
    let config = {
      url: ApiUrl.aadhaarWithOTP,
      method: 'post',
      body: {
        id_number: aadhaarNumber,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        navigate("/aadhaar-verification", { state: { number: previousData?.number, aadhaar: aadhaarNumber, client_id: res?.data?.data?.client_id } })
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err?.message)

      }
    );

  }

  useEffect(() => {
    if (!previousData?.number) {
      navigate('/signup')
    }
  }, [])


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
                <label htmlFor="aadhaarNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Aadhaar No.</label>
                <input type="text"
                  maxLength={12}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  name="aadhaarNumber" id="aadhaarNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="773781169955" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
              
            </form>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default AadhaarNumber
