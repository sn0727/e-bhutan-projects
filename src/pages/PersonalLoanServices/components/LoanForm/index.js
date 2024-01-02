import React, { useState } from 'react'
import BackButton from '../../../../components/Button/BackButton'
import { RadioButton } from '../../../../components/Feature/RadioButton'
import { InputCustome } from '../../../../components/Input/InputFeild'
import { AadhaarNoValidation, BlockNo, PanNoValidation, areaLocality, businessTypeFuc, countryFun, emailValidation, mobileNoValidation, nameValidation, postOffice, postalCodeValidation, stateValidation, townCityDis, validateAddress, validateDateFormat } from '../../../../components/Validation'
import LayoutContainer from '../../../../components/LayoutContainer/LayoutContainer'
import { toast } from 'react-toastify'
import { APIRequest, ApiUrl } from '../../../../utils/api'
import moment from 'moment'

const Index = (props) => {
    const {
        setIdComponent,
        pageTitle,
        loanServiceAPiRoute
    } = props;
    const [type, setType] = useState('Salaried');
    const [companyType, setCompanyType] = useState('');
    const [occupationType, setOccupationType] = useState('');
    let objectKey = {
        fullname: '',
        email: '',
        mobileNo: '',
        pinCode: '',
        panNo: '',
        AadhaarNo: '',
        AadhaarEnrolmentID: '',
        DateofBirth: '',
        BlockNo: '',
        postOffice: '',
        areaLocality: '',
        townCityDis: '',
        stateValue: '',
        country: '',
    }
    // if (pageTitle === "Housing Loan" || pageTitle === "Business Loan") {
    //     objectKey = {
    //         fullname: '',
    //         email: '',
    //         mobileNo: '',
    //         pinCode: '',
    //         panNo: '',
    //         AadhaarNo: '',
    //         AadhaarEnrolmentID: '',
    //         DateofBirth: '',
    //         BlockNo: '',
    //         postOffice: '',
    //         areaLocality: '',
    //         townCityDis: '',
    //         stateValue: '',
    //         country: '',
    //         businessType: ''
    //     }
    // } else {
    //     objectKey = {
    //         fullname: '',
    //         email: '',
    //         mobileNo: '',
    //         pinCode: '',
    //         panNo: '',
    //         AadhaarNo: '',
    //         AadhaarEnrolmentID: '',
    //         DateofBirth: '',
    //         BlockNo: '',
    //         postOffice: '',
    //         areaLocality: '',
    //         townCityDis: '',
    //         stateValue: '',
    //         country: '',
    //     }
    // }
    const [formationFormValue, setFormationFormValue] = useState(objectKey)

    // reset value from the form.
    const resetValue = () => {
        setFormationFormValue(objectKey)
    }

    const radioChangeHandler = (e) => {
        setType(e.target.value);
    };

    // get input value funcation
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormationFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value
        }));
    };

    // Digital signature function.
    const digitalSignature = () => {
        let config = {
            url: loanServiceAPiRoute,
            method: 'post',
            body: {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "LoanType": pageTitle,
                "DOB": moment(formationFormValue?.DateofBirth).format('DD/MM/yyyy'),
                "Occupation": occupationType ? occupationType : 'other',
                "AadhaarNo": formationFormValue?.AadhaarNo,
                "PanNo": formationFormValue?.panNo,
                "BusinessType": companyType ? companyType : 'other',
                "HomeNo": formationFormValue?.BlockNo,
                "StreetNo": formationFormValue?.postOffice,
                "Locality": formationFormValue?.areaLocality,
                "City": formationFormValue?.townCityDis,
                "State": formationFormValue?.stateValue,
                "Country": formationFormValue?.country,
                "PinCode": formationFormValue?.pinCode
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
            postalCodeValidation(formationFormValue?.pinCode) &&
            PanNoValidation(formationFormValue?.panNo) &&
            AadhaarNoValidation(formationFormValue?.AadhaarNo) &&
            validateDateFormat(formationFormValue?.DateofBirth) &&
            BlockNo(formationFormValue?.BlockNo) &&
            postOffice(formationFormValue?.postOffice) &&
            areaLocality(formationFormValue?.areaLocality) &&
            townCityDis(formationFormValue?.townCityDis) &&
            stateValidation(formationFormValue?.stateValue) &&
            countryFun(formationFormValue?.country)
        ) {
            digitalSignature()
        }
    }
    return (
        <LayoutContainer>
            <div className='mobile-recharge'>
                <BackButton link={""} />
            </div>
            <div className='my-5'>
                <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <p className='company-infomation-dd'>{pageTitle}</p>
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
                                        placeholderTitle={'Email'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.email}
                                        name='email'
                                        required={'required'}
                                        type={'email'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Mobile number'}
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
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Pan No'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.panNo}
                                        name='panNo'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
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
                            </div>

                            {/* 3 row */}
                            <div className="formGroup">
                                <div className='w-50'>
                                    <InputCustome
                                        placeholderTitle={'Flat/Door/Block No.'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.BlockNo}
                                        name='BlockNo'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Road/Street/Post Office.'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.postOffice}
                                        name='postOffice'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50'>
                                    <InputCustome
                                        placeholderTitle={'Area / Locality'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.areaLocality}
                                        name='areaLocality'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Town / City / District'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.townCityDis}
                                        name='townCityDis'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                            </div>

                            {/* 4 row */}
                            <div className="formGroup">
                                <div className='w-50'>
                                    <InputCustome
                                        placeholderTitle={'State'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.stateValue}
                                        name='stateValue'
                                        required={'required'}
                                        type={'text'}
                                    />
                                </div>
                                <div className='w-50 position-relative'>
                                    <InputCustome
                                        placeholderTitle={'Country'}
                                        onChange={handleInputChange}
                                        value={formationFormValue?.country}
                                        name='country'
                                        required={'required'}
                                        type={'text'}
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
                                {
                                    (pageTitle === 'Personal Loan' || pageTitle === 'Housing Loan' || pageTitle === "Loan Against Property") ? (
                                        <div className='w-50'>
                                            <label for="exampleSelect" className='d-block'>Occupation Type</label>
                                            <select id="exampleSelect" onChange={(e) => setOccupationType(e.target.value)} name="exampleSelect" className='bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
                                                <option>Select</option>
                                                <option value="Salaried">Salaried</option>
                                                <option value="Self Employed/Business">Self Employed/Business</option>
                                                <option value="Other source of income">Other source of income</option>
                                                <option value="Not Employed">Not Employed</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className='w-50'>
                                            <label for="exampleSelect" className='d-block'>Choose Company Type</label>
                                            <select id="exampleSelect" onChange={(e) => setCompanyType(e.target.value)} name="exampleSelect" className='bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
                                                <option>Select</option>
                                                <option value="proprietor">Proprietor</option>
                                                <option value="LLP">LLP</option>
                                                <option value="Pvt Ltd">Private Ltd</option>
                                                <option value="Public Ltd">Public Ltd</option>
                                            </select>
                                        </div>
                                    )
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

export default Index