import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { RadioButton, RadioButton2 } from '../../../components/Feature/RadioButton'
import { FaFilePdf } from 'react-icons/fa6'

const ITRServiceForm = ({ setIdComponent }) => {
    const [pessengerAddObj, setPessengerAddObj] = useState({
        fullname: '',
        email: '',
        mobileNo: '',
        pinCode: '',
    })

    // get input value funcation
    const handlerInputPesserger = (event) => {
        setPessengerAddObj({ ...pessengerAddObj, [event.target.name]: event.target.value })
    }

    return (
        <LayoutContainer>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'> ITR Information</p>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6">
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Full Name'
                                        name='fullname'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                                    <input type="email"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email Address"
                                        name='email'
                                        required />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="mobileNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Mobile Number'
                                        name='mobileNo'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            {/* 2 row */}
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="Aadhaarnumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aadhaar number</label>
                                    <input type="email"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Aadhaar number"
                                        name='AadhaarNo'
                                        required />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="AadhaarEnrolmentID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aadhaar Enrolment ID</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Aadhaar Enrolment ID'
                                        name='AadhaarEnrolmentID'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="DateofBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                    <input type="date"
                                        onChange={handlerInputPesserger}
                                        placeholder='Date of Birth'
                                        name='DateofBirth'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            {/* 3 row */}
                            <div className="formGroup">
                                <div className='w-50'>
                                    <label htmlFor="UploadBankStatement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Bank Statement</label>
                                    <input type="file"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Upload Bank Statement"
                                        name='UploadBankStatement'
                                        required />
                                    <div className='docment-bx'>
                                        <p className='aadhar-card'><FaFilePdf /> Bank Statement xxx1223xxx99</p>
                                        <p className='aadhar-card'><FaFilePdf /> Bank Statement xxx1223xxx99</p>
                                    </div>
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="AadhaarEnrolmentID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Documents</label>
                                    <input type="file"
                                        onChange={handlerInputPesserger}
                                        placeholder='Upload Documents'
                                        name='UploadDocuments'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                    <div className='docment-bx'>
                                        <p className='aadhar-card'><FaFilePdf /> Aadhaar Card</p>
                                        <p className='aadhar-card'><FaFilePdf /> Form 49AA</p>
                                    </div>
                                </div>
                                <div className='w-50 position-relative'>

                                </div>
                            </div>
                            <button type="submit"
                                onClick={() => setIdComponent(2)}
                                className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    )
}

export default ITRServiceForm