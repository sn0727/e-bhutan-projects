import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { APIRequest, ApiUrl } from '../../utils/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ValidateEmail, ValidateOtp, ValidateOtp4, ValidatePassword, ValidatePhone } from '../../utils/validation';
import Loader from '../Feature/Loader';
import jwt_decode from "jwt-decode";
import BackButton  from '../Button/BackButton'


const ChangePassword = () => {
  const navigate = useNavigate();
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false)
  const [Id, setId] = useState('')

  const ResetPass = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.changePassword}`,
      method: 'post',
      body: {
        id: Id,
        oldPassword: CurrentPassword,
        password: password,
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res?.message)
        navigate("/home")
        setisLoading(false)
      },
      err => {
        console.log(err);
        toast.error(err?.message)
        setisLoading(false)
      }
    );
  }

  function getId() {
    const token = localStorage.getItem('token')
    let decoded = jwt_decode(token);
    console.log(decoded);
    setId(decoded.user.id)
  }

  useEffect(() => {
    getId()
  }, [])





  const submitHandler = (event) => {
    event.preventDefault();
    if (!ValidatePassword(password)) {
      toast.error('Password format is incorrect. Please ensure it meets the required criteria.')
      return true
    }
    ResetPass()
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className='pt-5 ps-5'>
      <BackButton link={"home"} /> 
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                <input type="password"
                  value={CurrentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
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
          </div>
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </section>

  )
}

export default ChangePassword
