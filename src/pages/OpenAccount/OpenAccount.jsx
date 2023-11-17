import React, { useEffect, useState } from 'react'
import Footer from '../../components/Common/Footer/Footer'
import Header from '../../components/Common/Header/Header'
import { Link, useNavigate } from 'react-router-dom';
import './openAcc.css'
import { APIRequest, ApiUrl } from '../../utils/api';
import SimpleInput from '../../components/Input/SimpleInput';
import { maxWidth } from '@mui/system';
import { Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { ValidatePhone } from '../../utils/validation';
import BackButton from '../../components/Button/BackButton';


export const SavingAccount = ({ title, accountId }) => {
    const [isLoading, setIsloading] = useState(false);
    const [getTokenData, setGetTokenData] = useState({});
    const [getUrl, setSaveUrl] = useState({});
    const navigate = useNavigate();

    const Submit = () => {
        // alert('click')
        setIsloading(true)
        let config = {
            url: ApiUrl?.generateURL,
            method: "post",
            body: {
                "merchantcode": getTokenData?.partnerId,
                "type": accountId
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res?.data, "dfdllllllllllllllllll res")
                setSaveUrl(res?.data)
                setIsloading(false)
                redirectUrl();
            },
            err => {
                console.log(err, "================== err")
                setIsloading(false)
            }
        )
    }

    // getting details from the user token
    const GetByToken = () => {
        let config = {
            url: ApiUrl?.userGetByToken,
            method: "get"
        }
        APIRequest(
            config,
            res => {
                console.log(res, "dfdllllllllllllllllll res")
                setGetTokenData(res?.user)
            },
            err => {
                console.log(err, "================== err")
            }
        )
    }

    // redirect url funcation
    function redirectUrl() {
        if (getUrl?.status) {
            window.open(getUrl?.data, '_blank');
            console.log(getUrl?.data)
        }
    }



    useEffect(() => {
        return () => GetByToken()
    }, [])

    return (
        <>
            <p>Click Proceed To Open a Bank Account </p>
            <button type='button' className='button-pro'>
                <Link onClick={() => Submit()}>
                    {
                        isLoading ? <div>
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Loading...
                        </div> : title
                    }
                </Link>
            </button>
        </>
    )
}




const OpenAccount = () => {
    const [Name, setName] = useState('')
    const [Contact, setContact] = useState('');
    const [AccountType, setAccountType] = useState({ name: '' })
    const [isLoading, setIsloading] = useState(false);
    const [getUrl, setSaveUrl] = useState({});
    const navigate = useNavigate();


    const ResetData = () => {
        setName('')
        setContact('')
        setAccountType({ name: '' })
    }

    const Submit = () => {
        if (!Name) {
            toast.error('Please enter name!')
            return true
        }
        if (!ValidatePhone(Contact)) {
            toast.error('Please enter valid mobile no!')
            return true
        }

        setIsloading(true)
        let config = {
            url: ApiUrl.generateURL,
            method: "post",
            body: {
                "name": Name,
                "contact": Contact,
                "type": AccountType?.value
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res?.data, "dfdllllllllllllllllll res")
                setIsloading(false)
                ResetData()
                if (res?.data?.status) {
                    redirectUrl(res?.data?.data);
                }
            },
            err => {
                console.log(err, "================== err")
                setIsloading(false)
            }
        )
    }

    // redirect url funcation
    function redirectUrl(url) {
        window.open(url, '_blank');
        console.log(getUrl?.data)
    }

    return (
        <>
            <Header />
            <div className="comman-container px-4">
                <div className='mobile-recharge'>
                    <BackButton link={"home"} />
                    <h1>Open Bank Account</h1>
                </div>
                <div className="comman-container px-4">
                    <div className='button-process'>
                        <div style={{ maxWidth: 400, margin: 'auto' }}>
                            <SimpleInput
                                type="text"
                                placeholder='Jhon'
                                InputValue={Name}
                                setInputValue={setName}
                                disc={'Please enter your name'}
                            />
                            <SimpleInput type="number" placeholder='1234567890' InputValue={Contact} setInputValue={setContact}
                                disc={'Please enter your 10 digit contact number'}
                            />
                            <div className='my-3 mt-5'>
                                <Autocomplete
                                    value={AccountType}
                                    getOptionLabel={(Options) => Options.name}
                                    onChange={(event, newValue) => {
                                        setAccountType(newValue);
                                    }}
                                    size='sm'
                                    id="controllable-states-demo"
                                    options={[{ name: 'Saving account', value: 1 }, { name: 'Current account', value: 2 }, { name: 'CA & sole properitor', value: 2 }]}
                                    renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Select account type" />}
                                />
                            </div>
                            <button type='button' className='button-pro mt-8 pt-5'>
                                <Link onClick={() => Submit()}>
                                    {
                                        isLoading ? <div>
                                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Loading...
                                        </div> : 'Submit'
                                    }
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default OpenAccount