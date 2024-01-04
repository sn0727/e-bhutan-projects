import React, { useState } from 'react'
import BackButton from '../../../../components/Button/BackButton'
import { RadioButton } from '../../../../components/Feature/RadioButton'
import { InputCustome } from '../../../../components/Input/InputFeild'
import { AadhaarNoValidation, BlockNo, PanNoValidation, areaLocality, businessTypeFuc, countryFun, emailValidation, mobileNoValidation, nameValidation, postOffice, postalCodeValidation, stateValidation, townCityDis, validateAddress, validateDateFormat } from '../../../../components/Validation'
import LayoutContainer from '../../../../components/LayoutContainer/LayoutContainer'
import { toast } from 'react-toastify'
import { APIRequest, ApiUrl } from '../../../../utils/api'
import moment from 'moment'

const InsuranceForm = (props) => {
    const {
        setIdComponent,
        pageTitle,
        pageRequrest,
        loanServiceAPiRoute
    } = props;
    const [type, setType] = useState('Salaried');
    const [companyType, setCompanyType] = useState('');
    const [vehcleType, setVehcleType] = useState('');
    let objectKey = {}
    if (pageRequrest === "HealthInsurance" || pageRequrest === 'GroupInsurance' || pageRequrest === "VehcleInsurance") {
        objectKey = {
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
    } else if (pageRequrest === "TravelInsurance") {
        objectKey = {
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
            NumberOfPeople: '',
            StartFrom: '',
            EndTo: '',
            StartDate: '',
            EndDate: ''
        }
    } else if (pageRequrest === 'GroupInsurance') {
        objectKey = {
            NumberOfPeople: '',
        }
    } else if (pageRequrest === 'VehcleInsurance') {
        objectKey = {
            VehicleNo: '',
            ChassisNo: '',
            LastDate: ''
        }
    }
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
        let body;
        if (pageRequrest === "HealthInsurance" || pageRequrest === "LifeInsurance") {
            body = {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "LoanType": pageTitle,
                "DOB": moment(formationFormValue?.DateofBirth).format('DD/MM/yyyy'),
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
        } else if (pageRequrest === "TravelInsurance") {
            body = {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "LoanType": pageTitle,
                "DOB": moment(formationFormValue?.DateofBirth).format('DD/MM/yyyy'),
                "AadhaarNo": formationFormValue?.AadhaarNo,
                "PanNo": formationFormValue?.panNo,
                "BusinessType": companyType ? companyType : 'other',
                "HomeNo": formationFormValue?.BlockNo,
                "StreetNo": formationFormValue?.postOffice,
                "Locality": formationFormValue?.areaLocality,
                "City": formationFormValue?.townCityDis,
                "State": formationFormValue?.stateValue,
                "Country": formationFormValue?.country,
                "PinCode": formationFormValue?.pinCode,
                "NumberOfPeople": formationFormValue?.NumberOfPeople,
                "StartFrom": formationFormValue?.StartDate,
                "EndTo": formationFormValue?.EndTo,
                "StartDate": moment(formationFormValue?.StartDate).format('DD/MM/yyyy'),
                "EndDate": moment(formationFormValue?.EndDate).format('DD/MM/yyyy')
            }
        } else if (pageRequrest === 'GroupInsurance') {
            body = {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "LoanType": pageTitle,
                "DOB": moment(formationFormValue?.DateofBirth).format('DD/MM/yyyy'),
                "AadhaarNo": formationFormValue?.AadhaarNo,
                "PanNo": formationFormValue?.panNo,
                "BusinessType": companyType ? companyType : 'other',
                "HomeNo": formationFormValue?.BlockNo,
                "StreetNo": formationFormValue?.postOffice,
                "Locality": formationFormValue?.areaLocality,
                "City": formationFormValue?.townCityDis,
                "State": formationFormValue?.stateValue,
                "Country": formationFormValue?.country,
                "PinCode": formationFormValue?.pinCode,
                "NumberOfPeople": formationFormValue?.NumberOfPeople,
            }
        } else if (pageRequrest === "VehcleInsurance") {
            body = {
                "FullName": formationFormValue?.fullname,
                "Email": formationFormValue?.email,
                "Contact": formationFormValue?.mobileNo,
                "LoanType": pageTitle,
                "DOB": moment(formationFormValue?.DateofBirth).format('DD/MM/yyyy'),
                "AadhaarNo": formationFormValue?.AadhaarNo,
                "PanNo": formationFormValue?.panNo,
                "BusinessType": companyType ? companyType : 'other',
                "HomeNo": formationFormValue?.BlockNo,
                "StreetNo": formationFormValue?.postOffice,
                "Locality": formationFormValue?.areaLocality,
                "City": formationFormValue?.townCityDis,
                "State": formationFormValue?.stateValue,
                "Country": formationFormValue?.country,
                "PinCode": formationFormValue?.pinCode,
                "VehicleNo": formationFormValue?.VehicleNo,
                "ChassisNo": formationFormValue?.ChassisNo,
                "LastDate": formationFormValue?.LastDate,
                "VehicleType" : vehcleType
            }
        }
        let config = {
            url: loanServiceAPiRoute,
            method: 'post',
            body: body
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
                                    (pageRequrest === 'TravelInsurance' || pageRequrest === 'GroupInsurance') && (
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Number Of People'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.NumberOfPeople}
                                                name='NumberOfPeople'
                                                required={'required'}
                                                type={'text'}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            {
                                (pageRequrest === 'VehcleInsurance') && (
                                    <div className="formGroup">
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Vehicle No'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.VehicleNo}
                                                name='VehicleNo'
                                                required={'required'}
                                                type={'text'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Chassis No'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.ChassisNo}
                                                name='ChassisNo'
                                                required={'required'}
                                                type={'text'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Last Date'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.LastDate}
                                                name='LastDate'
                                                required={'required'}
                                                type={'Date'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <label for="exampleSelect" className='d-block'>Vehcle Type</label>
                                            <select id="exampleSelect" onChange={(e) => setVehcleType(e.target.value)} name="exampleSelect" className='bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
                                                <option>Select</option>
                                                <option value="Car Insurance">Car Insurance</option>
                                                <option value="Bike Insurance">Bike Insurance</option>
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            {/* 5 row */}
                            {
                                (pageRequrest === 'TravelInsurance') && (
                                    <div className="formGroup">
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Traveling From'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.StartFrom}
                                                name='StartFrom'
                                                required={'required'}
                                                type={'text'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Travel To'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.EndTo}
                                                name='EndTo'
                                                required={'required'}
                                                type={'text'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'Start Date'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.StartDate}
                                                name='StartDate'
                                                required={'required'}
                                                type={'date'}
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <InputCustome
                                                placeholderTitle={'End Date'}
                                                onChange={handleInputChange}
                                                value={formationFormValue?.EndDate}
                                                name='EndDate'
                                                required={'required'}
                                                type={'date'}
                                            />
                                        </div>
                                    </div>
                                )
                            }
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

export default InsuranceForm