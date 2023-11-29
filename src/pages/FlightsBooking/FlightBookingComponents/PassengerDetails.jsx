import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ApiUrl } from '../../../utils/api';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const PassengerDetails = ({setIdComponent}) => {
    const [title, setTitle] = useState('');
    const [fistname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGenger] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [passportNo, setPassportNo] = useState('');
    const [passportExpiryNo, setPassportExpiry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');

    // console.log(fistname, '=========== nnn')

    const Registration = () => {
        alert('click')
    }
    const submitHandler = (event) => {
        event.preventDefault();
        Registration()
    }

    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-5 lg:py-0">
                <div className="border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Passsenger Information
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="fistname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input type="text"
                                        onChange={(event) => setFirstname(event.target.value)}
                                        placeholder='Fist Name'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text"
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Last Name" required />
                                </div>
                            </div>
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="profile-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact No</label>
                                    <input type="text"
                                        onChange={(event) => setContactNo(event.target.value)}
                                        placeholder='Contact No'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id</label>
                                    <input type="text"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email Id"
                                        required />
                                </div>
                            </div>
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <input type="text"
                                        onChange={(e) => setCity(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="DateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
                                    <input type="date"
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Gender</label>
                                    <select name="gender"
                                        style={{ minHeight: '41px' }}
                                        id="gender" onChange={(e) => setGenger(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="select">select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="PassportNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport No</label>
                                    <input type="text"
                                        onChange={(e) => setPassportNo(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Passport No"
                                        required />
                                </div>
                            </div>
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Expiry Data</label>
                                    <input type="date"
                                        onChange={(e) => setPassportExpiry(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Passport Expiry Date"
                                        required />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="AddressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1</label>
                                    <input type="text"
                                        onChange={(e) => setAddressLine1(e.target.value)}
                                        id="AddressLine1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Address Line 1"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="AddressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 2</label>
                                    <input type="text"
                                        onChange={(e) => setAddressLine2(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Address Line 2"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                                onClick={() => setIdComponent(5)}
                            >Contiune</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PassengerDetails
