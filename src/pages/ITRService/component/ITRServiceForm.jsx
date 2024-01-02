import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { RadioButton, RadioButton2 } from '../../../components/Feature/RadioButton'
import { FaFilePdf } from 'react-icons/fa6'
import { AadhaarEnrolmentID, AadhaarNoValidation, emailValidation, mobileNoValidation, nameValidation, validateDateFormat } from '../../../components/Validation'
import { InputCustome } from '../../../components/Input/InputFeild'
import BackButton from '../../../components/Button/BackButton'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { toast } from 'react-toastify'
import moment from 'moment'

const ITRServiceForm = ({ setIdComponent }) => {
    const [formationFormValue, setFormationFormValue] = useState({
        fullname: '',
        email: '',
        mobileNo: '',
        AadhaarNo: '',
        DateofBirth: ''
    })

    // reset value from the form.
    const resetValue = () => {
        setFormationFormValue({
            fullname: '',
            email: '',
            mobileNo: '',
            AadhaarNo: '',
            AadhaarEnrolmentID: '',
            DateofBirth: ''
        })
    }

    // get input value funcation
    const handleInputChange = (event) => {
        const { value, name } = event.target;

        setFormationFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value
        }))
    }

    // ITR formation function.
    const itrFormation = () => {
        let config = {
            url: ApiUrl?.ITRFormation,
            method: 'post',
            body: {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "AadhaarNo": formationFormValue?.AadhaarNo,
                "DOB": moment(formationFormValue?.fullname).format('dd/mm/yyyy'),
            }

        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setIdComponent(2)
                    resetValue();
                }
            },
            err => {
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    // this function is form submit
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (
            nameValidation(formationFormValue?.fullname) &&
            emailValidation(formationFormValue?.email) &&
            mobileNoValidation(formationFormValue?.mobileNo) &&
            AadhaarNoValidation(formationFormValue?.AadhaarNo) &&
            validateDateFormat(formationFormValue?.DateofBirth)
        ) {
            itrFormation()
        }
    }

    return (
        <LayoutContainer>
            <div className='mobile-recharge'>
                <BackButton link={""} />
            </div>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'> ITR Filing</p>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6">
                            {/* 1 row */}
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
                            </div>
                            {/* 2 row */}
                            <div className="formGroup">
                                <div className='w-50'>
                                    <InputCustome
                                        placeholderTitle={'Aadhaar number'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.AadhaarNo}
                                        name='AadhaarNo'
                                        required={'required'}
                                        type={'number'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Date of Birth'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.DateofBirth}
                                        name='DateofBirth'
                                        required={'required'}
                                        type={'date'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
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

export default ITRServiceForm