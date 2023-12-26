import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ApiUrl } from '../../../utils/api';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { adultsQuantity1, childrenQuantity1, finalDataTickState, formStateAtom, reponseHotelDetails, roomQuantity, saveRoomPerData, saveUserDetails, selectRoomArr } from '../atom/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const HotelPassengerDetails = ({ setIdComponent }) => {

    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const infantsQuantity = useRecoilValue(roomQuantity)
    const [formState, setFormState] = useRecoilState(formStateAtom);
    const hotelResponseData = useRecoilValue(reponseHotelDetails)
    const getSelectRoomArr = useRecoilValue(selectRoomArr)
    const [finalDataTickBook, setFinalDataTickBook] = useRecoilState(finalDataTickState)
    const [activeAdults, setActiveAdults] = useState(false)
    const [activeChildren, setActiveChildren] = useState(false)
    const getRoomResultRes = useRecoilValue(saveRoomPerData)
    const { TraceId } = hotelResponseData?.HotelSearchResult;

    console.log(TraceId, 'getSelectRoomArr ============')
    // const [PaxType, setPaxType] = useState('')

    // console.log('storeHtRoomResult', getRoomResultRes?.HotelRoomsDetails[0]?.IsPANMandatory)
    // console.log('storeHtRoomResult', getRoomResultRes?.HotelRoomsDetails[0]?.IsPassportMandatory)

    let IsPassportMandatory = true;
    let IsPANMandatory = false;

    const [pessengerAddObj, setPessengerAddObj] = useState(
        IsPassportMandatory ?
            ({
                Title: '',
                FirstName: '',
                LastName: '',
                Phoneno: '',
                Email: '',
                PaxType: '',
                LeadPassenger: adultsQuantity > 1 ? false : true,
                Age: '',
                PassportNo: '',
                PassportIssueDate: '',
                PassportExpDate: '',
            }) : ({
                Title: '',
                FirstName: '',
                LastName: '',
                Phoneno: '',
                Email: '',
                PaxType: '',
                LeadPassenger: adultsQuantity > 1 ? false : true,
                Age: '',
                PAN: '',
            })
    )

    let newRoomArr = getSelectRoomArr?.map((elem, index) => {
        if (elem?.RoomIndex) {
            return { ...elem, "HotelPassenger": formState };
        }
    })

    let adultsArray = [];
    let childrenArray = [];
    let infantsArray = [];

    for (let index = 1; index <= adultsQuantity; index++) {
        adultsArray.push(index)
    }
    for (let index = 1; index <= childrenQuantity; index++) {
        childrenArray.push(index)
    }
    for (let index = 1; index <= infantsQuantity; index++) {
        infantsArray.push(index)
    }

    // get input value funcation
    const handlerInputPesserger = (event) => {
        setPessengerAddObj({ ...pessengerAddObj, [event.target.name]: event.target.value })
    }

    // genrating an new id
    function generateRandomId(length = 8) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }

    const savePessenger = () => {
        const updatedFormState = formState?.map((existingPassenger) => {
            if (existingPassenger?.FirstName === pessengerAddObj?.FirstName) {
                // If the firstname matches, update the existing passenger
                return { ...existingPassenger, ...pessengerAddObj };
            }
            return existingPassenger;
        });

        // Check if the firstname exists in formState
        const firstnameExists = formState.some(
            (existingPassenger) => existingPassenger?.FirstName === pessengerAddObj?.FirstName
        );

        if (!firstnameExists) {
            // If firstname doesn't exist, add a new passenger
            alert('data is save.')
            setFormState([...formState, { ...pessengerAddObj }]);
        } else {
            // If firstname exists, update the array with modified objects
            alert('new data is save.')
            setFormState(updatedFormState);
        }
    };


    const submitHandler = (event) => {
        event.preventDefault();
        savePessenger()
    }
    const ContinueBtnFuncation = () => {
        // console.log(newRoomArr, 'newArr ==========')
        setFinalDataTickBook(newRoomArr)
        setIdComponent(6)
    }


    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-5 lg:py-0">
                <h3 className='add-travel-detail-title my-3'>Add Passenger Details</h3>
                <div className='tabButtonMain'>

                    {/* adults form  */}
                    {
                        adultsArray?.map((item, index) => (
                            <>
                                <button className='button-class-cm' onClick={() => activeAdults === item ? setActiveAdults('') : setActiveAdults(item)}>
                                    <p>
                                        Adults {item}
                                    </p>
                                    {activeAdults === item ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                                <div key={index} className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700
                                
                                    ${activeAdults === item ? 'formShow' : 'HideShow'}
                                `}>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                                            <div className="formGroup">
                                                <div className='w-50 position-relative'>
                                                    <label htmlFor="fistname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        placeholder='Fist Name'
                                                        name='FirstName'
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Last Name"
                                                        name='LastName'
                                                        required />
                                                </div>
                                                <div className='w-50 position-relative'>
                                                    <label htmlFor="profile-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact No</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        placeholder='Contact No'
                                                        name='Phoneno'
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Email Id"
                                                        name='Email'
                                                        required />
                                                </div>
                                            </div>
                                            <div className="formGroup">
                                                <div className='w-50'>
                                                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Age"
                                                        name='Age'
                                                        required
                                                    />
                                                </div>
                                                {
                                                    (IsPassportMandatory) && (
                                                        <div className='w-50'>
                                                            <label htmlFor="PassportNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport No</label>
                                                            <input type="text"
                                                                onChange={handlerInputPesserger}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Passport No"
                                                                name='PassportNo'
                                                                required />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    (IsPANMandatory) && (
                                                        <div className='w-50'>
                                                            <label htmlFor="PanNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pan card No</label>
                                                            <input type="text"
                                                                onChange={handlerInputPesserger}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Pan card no"
                                                                name='PAN'
                                                                required />
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (IsPassportMandatory) && (
                                                        <div className='w-50'>
                                                            <label htmlFor="PassportIssueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Issue Date</label>
                                                            <input type="date"
                                                                onChange={handlerInputPesserger}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                name='PassportIssueDate'
                                                                required
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="formGroup">
                                                {
                                                    (IsPassportMandatory) && (
                                                        <div className='w-50'>
                                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Expiry Date</label>
                                                            <input type="date"
                                                                onChange={handlerInputPesserger}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Passport Expiry Date"
                                                                name='PassportExpDate'
                                                                required />
                                                        </div>
                                                    )
                                                }

                                                <div className='w-50'>
                                                    <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                    <select
                                                        name="Title"
                                                        style={{ minHeight: '41px' }}
                                                        id="Title"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="select">select</option>
                                                        <option value="Mr">Mr</option>
                                                        <option value="Miss">Miss</option>
                                                    </select>
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="PaxType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choice select</label>
                                                    <select
                                                        name="PaxType"
                                                        style={{ minHeight: '41px' }}
                                                        id="PaxType"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="Select">Select</option>
                                                        <option value="1">Adult</option>
                                                        <option value="2">Children</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                                            >Save</button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ))
                    }

                    {/* Children form  */}
                    {
                        childrenArray.map((item, index) => (
                            <>
                                <button className='button-class-cm' onClick={() => activeChildren === item ? setActiveChildren('') : setActiveChildren(item)}>
                                    <p>Children {item}</p>
                                    {activeAdults === item ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                                <div key={index} className={`border-0 setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700
                                
                                    ${activeChildren === item ? 'formShow' : 'HideShow'}
                                `}>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                                            <div className="formGroup">
                                                <div className='w-50 position-relative'>
                                                    <label htmlFor="fistname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        placeholder='Fist Name'
                                                        name='fistname'
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Last Name"
                                                        name='lastname'
                                                        required />
                                                </div>
                                                <div className='w-50 position-relative'>
                                                    <label htmlFor="profile-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact No</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        placeholder='Contact No'
                                                        name='contactNo'
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Email Id"
                                                        name='email'
                                                        required />
                                                </div>
                                            </div>
                                            <div className="formGroup">
                                                <div className='w-50'>
                                                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Age"
                                                        name='age'
                                                        required
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="PassportNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport No</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Passport No"
                                                        name='passportNo'
                                                        required />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="PanNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport No</label>
                                                    <input type="text"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Pan card no"
                                                        name='PanNo'
                                                        required />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="PassportIssueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Issue Date</label>
                                                    <input type="date"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        name='PassportIssueDate'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="formGroup">
                                                <div className='w-50'>
                                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Expiry Date</label>
                                                    <input type="date"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Passport Expiry Date"
                                                        name='passportExiryDate'
                                                        required />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                    <select
                                                        name="gender"
                                                        style={{ minHeight: '41px' }}
                                                        id="gender"
                                                        onChange={handlerInputPesserger}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="select">select</option>
                                                        <option value="Mr">Mr</option>
                                                        <option value="Miss">Miss</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                                            >Save</button>
                                        </form>
                                    </div>s
                                </div>
                            </>

                        ))
                    }
                </div>
                <button type="submit"
                    onClick={() => ContinueBtnFuncation()}
                    className="w-40 mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                >Continue</button>
            </div>
        </section>
    )
}

export default HotelPassengerDetails
