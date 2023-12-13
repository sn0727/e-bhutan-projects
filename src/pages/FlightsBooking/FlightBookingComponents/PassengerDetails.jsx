import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ApiUrl } from '../../../utils/api';
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { adultsQuantity1, childrenQuantity1, formStateAtom, infantsQuantity1, saveUserDetails } from '../atom/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import UserForm from './component/UserForm';
import { useDispatch } from 'react-redux';
import { setAllPassenger } from '../../../app/slice/FlightSlice';

const PassengerDetails = ({ setIdComponent }) => {
    const dispatch = useDispatch()

    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const infantsQuantity = useRecoilValue(infantsQuantity1)
    const [isLoading, setisLoading] = useState(false)
    const [Passenger, setPassenger] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);


    const setPassengerData = () => {
        let AllPassenger = []
        for (let i = 0; i < adultsQuantity; i++) {
            AllPassenger.push({ isShow: false, label: `Adult ${i + 1}` })
        }
        for (let i = 0; i < childrenQuantity; i++) {
            AllPassenger.push({ isShow: false, label: `Child ${i + 1}` })
        }
        for (let i = 0; i < infantsQuantity; i++) {
            AllPassenger.push({ isShow: false, label: `Infant ${i + 1}` })
        }
        setPassenger(AllPassenger)
    }
    useEffect(() => {
        setPassengerData()
    }, [])

    const toggleContent = (index) => {
        const newVisibility = [...Passenger]; // Create a copy of the visibility array
        newVisibility[index] = { ...newVisibility[index], isShow: !newVisibility[index]?.isShow }; // Toggle the visibility for the specific index
        setPassenger(newVisibility); // Update the visibility array
    };

    const handleSaveUser = (userData, label) => {
        const foundObject = Passenger.find(item => item.label === label);
        if (foundObject) {
            foundObject.userData = userData;
        }
        console.log(Passenger, foundObject, 'handleSaveUser');
        setPassenger(Passenger)
        toast.success('Saved Successfully');
    };

    function Submit() {
        let count = 0
        for (let index = 0; index < Passenger?.length; index++) {
            console.log(Passenger[index]);
            if (Passenger[index]?.userData) {
                console.log(Passenger[index]?.userData);
                count++
            }
        }
        console.log(count, Passenger?.length, 'iof');
        if (Passenger?.length === count) {
            dispatch(setAllPassenger(Passenger))
            setIdComponent(5)
        } else {
            toast.error('Please add all passengers details!')
        }
    }


    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-5 lg:py-0">
                <h3 className='add-travel-detail-title my-3'>Add Passenger Details</h3>
                <div className='tabButtonMain'>
                    {Passenger?.map((item, index) => (
                        <div key={index}>
                            <button className='button-class-cm'
                                onClick={() => toggleContent(index)}
                            >
                                <p>{item?.label}</p>
                                {item?.isShow ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </button>
                            <UserForm onSave={handleSaveUser} label={item?.label} isShow={item?.isShow} />

                        </div>
                    ))}
                </div>
                <button type="submit"
                    onClick={() => Submit()}
                    className="w-40 mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                >Continue</button>
            </div>
        </section>
    )
}

export default PassengerDetails
