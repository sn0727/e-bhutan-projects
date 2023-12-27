import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import "../css/CompanyInformation.css"
import { RadioButton } from '../../../components/Feature/RadioButton'

const ContactForm = ({ setIdComponent }) => {
    const [type, settype] = useState('1');
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option
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
        setSelectedOption(null)
    };

    return (
        <LayoutContainer>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Company Information</p>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6">
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <label htmlFor="fistname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
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
                            </div>
                            <div className='formGroup'>
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
                            <div className='radia-button'>
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="1"
                                    isSelected={type === "1"}
                                    label="One person registeration"
                                    value="1"
                                    className={'custome_class'}
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={type === "2"}
                                    label="Pvt. Ltd. registration"
                                    value="2"
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="3"
                                    isSelected={type === "3"}
                                    label="LLP registration"
                                    value="3"
                                />
                            </div>
                            <button type="submit"
                            onClick={()=> setIdComponent(2)}
                                className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    )
}

export default ContactForm