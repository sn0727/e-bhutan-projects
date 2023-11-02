import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIRequest, ApiUrl } from '../../utils/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ValidateEmail, ValidatePhone } from '../../utils/validation';
import Loader from '../Feature/Loader';


const ForgatePassword = () => {
  const navigate = useNavigate();
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const forgatePass = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.forgotPassword}`,
      method: 'post',
      body: {
        data: emailOrNumber
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        navigate("/send-email", { state: { emailOrNumber: emailOrNumber } })
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
    forgatePass()
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number or Email </label>
                <input type="text"
                  onChange={(e) => setEmailOrNumber(e.target.value)}
                  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number or Email" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Continue</button>
            </form>
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default ForgatePassword
