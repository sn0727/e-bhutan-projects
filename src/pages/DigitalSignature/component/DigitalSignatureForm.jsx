import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import { RadioButton } from '../../../components/Feature/RadioButton';

const DigitalSignatureForm = ({ setIdComponent }) => {
    const [type, settype] = useState('1');
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
    const radioChangeHandler = (e) => {
        settype(e.target.value);
    };

    console.log('type', type)

    return (
        <LayoutContainer>
            <div className='tab-bar-ser'>
                <div className='radia-button tab-bar-ser-new'>
                    <RadioButton
                        changed={radioChangeHandler}
                        id="1"
                        isSelected={type === "1"}
                        label="Class 1"
                        value="1"
                        className={'custome_class'}
                    />
                    <RadioButton
                        changed={radioChangeHandler}
                        id="2"
                        isSelected={type === "2"}
                        label="Class 2"
                        value="2"
                    />
                    <RadioButton
                        changed={radioChangeHandler}
                        id="3"
                        isSelected={type === "3"}
                        label="Class 3"
                        value="3"
                    />
                </div>
            </div>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Digital Signature</p>
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
                                <div className='w-50'>
                                    <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Pin Code"
                                        name='pinCode'
                                        required />
                                </div>
                            </div>
                            {/* 2 row */}
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="PanNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PanNo</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Pan No'
                                        name='PanNo'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
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
                                <div className='w-50'>
                                    <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Pin Code"
                                        name='pinCode'
                                        required />
                                </div>
                            </div>

                            {/* 3 row */}
                            <div className="formGroup">
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
                                <div className='w-50'>
                                    <label htmlFor="BlockNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flat/Door/Block No.</label>
                                    <input type="number"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Flat/Door/Block No."
                                        name='BlockNo'
                                        required />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="PostOffice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Road/Street/Post Office</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Road/Street/Post Office'
                                        name='PostOffice'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="areaLocality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area / Locality</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Area / Locality"
                                        name='areaLocality'
                                        required />
                                </div>
                            </div>

                            {/* 4 row */}
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="townCityDis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Town / City / District</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Town / City / District'
                                        name='townCityDis'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="stateValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                    <input type="number"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="State"
                                        name='stateValue'
                                        required />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Country'
                                        name='country'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                                    <input type="number"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Pincode"
                                        name='pinCode'
                                        required />
                                </div>
                            </div>

                            {/* 5 row */}
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="NatureofEmploymen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nature of Employmen</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Nature of Employmen'
                                        name='NatureofEmploymen'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="fieldUs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filed u/s</label>
                                    <input type="number"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Filed u/s"
                                        name='fieldUs'
                                        required />
                                </div>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="FiledResponse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filed in response to</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        placeholder='Filed in response to'
                                        name='FiledResponse'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="dateofFilling" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Filing Original Return</label>
                                    <input type="date"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Date of Filing Original Return"
                                        name='dateofFilling'
                                        required />
                                </div>
                            </div>

                            {/* 6 row */}
                            <div className='formGroup'>
                                <div className='w-50 position-relative'>
                                    <label htmlFor="NatureofEmploymen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Bank Statement</label>
                                    <input type="file"
                                        onChange={handlerInputPesserger}
                                        placeholder='Upload Bank Statement'
                                        name='NatureofEmploymen'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                {/* faltu div use for only space */}
                                <div className='w-50 position-relative'>
                                </div>
                                <div className='w-50 position-relative'>
                                </div>
                                <div className='w-50 position-relative'>
                                </div>
                                {/* faltu div use for only space */}
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

export default DigitalSignatureForm