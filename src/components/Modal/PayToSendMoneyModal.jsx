import React, { useState } from 'react'
import { Button, ChakraProvider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BackButton from '../Button/BackButton';
import { APIRequest, ApiUrl } from '../../utils/api';
import { toast } from 'react-toastify';

const PayToSendMoneyModal = ({ userDetails, mobileNo, fetchBeneficiaryFun }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setisLoading] = useState(false)
    const [amount, setAmout] = useState('')

    // console.log(userDetails, "====== userDetails")

    const sendAmount =()=>{
        if(userDetails?.verified==="1")
        {
            onOpen()
        }
        else{
            alert("Sender Is Not Varified !, Please Pay Penny TO Varified Sender !..")
        }
    }

    const transferMoney = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl?.transactionMoney,
            method: 'post',
            body: {
                "mobile": mobileNo,
                "pipe": "bank1",
                "pincode": 110027,
                "address": "city",
                "dob": "DD-MM-YYYY",
                "gst_state": "07",
                "bene_id": userDetails?.bene_id,
                "txntype": "IMPS",
                "amount": amount
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res, "====================res ")
                setisLoading(false)
                toast.success(res?.message)
                onClose()
                fetchBeneficiaryFun()
                // setTimeout(() => {
                //     window.location.reload(false);
                // }, 1000)
            },
            err => {
                console.log(err, "================== err mili");
                setisLoading(false)
                toast.error(err?.message)
            }
        );

    }

    return (
        <>
            {userDetails?.verified === "0" ? null : <Button onClick={sendAmount} className='FaChevronRight' colorScheme='blue' marginRight={'10px'}>
                Pay Now
                {userDetails?.verified === "0" ? null : <div className='verifyBtn'>&#10003;</div>}
            </Button> }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <ChakraProvider>
                            <div className="comman-container px-4">
                                <div className='Verified-Transfer' style={{ marginTop: '60px' }}>
                                    <p className='test-left-ddd'><b>{userDetails?.name}</b></p>
                                    <p className='test-left-ddd mb-3'>{userDetails?.bankname}, IFSC :- {userDetails?.ifsc}</p>
                                    <div className='YouArePaying'>
                                        <p>You Are Paying</p>
                                        <input type="text" placeholder='0'
                                            onChange={(e) => setAmout(e.target.value)}
                                            className='input_pay' />
                                        {/* <sub>rs</sub> */}
                                    </div>
                                    <div className='hello-btn-dd'>
                                        <p className='mb-2'>Txntype :- IMPS</p>
                                        <p>Add Description</p>
                                    </div>
                                </div>

                                <div className='button-process my-0' style={{ margin: '20px 0' }}>
                                    <button type='button' className='button-pro'>
                                        <Link onClick={() => transferMoney()}>
                                            {
                                                isLoading ? <div>
                                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg>
                                                    Loading...
                                                </div> : "Continue To Pay"
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

export default PayToSendMoneyModal