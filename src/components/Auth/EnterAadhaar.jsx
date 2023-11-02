import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ApiUrl } from '../../utils/api';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';


const EnterAadhaar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_number = location.state.user_number;
  const [opt, setOtp] = useState("");

  const accountVerify = async () => {
    try {
      const resutl = await axios.post(ApiUrl.accountVerification,
        {
          contact: user_number,
          OTP: opt
        }
      )
      const { error, message, token } = resutl.data;
      // decode token
      var decoded = jwt_decode(token);
      // console.log(decoded);
      // console.log()
      if (!error) {
        toast.success(message);
        navigate("/registration", { state: { userId: decoded.user.id } })
      } else {
        toast.error(message);
      }
    } catch (server_error) {
      const { error, message } = server_error.response.data;
      if (error) {
        toast.error(message)
      }
    }
  }

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
                <label htmlFor="opt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter valid OTP</label>
                <input type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  name="opt" id="opt" maxLength={4} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2222" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default EnterAadhaar
