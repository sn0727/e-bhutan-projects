import React, { useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import BackButton from '../../components/Button/BackButton'
import SimpleInput from '../../components/Input/SimpleInput'
import { InputFeild } from '../../components/Input/InputFeild'

const QuickDhan = () => {
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

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
                            <InputFeild
                                type={'number'}
                                PlaceHolderTitle={'Enter mobile number'}
                                InputFeildValue={contactNo}
                                setInputFeildValue={setContactNo}
                                disc={'Please enter your name'}
                            />

                            <InputFeild
                                type={'text'}
                                PlaceHolderTitle={'Enter address'}
                                InputFeildValue={address}
                                setInputFeildValue={setAddress}
                                disc={'Please enter your address'}
                            />

                            <textarea className="messageArea border-cs"
                                name="w3review"
                                rows="4"
                                cols="50"
                                placeholder='message'
                                >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default QuickDhan