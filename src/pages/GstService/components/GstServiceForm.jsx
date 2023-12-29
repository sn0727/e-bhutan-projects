import React, { useState } from 'react'
import LayoutContainer from '../../../components/LayoutContainer/LayoutContainer'
// import "../css/CompanyInformation.css"
import { InputCustome } from '../../../components/Input/InputFeild';
import { emailValidation, nameValidation, mobileNoValidation, postalCodeValidation, PanNoValidation, AadhaarNoValidation, validateDateFormat, AadhaarEnrolmentID, BlockNo, postOffice, areaLocality, townCityDis, stateValidation, countryFun, docmentFile } from '../../../components/Validation';
import BackButton from '../../../components/Button/BackButton';
import { APIRequest, ApiUrl } from '../../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';

const GstServiceForm = ({ setIdComponent }) => {

  const [formationFormValue, setFormationFormValue] = useState({
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
    country: ''
  })

  // reset value from the form.
  const resetValue = () => {
    setFormationFormValue({
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

  // GST formation function.
  const gstFormation = () => {
    let config = {
      url: ApiUrl?.GSTFormation,
      method: 'post',
      body: {
        "FullName": formationFormValue?.fullname,
        "Email": formationFormValue?.email,
        "PanNo": formationFormValue?.panNo,
        "Contact": formationFormValue?.mobileNo,
        "AadhaarNo": formationFormValue?.AadhaarNo,
        // "DOB": "01/02/2001",
        "DOB": moment(formationFormValue?.fullname).format('dd/mm/yyyy'),
        "HomeNo": formationFormValue?.BlockNo,
        "StreetNo": formationFormValue?.postOffice,
        "Locality": formationFormValue?.areaLocality,
        "City": formationFormValue?.townCityDis,
        "State": formationFormValue?.stateValue,
        "Country": formationFormValue?.country,
        "PinCode": formationFormValue?.pinCode,
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
      gstFormation()
    }
  }

  return (
    <LayoutContainer>
      <div className='mobile-recharge'>
        <BackButton link={""} />
      </div>
      <div className='my-5'>
        <div className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
          <p className='company-infomation-dd'>GST Formation</p>
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
                {/* faltu div use for only space */}
                {/* <div className='w-50 position-relative'>
                </div> */}
                {/* faltu div use for only space */}
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

export default GstServiceForm