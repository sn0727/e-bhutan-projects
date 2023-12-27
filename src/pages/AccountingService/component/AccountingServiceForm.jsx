import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import { RadioButton, RadioButton3, RadioButton4, RadioButton5 } from '../../../components/Feature/RadioButton'

const AccountingServiceForm = ({ setIdComponent }) => {
    const [type, settype] = useState('Personal');
    const [type1, settype1] = useState('Less than 2.5 Lakhs');
    const [type2, settype2] = useState('Auditing');
    const [type3, settype3] = useState('One-off');
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
    const radioChangeHandler1 = (e) => {
        settype1(e.target.value);
    };
    const radioChangeHandler2 = (e) => {
        settype2(e.target.value);
    };

    const radioChangeHandler3 = (e) => {
        settype3(e.target.value);
    };

    console.log('type', type1)

    return (
        <LayoutContainer>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Accounting Services</p>
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
                                    <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text"
                                        onChange={handlerInputPesserger}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Address"
                                        name='Address'
                                        required />
                                </div>
                            </div>
                            {/*  >Accounting Service */}
                            <div className='radia-button'>
                                <p className='mb-3'>Accounting Service</p>
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="1"
                                    isSelected={type === "Personal"}
                                    label="Personal"
                                    value="Personal"
                                    className={'custome_class'}
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={type === "Business"}
                                    label="Business"
                                    value="Business"
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="3"
                                    isSelected={type === "eCommerce business"}
                                    label="eCommerce business"
                                    value="eCommerce business"
                                />
                            </div>
                            {/*  What is your approximate annual income before tax */}
                            <div className='radia-button'>
                                <p className='mb-3'>What is your approximate annual income before tax</p>
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="Less than 2.5 Lakhs"
                                    isSelected={type1 === "Less than 2.5 Lakhs"}
                                    label="Less than 2.5 Lakhs"
                                    value="Less than 2.5 Lakhs"
                                    className={'custome_class'}
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="2.5 Lakhs - 4.9 Lakhs"
                                    isSelected={type1 === "2.5 Lakhs - 4.9 Lakhs"}
                                    label="2.5 Lakhs - 4.9 Lakhs"
                                    value="2.5 Lakhs - 4.9 Lakhs"
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="5 Lakhs - 9.9 Lakhs"
                                    isSelected={type1 === "5 Lakhs - 9.9 Lakhs"}
                                    label="5 Lakhs - 9.9 Lakhs"
                                    value="5 Lakhs - 9.9 Lakhs"
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="10 Lakhs - 14.9 Lakhs"
                                    isSelected={type1 === "10 Lakhs - 14.9 Lakhs"}
                                    label="10 Lakhs - 14.9 Lakhs"
                                    value="10 Lakhs - 14.9 Lakhs"
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="15 Lakhs - 49 Lakhs"
                                    isSelected={type1 === "15 Lakhs - 49 Lakhs"}
                                    label="15 Lakhs - 49 Lakhs"
                                    value="15 Lakhs - 49 Lakhs"
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="More than 50 Lakhs"
                                    isSelected={type1 === "More than 50 Lakhs"}
                                    label="More than 50 Lakhs"
                                    value="More than 50 Lakhs"
                                />
                                <RadioButton3
                                    changed={radioChangeHandler1}
                                    id="Prefer not to say"
                                    isSelected={type1 === "Prefer not to say"}
                                    label="Prefer not to say"
                                    value="Prefer not to say"
                                />
                            </div>
                            {/*  Which accounting services do you need? */}
                            <div className='radia-button'>
                                <p className='mb-3'>Which accounting services do you need?</p>
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="Auditing"
                                    isSelected={type2 === "Auditing"}
                                    label="Auditing"
                                    value="Auditing"
                                    className={'custome_class'}
                                />
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="Bookkeeping"
                                    isSelected={type2 === "Bookkeeping"}
                                    label="Bookkeeping"
                                    value="Bookkeeping"
                                />
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="GST Return"
                                    isSelected={type2 === "GST Return"}
                                    label="GST Return"
                                    value="GST Return"
                                />
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="Managing accounts receivable and payable"
                                    isSelected={type2 === "Managing accounts receivable and payable"}
                                    label="Managing accounts receivable and payable"
                                    value="Managing accounts receivable and payable"
                                />
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="Preparing tax returns"
                                    isSelected={type2 === "Preparing tax returns"}
                                    label="Preparing tax returns"
                                    value="Preparing tax returns"
                                />
                                <RadioButton4
                                    changed={radioChangeHandler2}
                                    id="Tax advice"
                                    isSelected={type2 === "Tax advice"}
                                    label="Tax advice"
                                    value="Tax advice"
                                />
                            </div>
                            {/*  How often do you need accountancy services? */}
                            <div className='radia-button'>
                                <p className='mb-3'>How often do you need accountancy services?</p>
                                <RadioButton5
                                    changed={radioChangeHandler3}
                                    id="One-off"
                                    isSelected={type3 === "One-off"}
                                    label="One-off"
                                    value="One-off"
                                    className={'custome_class'}
                                />
                                <RadioButton5
                                    changed={radioChangeHandler3}
                                    id="Once a year"
                                    isSelected={type3 === "Once a year"}
                                    label="Once a year"
                                    value="Once a year"
                                />
                                <RadioButton5
                                    changed={radioChangeHandler3}
                                    id="Quaterly"
                                    isSelected={type3 === "Quaterly"}
                                    label="Quaterly"
                                    value="Quaterly"
                                />
                                <RadioButton5
                                    changed={radioChangeHandler3}
                                    id="Monthly"
                                    isSelected={type3 === "Monthly"}
                                    label="Monthly"
                                    value="Monthly"
                                />
                                <RadioButton5
                                    changed={radioChangeHandler3}
                                    id="Full time - Employee"
                                    isSelected={type3 === "Full time - Employee"}
                                    label="Full time - Employee"
                                    value="Full time - Employee"
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

export default AccountingServiceForm