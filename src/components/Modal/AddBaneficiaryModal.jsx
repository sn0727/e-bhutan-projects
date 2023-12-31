import React, { useEffect, useState } from 'react'
import { Button, ChakraProvider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../Button/BackButton';
import { APIRequest, ApiUrl } from '../../utils/api';
import { toast } from 'react-toastify';
import { nameValidation, postalCodeValidation, validateAccountNumber, validateBankId, validateBankName, validateDateFormat, validateIFSCCode } from '../Validation';
import SearchFilter from '../SearchFilter/SearchFilter';

const AddBaneficiaryModal = ({ mobileNo, fetchBeneficiaryFun }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [bankDetailsData, setBankNameData] = useState([])
  const [getBankId, setGetBankId] = useState('')

  // here is input feild object,
  const [inputValue, setInputValue] = useState({
    accountNo: "",
    IFSCCODE: "",
    name: "",
    date: "",
    address: "",
    pincode: "",
  })

  // get bank id from the select component
  const sendBandIdToPopModal = (id) => {
    setGetBankId(id)
  }

  // i take input feild value, here
  const handlerInput = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value.toUpperCase() })
  }

  // We are doing get bank id from the api,
  const getByBankName = () => {
    setIsLoading(true)
    let config = {
      url: ApiUrl?.getBanks,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        // console.log(res, "=================== res of bank id")
        setBankNameData(res?.data)
        setIsLoading(false)
      },
      err => {
        console.log(err, "=================== bank id err")
        setIsLoading(false)
      }
    )
  }

  // This is a Register Beneficiary funcation
  const addBaneficiaryRegistration = () => {
    if (
      validateAccountNumber(inputValue?.accountNo) &&
      validateIFSCCode(inputValue?.IFSCCODE) &&
      nameValidation(inputValue?.name) &&
      validateDateFormat(inputValue?.date) &&
      postalCodeValidation(inputValue?.pincode)
    ) {
      setIsLoading(true)
      let config = {
        url: ApiUrl.registerBeneficiary,
        method: 'post',
        body: {
          "mobile": mobileNo,
          "benename": inputValue?.name,
          "bankid": getBankId,
          "accno": inputValue?.accountNo,
          "ifsccode": inputValue?.IFSCCODE.toUpperCase(),
          "verified": "0",
          "gst_state": "07",
          "dob": inputValue?.date,
          "address": inputValue?.address,
          "pincode": inputValue?.pincode
        }
      };
      APIRequest(
        config,
        res => {
          console.log(res, "=================== res add benuficiand")
          toast.success(res?.message)
          setIsLoading(false)
          onClose()
          fetchBeneficiaryFun()
          setInputValue({
            accountNo: "",
            IFSCCODE: "",
            bandId: "",
            name: "",
            date: "",
            address: "",
            pincode: "",
          })
          // setTimeout(() => {
          //   window.location.reload(false);
          // }, 1000)
        },
        err => {
          console.log(err);
          toast.error(err?.message)
          setIsLoading(false)
        }

      )
    }


  }

  useEffect(() => {
    console.log("dhdskfnd")
    getByBankName()
  }, [])
  return (
    <>
      <Button onClick={onOpen} className='FaChevronRight'><IoMdAdd /></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ChakraProvider>
              <div className="comman-container">
                <div className='Verified-Transfer' style={{ marginTop: '60px' }}>
                  <div className='m-row'>
                    <div className='col-12 mb-1'>
                      <label htmlFor="basic" className='d-block BasicDetails'><b>Fill Account Details</b></label>
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="otp" className='d-block'>Bank Account Number <span className='text-red'>*</span></label>
                      <Input placeholder='Enter A/C Number'
                        name="accountNo"
                        onChange={handlerInput}
                        className='search-input'
                      />
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12'>
                      <label htmlFor="IFSC" className='d-block'>Enter IFSC Code <span className='text-red'>*</span></label>
                      <Input placeholder='IFSC Code'
                        name="IFSCCODE"
                        style={{ textTransform: 'uppercase' }}
                        onChange={handlerInput}
                        className='search-input' />
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="IFSC" className='d-block'>Select Bank <span className='text-red'>*</span></label>
                      <SearchFilter bankDetailsData={bankDetailsData} sendBandIdToPopModal={sendBandIdToPopModal} />
                    </div>
                    </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="otp" className='d-block'>Enter Name <span className='text-red'>*</span></label>
                      <Input placeholder='Enter Name'
                        name="name"
                        onChange={handlerInput}
                        className='search-input' />
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="otp" className='d-block'>Enter Date Of Birth <span className='text-red'>*</span></label>
                      <Input placeholder='YYYY-MM-DD'
                        name="date"
                        type='date'
                        onChange={handlerInput}
                        className='search-input' />
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="otp" className='d-block'>Enter Full Address <span className='text-red'>*</span></label>
                      <Input placeholder='Enter Address'
                        name="address"
                        onChange={handlerInput}
                        className='search-input' />
                    </div>
                  </div>
                  <div className='m-row'>
                    <div className='col-12 my-2'>
                      <label htmlFor="otp" className='d-block'>Enter Pincode <span className='text-red'>*</span></label>
                      <Input placeholder='Enter Pin Code'
                        name="pincode"
                        onChange={handlerInput}
                        className='search-input' />
                    </div>
                  </div>
                </div>

                <div className='button-process my-0' style={{ margin: '20px 0' }}>
                  <button type='button' className='button-pro'>
                    <Link onClick={() => addBaneficiaryRegistration()}>
                      {
                        isLoading ? <div>
                          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                          Loading...
                        </div> : "Continue To Verify"
                      }</Link>
                  </button>
                </div>
              </div>
            </ChakraProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddBaneficiaryModal