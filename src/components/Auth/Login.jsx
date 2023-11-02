import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ApiUrl } from '../../utils/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Feature/Loader';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import loginImage from "./../../assets/login/login.jpg"

const Login = () => {
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  // const [isError, setIsError] = useState("")
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  // login function
  const LoginAuthFuncation = async () => {
    setisLoading(true)
    try {
      const result = await axios.post(ApiUrl.login,
        {
          data: emailOrNumber,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { error, message, token } = result.data;
      if (!error) {
        setisLoading(false)
        toast.success(message)
        localStorage.setItem("token", token)
        navigate("/home")
      } else {
        setisLoading(false)
        toast.error(message)
        navigate("/")
      }
    } catch (response_error) {
      const { error, message } = response_error.response.data;
      if (error) {
        setisLoading(false)
        toast.error(message)
      }
    }
  }

  const submitHadler = async (event) => {
    event.preventDefault();
    LoginAuthFuncation();

  }
  const GetToken = async () => {
    let token = await localStorage.getItem("token")
    // console.log(token, 'out condition home');
    if (token) {
      navigate('/home');
    }
  }

  // show password
  const showPassword = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password")
  }
  useEffect(() => {
    GetToken()
  }, [])
  return (
    <section className="bg-gray-50 dark:bg-gray-900  sm:flex">
      <div className='w-full sm:w-1/2 md:w-1/2 lg:h-screen sm:h-screen'>
        <img src={loginImage} alt="login Image" className='imageLogin w-full sm:h-full lg:h-full object-cover' />
      </div>
      <div className="w-full px-2 sm:w-1/2 md:w-1/2 flex justify-center items-center">
        <div className="my-10 w-full sm:w-2/1 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHadler}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number or Email</label>
                <input type="text"
                  onChange={(e) => setEmailOrNumber(e.target.value)}
                  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number or Email" required />
              </div>
              <div className='eye-button-set'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type={showPass}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {showPass === "password" ? <AiOutlineEye onClick={showPassword} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={showPassword} className='eye-icon' />}
              </div>

              <div className="flex items-center justify-between">
                <Link to="/forget-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to="/signup" className="font-bold text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div >
      </div >
      <Loader isLoading={isLoading} />
    </section >

  )
}

export default Login
