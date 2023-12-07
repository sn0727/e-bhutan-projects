import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { APIRequest, ApiUrl, Statelist } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../Feature/Loader';
import { ValidateEmail, ValidatePan, ValidateZipCode } from '../../utils/validation';
import TermsConditionModel from '../TermsConditionModel';
import { Autocomplete, TextField } from '@mui/material';
const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location?.state;

  const userId = location?.state?.userId;
  const token = location?.state?.token;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [panNo, setPanNo] = useState('');
  const [state, setstate] = useState('')
  const [district, setdistrict] = useState('')
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [Role, setRole] = useState('')
  const [adminId, setadminId] = useState('')
  const [Image, setImage] = useState('')
  const [isLoading, setisLoading] = useState(false)


  const Registration = async () => {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('contact', previousData?.number);
    fd.append('email', email);
    fd.append('aadharNo', previousData?.aadhaar);
    fd.append('panNo', panNo);
    fd.append('state', state);
    fd.append('district', district);
    fd.append('postalCode', postalCode);
    fd.append('role', Role === 'Franchise' ? 'franchise' : Role === 'Retailer' ? 'retailer' : '');
    fd.append('image', Image);
    if (adminId) {
      fd.append('adminId', adminId);
    }
    setisLoading(true)

    try {

      const result = await axios.post(ApiUrl.userCreate,
        fd,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            token: token
          }
        }
      )
      const { error, message } = result?.data;
      if (!error) {
        setisLoading(false)
        toast.success(message);
        // sessionStorage.setItem("token", token);
        navigate("/")
      }else{
        toast.error(message);
      }
      setisLoading(false)

    } catch (server_error) {
      setisLoading(false)
      const { error, message } = server_error?.response?.data;
      if (error) {
        toast.error(message)
        setisLoading(false)
      }
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!ValidateEmail(email)) {
      toast.error('Please enter valid email!')
      return true
    }
    if (!ValidateZipCode(postalCode)) {
      toast.error('Please enter valid pin code!')
      return true
    }
    if (!state) {
      toast.error('Please enter state!')
      return true
    }
    if (!district) {
      toast.error('Please enter district!')
      return true
    }
    if (!ValidatePan(panNo)) {
      toast.error('Please enter valid pan no!')
      return true
    }

    Registration()

  }
  const statehandleChange = (event, newValue) => {
    setstate({ lable: newValue });
  };

  useEffect(() => {
    if (!previousData?.aadhaar && !previousData?.number) {
      navigate('/aadhaar-number')
    }
  }, [])





  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-5">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div className="formGroup">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text"
                    onChange={(e) => setName(e.target.value)}
                    name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
              </div>

              <div className="formGroup">
                <div>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your District</label>
                  <input type="text"
                    onChange={(e) => setdistrict(e.target.value)}
                    name="district" id="district" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jaipur" required />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Postal Code</label>
                  <input type="text"
                    onChange={(e) => setPostalCode(e.target.value)}
                    name="postalCode" id="postalCode" maxLength={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="110098" required />
                </div>
              </div>
              <div className="formGroup">
                <div className='w-40' >
                  <Autocomplete
                    value={state}
                    onChange={(event, newValue) => {
                      setstate(newValue);
                    }}
                    size='sm'
                    id="controllable-states-demo"
                    options={Statelist}
                    renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select state" />}
                  />
                </div>
                <div className='w-40' >
                  <Autocomplete
                    value={Role}
                    onChange={(event, newValue) => {
                      setRole(newValue);
                    }}
                    size='sm'
                    id="controllable-states-demo"
                    options={['Retailer', 'Franchise', 'User']}
                    renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select role" />}
                  />
                </div>
              </div>
              <div className="formGroup">
                <div>
                  <label htmlFor="panNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Pan No</label>
                  <input type="text"
                    style={{ textTransform: 'uppercase' }}
                    onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                    name="panNo" id="panNo" maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ASDFF1232R" required />
                </div>
                {Role === 'Franchise' || Role === 'Retailer' ? <div>
                  <label htmlFor="refId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distributor Id</label>
                  <input type="text"
                    onChange={(e) => setadminId(e.target.value)}
                    name="refId" id="refId" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="D00001" />
                </div> : null}
              </div>

              <div>
                <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please upload your photo </label>
                <input type="file" multiple accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <TermsConditionModel />
                  {/* <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/terms-conditions">Terms and Conditions</Link></label> */}
                </div>
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

export default Registration
