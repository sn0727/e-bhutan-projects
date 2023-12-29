import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import "../css/CompanyInformation.css"
import { RadioButton } from '../../../components/Feature/RadioButton'
import { emailValidation, mobileNoValidation, nameValidation, postalCodeValidation } from '../../../components/Validation'
import { InputCustome } from '../../../components/Input/InputFeild'
import BackButton from '../../../components/Button/BackButton'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { toast } from 'react-toastify'

const ContactForm = ({ setIdComponent }) => {
    const [type, settype] = useState('One person registeration');
    const [formationFormValue, setFormationFormValue] = useState({
        fullname: '',
        email: '',
        mobileNo: '',
        pinCode: '',
    })

    // reset value from the form.
    const resetValue = () => {
        setFormationFormValue({
            fullname: '',
            email: '',
            mobileNo: '',
            pinCode: '',
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
    const radioChangeHandler = (e) => {
        settype(e.target.value);
    };

    // company formation function.
    const companyFormation = () => {
        let config = {
            url: ApiUrl?.companyFormation,
            method: 'post',
            body: {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "PinCode": formationFormValue?.pinCode,
                "Type": type
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

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (
            nameValidation(formationFormValue?.fullname) &&
            emailValidation(formationFormValue?.email) &&
            mobileNoValidation(formationFormValue?.mobileNo) &&
            postalCodeValidation(formationFormValue?.pinCode)
        ) {
            companyFormation()
        }
    }

    return (
        <LayoutContainer>
            <div className='mobile-recharge'>
                <BackButton link={""} />
            </div>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>Company Formation</p>
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
                                    <InputCustome
                                        placeholderTitle={'Pin Code'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.pinCode}
                                        name='pinCode'
                                        required={'required'}
                                        type={'number'}
                                    />
                                </div>
                            </div>
                            <div className='radia-button'>
                                {
                                    badioButtonArr?.map((ele, i) => (
                                        <div key={i}>
                                            <RadioButton
                                                changed={radioChangeHandler}
                                                id={ele?.id}
                                                isSelected={type === ele?.id}
                                                label={ele?.id}
                                                value={ele?.id}
                                                className={ele?.className}
                                            />
                                        </div>
                                    ))
                                }
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

//  i used id key multiple value for example : id, label, value, isSelected 
const badioButtonArr = [
    {
        id: 'One person registeration',
        className: 'custome_class'
    },
    {
        id: 'Pvt. Ltd. registration',
        className: 'custome_class'
    },
    {
        id: 'LLP registration',
        className: 'custome_class'
    }
]
export default ContactForm