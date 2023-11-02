import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ResetPasswordLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailOrNumber = location?.state?.emailOrNumber;
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="space-y-4 md:space-y-6 resetPasswordSucess">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                I have send link on your mail id
              </h1>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" aria-hidden="true" class="inline-block w-32 text-success"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Link Sent
              </h1>
              <p class="text-gray-500 dark:text-gray-400">Check your email to reset password</p>
              <button 
              onClick={()=> navigate("/reset-password", {state:{emailOrNumber:emailOrNumber}})}
              type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">
                <Link>Reset Password</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordLink
