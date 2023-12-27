import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { RadioButton, RadioButton2 } from '../../../components/Feature/RadioButton'

const PanCardForm = ({ setIdComponent }) => {
    const [type, settype] = useState('1');
    const [type1, settype1] = useState('Individual');
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

    console.log('type1', type1)

    return (
        <LayoutContainer>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Pan Card Information</p>
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
                            <div className='radia-button'>
                                <p className='mb-3'>Application Type</p>
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="1"
                                    isSelected={type === "1"}
                                    label="New Pan - Indian Citizen (Form 49A)"
                                    value="1"
                                    className={'custome_class'}
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={type === "2"}
                                    label="New Pan - Foreign Citizen (Form 49AA)"
                                    value="2"
                                />
                                <RadioButton
                                    changed={radioChangeHandler}
                                    id="3"
                                    isSelected={type === "3"}
                                    label="Changes pr Correction in existing PAN Data/ Reprint of Pan Card ( No changes in existing PAN Data)"
                                    value="3"
                                />
                            </div>
                            <div className='radia-button'>
                                <p className='mb-3'>Category</p>
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category1"
                                    isSelected={type1 === "Individual"}
                                    label="Individual"
                                    value="Individual"
                                    className={'custome_class'}
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category2"
                                    isSelected={type1 === "Association of persons"}
                                    label="Association of persons"
                                    value="Association of persons"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category3"
                                    isSelected={type1 === "Body of individuals"}
                                    label="Body of individuals"
                                    value="Body of individuals"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category4"
                                    isSelected={type1 === "Trust"}
                                    label="Trust"
                                    value="Trust"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category5"
                                    isSelected={type1 === "Limited liability partnership"}
                                    label="Limited liability partnership"
                                    value="Limited liability partnership"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category6"
                                    isSelected={type1 === "Firm"}
                                    label="Firm"
                                    value="Firm"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category7"
                                    isSelected={type1 === "Government"}
                                    label="Government"
                                    value="Government"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category8"
                                    isSelected={type1 === "Hindu Undivided family"}
                                    label="Hindu Undivided family"
                                    value="Hindu Undivided family"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category9"
                                    isSelected={type1 === "Artificial juridicial person"}
                                    label="Artificial juridicial person"
                                    value="Artificial juridicial person"
                                />
                                <RadioButton2
                                    changed={radioChangeHandler1}
                                    id="Category10"
                                    isSelected={type1 === "Local Authority"}
                                    label="Local Authority"
                                    value="Local Authority"
                                />
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

export default PanCardForm