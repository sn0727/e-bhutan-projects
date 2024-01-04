import React, { useEffect, useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { RadioButton, RadioButton2 } from '../../../components/Feature/RadioButton'
import { firstnameFuc, lastnameFuc, middleNameFun, titleFunc, validateDateFormat } from '../../../components/Validation';
import { InputCustome } from '../../../components/Input/InputFeild';
import BackButton from '../../../components/Button/BackButton';
import { APIRequest, APIRequestWithFile, ApiUrl } from '../../../utils/api';
import { toast } from 'react-toastify';

const PanCardForm = ({ setIdComponent }) => {
    const [modeType, setModeType] = useState('P');
    const [title, setTitle] = useState('');
    const [panCardRes, setPanCardRes] = useState({})
    const [statusChecker, setStatus] = useState(false)
    const [generateForm, setGenerateForm] = useState('')
    const [formationFormValue, setFormationFormValue] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        email: ''
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
        setModeType(e.target.value);
    };

    // Website formation function.
    const panCardCreationFun = () => {
        let config = {
            url: ApiUrl?.createGenerateURL,
            method: 'post',
            body: {
                "title": title,
                "firstname": formationFormValue?.firstname,
                "middlename": formationFormValue?.middlename,
                "lastname": formationFormValue?.lastname,
                "mode": modeType,
                "gender": title === "1" ? "male" : title === "2" ? "female" : title === "3" ? "Third Gender" : '',
                "email": formationFormValue?.email,
                "kyctype": "E"
            }

        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setPanCardRes(res?.data)
                    setStatus(true)
                    // setIdComponent(2)
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
            titleFunc(title) &&
            firstnameFuc(formationFormValue?.firstname) &&
            middleNameFun(formationFormValue?.middlename) &&
            lastnameFuc(formationFormValue?.lastname)
        ) {
            panCardCreationFun()
            // setIdComponent(2)
            resetValue();
        }
    }

    const genrateUrlFun = () => {
        let config = {
            url: panCardRes?.data?.url,
            method: 'post',
            body: {
                "encdata" : panCardRes?.data?.encdata
            }

        }
        APIRequestWithFile(
            config,
            res => {
                console.log('res ================ ddgg', res)
                setGenerateForm(res)
                if (!res?.error) {
                    toast.success(res?.message)
                    // setPanCardRes(res)
                    // setIdComponent(2)
                    resetValue();
                }
            },
            err => {
                console.log('err ================ ddgg', err)
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    useEffect(() => {
        if (statusChecker) {
            genrateUrlFun()
        }
    }, [statusChecker])

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
                                <div className='w-50'>
                                    <label for="exampleSelect" className='d-block'>Title</label>
                                    <select id="exampleSelect" onChange={(e) => setTitle(e.target.value)} name="exampleSelect" className='bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
                                        <option>Select</option>
                                        <option value="1">Shri</option>
                                        <option value="2">Smt/Kumari</option>
                                        <option value="3">Third Gender</option>
                                    </select>
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'First Name'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.firstname}
                                        name='firstname'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Middle Name'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.middlename}
                                        name='middlename'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Last Name'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.lastname}
                                        name='lastname'
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

                            <div className='radia-button'>
                                <p className='mb-3'>Application Type</p>
                                {
                                    modyType?.panCardModeType?.map((item, i) => (
                                        <RadioButton
                                            changed={radioChangeHandler}
                                            id={item?.modyType}
                                            isSelected={modeType === item?.modyType}
                                            label={item?.id}
                                            value={item?.modyType}
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
                <div dangerouslySetInnerHTML={{ __html: generateForm }} />
            </div>
        </LayoutContainer>
    )
}

export default PanCardForm

//  i used id key multiple value for example : id, label, value, isSelected 
const modyType = {
    "panCardModeType": [
        {
            modyType: 'P',
            id: 'Physical Pan',
            className: 'custome_class'
        },
        {
            id: 'Electronic Pan',
            className: 'custome_class',
            modyType: 'E'
        }
    ]

}