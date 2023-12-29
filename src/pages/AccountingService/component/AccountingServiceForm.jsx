import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
import { RadioButton, RadioButton3, RadioButton4, RadioButton5 } from '../../../components/Feature/RadioButton'
import { InputCustome } from '../../../components/Input/InputFeild';
import { emailValidation, mobileNoValidation, nameValidation, postalCodeValidation } from '../../../components/Validation';
import BackButton from '../../../components/Button/BackButton';
import { APIRequest, ApiUrl } from '../../../utils/api';
import { toast } from 'react-toastify';

const AccountingServiceForm = ({ setIdComponent }) => {
    const [type, settype] = useState('Personal');
    const [type1, settype1] = useState('Less than 2.5 Lakhs');
    const [type2, settype2] = useState('Auditing');
    const [type3, settype3] = useState('One-off');
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option
    const [formationFormValue, setFormationFormValue] = useState({
        fullname: '',
        email: '',
        mobileNo: '',
        Address: '',
    })

    // reset value from the form.
    const resetValue = () => {
        setFormationFormValue({
            fullname: '',
            email: '',
            mobileNo: '',
            Address: '',
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

    // Accounting formation function.
    const accountingFormation = () => {
        let config = {
            url: ApiUrl?.accountingService,
            method: 'post',
            body: {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "Address": formationFormValue?.Address,
                "BusinessType":type,
                "Income": type1,
                "ServiceType": type2,
                "EmployeeType":type3
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
            accountingFormation()
            console.log('formationFormValue', formationFormValue)
            console.log('type', type)
            console.log('type1', type1)
            console.log('type2', type2)
            console.log('type3', type3)
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
                    <p className='company-infomation-dd'>Accounting Services</p>
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
                                        placeholderTitle={'Address'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.Address}
                                        name='Address'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                            </div>
                            {/*  >Accounting Service */}
                            <div className='radia-button'>
                                <p className='mb-3'>Accounting Service</p>
                                {
                                    badioButtonArr?.AccountingService?.map((item, i) => (
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
                            {/*  What is your approximate annual income before tax */}
                            <div className='radia-button'>
                                <p className='mb-3'>What is your approximate annual income before tax</p>
                                {
                                    badioButtonArr?.annualIncome?.map((item, i) => (
                                        <RadioButton3
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
                            {/*  Which accounting services do you need? */}
                            <div className='radia-button'>
                                <p className='mb-3'>Which accounting services do you need?</p>
                                {
                                    badioButtonArr?.accountingServices?.map((item, i) => (
                                        <RadioButton4
                                            changed={radioChangeHandler2}
                                            id={item?.id}
                                            isSelected={type2 === item?.id}
                                            label={item?.id}
                                            value={item?.id}
                                            className={item?.className}
                                        />
                                    ))
                                }

                            </div>
                            {/*  How often do you need accountancy services? */}
                            <div className='radia-button'>
                                <p className='mb-3'>How often do you need accountancy services?</p>
                                {
                                    badioButtonArr?.accountancyServices?.map((item, i) => (
                                        <RadioButton5
                                            changed={radioChangeHandler3}
                                            id={item?.id}
                                            isSelected={type3 === item?.id}
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

export default AccountingServiceForm

//  i used id key multiple value for example : id, label, value, isSelected 
const badioButtonArr = {
    "AccountingService": [
        {
            id: 'Personal',
            className: 'custome_class'
        },
        {
            id: 'Business',
            className: 'custome_class'
        },
        {
            id: 'eCommerce business',
            className: 'custome_class'
        }
    ],
    "annualIncome": [
        {
            id: 'Less than 2.5 Lakhs',
            className: 'custome_class'
        },
        {
            id: '2.5 Lakhs - 4.9 Lakhs',
            className: 'custome_class'
        },
        {
            id: '5 Lakhs - 9.9 Lakhs',
            className: 'custome_class'
        },
        {
            id: '10 Lakhs - 14.9 Lakhs',
            className: 'custome_class'
        },
        {
            id: '15 Lakhs - 49 Lakhs',
            className: 'custome_class'
        },
        {
            id: 'More than 50 Lakhs',
            className: 'custome_class'
        },
        {
            id: 'Prefer not to say',
            className: 'custome_class'
        }
    ],
    "accountingServices": [
        {
            id: 'Auditing',
            className: 'custome_class'
        },
        {
            id: 'Bookkeeping',
            className: 'custome_class'
        },
        {
            id: 'GST Return',
            className: 'custome_class'
        },
        {
            id: 'Managing accounts receivable and payable',
            className: 'custome_class'
        },
        {
            id: 'Preparing tax returns',
            className: 'custome_class'
        },
        {
            id: 'Tax advice',
            className: 'custome_class'
        }
    ],
    "accountancyServices": [
        {
            id: 'One-off',
            className: 'custome_class'
        },
        {
            id: 'Once a year',
            className: 'custome_class'
        },
        {
            id: 'Quaterly',
            className: 'custome_class'
        },
        {
            id: 'Monthly',
            className: 'custome_class'
        },
        {
            id: 'Full time - Employee',
            className: 'custome_class'
        }
    ]
}