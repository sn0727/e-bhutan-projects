import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { RadioButton, RadioButton2 } from '../../../components/Feature/RadioButton'
import { AadhaarEnrolmentID, AadhaarNoValidation, emailValidation, mobileNoValidation, nameValidation, postalCodeValidation, validateDateFormat } from '../../../components/Validation';
import { InputCustome } from '../../../components/Input/InputFeild';
import BackButton from '../../../components/Button/BackButton';

const PanCardForm = ({ setIdComponent }) => {
    const [type, settype] = useState('New Pan - Indian Citizen (Form 49A)');
    const [type1, settype1] = useState('Individual');
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
            DateofBirth: ''
        })
    }

    // get input value funcation
    const handleInputChange = (event) => {
        setFormationFormValue({ ...formationFormValue, [event.target.name]: event.target.value })
    }

    const radioChangeHandler = (e) => {
        settype(e.target.value);
    };

    const radioChangeHandler1 = (e) => {
        settype1(e.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (
            nameValidation(formationFormValue?.fullname) &&
            emailValidation(formationFormValue?.email) &&
            mobileNoValidation(formationFormValue?.mobileNo) &&
            AadhaarNoValidation(formationFormValue?.AadhaarNo) &&
            validateDateFormat(formationFormValue?.DateofBirth)
        ) {
            console.log('formationFormValue', formationFormValue)
            console.log('type', type)
            console.log('type', type1)
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
                    <p className='company-infomation-dd'>Pan Card Creation</p>
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
                            <div className='radia-button'>
                                <p className='mb-3'>Application Type</p>
                                {
                                    badioButtonArr?.ApplicationType?.map((item, i) => (
                                        <RadioButton
                                            changed={radioChangeHandler}
                                            id={item?.id}
                                            isSelected={type === item?.id}
                                            label={item?.id}
                                            value={item?.id}
                                            className={item?.className}
                                        />
                                    ))
                                }
                            </div>
                            <div className='radia-button'>
                                <p className='mb-3'>Category</p>
                                {
                                    badioButtonArr?.Category?.map((item, i) => (
                                        <RadioButton2
                                            changed={radioChangeHandler1}
                                            id={item?.id}
                                            isSelected={type1 === item?.id}
                                            label={item?.id}
                                            value={item?.id}
                                            className={item?.className}
                                        />
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

export default PanCardForm

//  i used id key multiple value for example : id, label, value, isSelected 
const badioButtonArr = {
    "ApplicationType": [
        {
            id: 'New Pan - Indian Citizen (Form 49A)',
            className: 'custome_class'
        },
        {
            id: 'New Pan - Foreign Citizen (Form 49AA)',
            className: 'custome_class'
        },
        {
            id: 'Changes pr Correction in existing PAN Data/ Reprint of Pan Card ( No changes in existing PAN Data)',
            className: 'custome_class'
        }
    ],
    "Category": [
        {
            id: 'Individual',
            className: 'custome_class'
        },
        {
            id: 'Association of persons',
            className: 'custome_class'
        },
        {
            id: 'Trust',
            className: 'custome_class'
        },
        {
            id: 'Limited liability partnership',
            className: 'custome_class'
        },
        {
            id: 'Firm',
            className: 'custome_class'
        },
        {
            id: 'Body of individuals',
            className: 'custome_class'
        },
        {
            id: 'Government',
            className: 'custome_class'
        },
        {
            id: 'Hindu Undivided family',
            className: 'custome_class'
        },
        {
            id: 'Artificial juridicial person',
            className: 'custome_class'
        },
        {
            id: 'Local Authority',
            className: 'custome_class'
        }
    ]
}