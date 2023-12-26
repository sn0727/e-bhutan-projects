import React, { useEffect, useState } from 'react'
import { APIRequest, ApiUrl } from '../../../utils/api';
import { toast } from 'react-toastify';

const HotelCancelBookingById = ({setIdComponent}) => {
    const [isLoading, setisLoading] = useState(false);
    const [BookingId, setBookingId] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [AirlineSources, setAirlineSources] = useState('')

    const FlightReleasePNRRequest = () => {
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.flightReleasePNRRequest,
            body: {
                "EndUserIp": ipAddress,
                "BookingId": BookingId,
                "Source": AirlineSources
            },

        }
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking dd')
                setisLoading(false)
            },
            err => {
                console.log(err, '====================== err booking')
                toast.error(err?.message)
                setisLoading(false)
            }
        )
    }

    // get ip address value
    const getIpAddressFun = async () => {
        const response = await fetch(
            `https://api.db-ip.com/v2/free/self`
        );
        const data = await response.json();
        setIpAddress(data?.ipAddress);
    }
    useEffect(() => {
        getIpAddressFun()
    }, [])

    return (
        <>
            <div style={{ alignItems: 'center', }}>
                <h2 className='text-center my-5'>Cancel Booking</h2>
                <div className='card-box mx-auto my-5 p-4 space-y-4 md:space-y-6'>
                    <div className="formGroup ">
                        <div className='myW position-relative'>
                            <label htmlFor="BookingId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Booking Id</label>
                            <input type="text"
                                onChange={(e) => setBookingId(e.target.value)}
                                placeholder='Booking Id'
                                name='BookingId'
                                value={BookingId}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className='myW position-relative'>
                            <label htmlFor="AirlineSources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Airline Sources</label>
                            <input type="text"
                                onChange={(e) => setAirlineSources(e.target.value)}
                                placeholder='Airline Sources'
                                name='AirlineSources'
                                value={AirlineSources}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button
                            onClick={() => setIdComponent(1)}
                            type="submit"
                            className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
                        >Proceed</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelCancelBookingById