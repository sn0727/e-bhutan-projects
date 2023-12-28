import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import { emailValidation, mobileNoValidation, nameValidation, postalCodeValidation } from '../../../components/Validation'
import { InputCustome } from '../../../components/Input/InputFeild'
import BackButton from '../../../components/Button/BackButton'

const DesignAndDevelopmentForm = ({ setIdComponent }) => {
    const [formationFormValue, setFormationFormValue] = useState({
        fullname: '',
        email: '',
        mobileNo: '',
        queryMess: ''
    })

    // reset value from the form.
    const resetValue = () => {
        setFormationFormValue({
            fullname: '',
            email: '',
            mobileNo: '',
            queryMess: '',
        })
    }

    // get input value funcation
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormationFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value
        }));
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (
            nameValidation(formationFormValue?.fullname) &&
            emailValidation(formationFormValue?.email) &&
            mobileNoValidation(formationFormValue?.mobileNo)
        ) {
            console.log('formationFormValue', formationFormValue)
            // setIdComponent(2)
            resetValue();
        }
    }


    return (
        <LayoutContainer>
            <div className='mobile-recharge'>
                <BackButton link={""} />
            </div>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Website Design & Development</p>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6">
                            <div className="formGroup">
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Full Name'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.fullname}
                                        name='fullname'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50'>
                                    <InputCustome
                                        placeholderTitle={'Email Address'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.email}
                                        name='email'
                                        required={'required'}
                                        type={'email'}
                                    />
                                </div>
                            </div>
                            <div className='formGroup'>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Mobile Number'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.mobileNo}
                                        name='mobileNo'
                                        required={'required'}
                                        type={'number'}
                                    />
                                </div>
                                <div className='w-50'>
                                    <label htmlFor="queryMess" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your query</label>
                                    <textarea type="text"
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your query"
                                        value={formationFormValue?.queryMess}
                                        name='queryMess'
                                        required />
                                </div>
                            </div>
                            <button type="submit"
                                onClick={formSubmitHandler}
                                className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    )
}

export default DesignAndDevelopmentForm