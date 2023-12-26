import React, { useEffect, useState } from 'react'
import './../css/HotelBooking.css'
import { image } from '../../../constent/image'
import { MdLocationPin } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ButtonBook } from '../../../components/Common/Button/button';
import { MdCurrencyRupee } from "react-icons/md";
import { SkeletonBookingList } from '../../../components/SkeletonTemplate/SkeletonBookingForm';
import FlightListOfService from '../../FlightsBooking/FlightBookingComponents/FlightListOfService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { adultsQuantity1, childrenQuantity1, reponseHotelDetails, roomQuantity, savePerHotelRecord } from '../atom/atom';

const buttonS = [
    {
        buttonName: 'Cheapest',
        Cheapest: 'Cheapest',
    },
    {
        buttonName: 'Non-Stop',
        nonStop: 'Non-Stop',
    },
    {
        id: 3,
        buttonName: 'Timings',
        DepTime: 'DepTime',
        ArrTime: 'ArrTime'
    },
    {
        id: 4,
        buttonName: 'Duration',
        Duration: 'Duration'
    }
]

// filter funcation

const HotelBookingServiceList = ({ setIdComponent }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [activeColor, setActiveColor] = useState([])
    const hotelResponseData = useRecoilValue(reponseHotelDetails)
    const savePerRecordHotel = useSetRecoilState(savePerHotelRecord)
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const roomNoOfQuantity = useRecoilValue(roomQuantity)
    const { HotelResults, ResponseStatus } = hotelResponseData?.HotelSearchResult;

    useEffect(() => {
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1000)
        setIsLoading(false)
    }, [hotelResponseData])

    const getPerHotelDetailsFunc = (data) => {
        savePerRecordHotel(data)
        setIdComponent(3)
    }

    // setTimeout(() => {
    //     setIsLoading(false)
    // }, 2000)

    return (

        <>
            {ResponseStatus === 0 && ('NotSet')}
            {ResponseStatus === 1 && (

                !isLoading ? (
                    <>
                        <div className='ht-layout-css-sr-lsts'>
                            <div className='filter-main-dv' style={{ display: 'none' }}>
                                <div className='SuggestedForYou-ht'>
                                    <h2>
                                        <span>Select Filters</span>
                                        <div className='clear-dfdsjk'>Clear</div>
                                    </h2>
                                </div>
                                <div className='SuggestedForYou'>
                                    <h3>Suggested For You</h3>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='freeC' />
                                        <label htmlFor="freeC" className='start-svg'>Free Cancellation</label>
                                    </div>
                                </div>
                                <div className='SuggestedForYou'>
                                    <h3>Price per night</h3>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='price1' />
                                        <label htmlFor="price1" className='rupes-svg'><MdCurrencyRupee />0 - <MdCurrencyRupee />3500</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='price2' />
                                        <label htmlFor="price2" className='rupes-svg'><MdCurrencyRupee />3500 - <MdCurrencyRupee />7000</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='price3' />
                                        <label htmlFor="price3" className='rupes-svg'><MdCurrencyRupee />7000 - <MdCurrencyRupee />9500</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='price1' />
                                        <label htmlFor="price1" className='rupes-svg'><MdCurrencyRupee />9500 - <MdCurrencyRupee />12000</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='price1' />
                                        <label htmlFor="price1" className='rupes-svg'><MdCurrencyRupee />12000 +</label>
                                    </div>
                                </div>
                                <div className='SuggestedForYou'>
                                    <h3>Star Category</h3>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='1Star' />
                                        <label htmlFor="1Star" className='start-svg'>Star {[1, 2, 3, 4, 5]?.map(() => <FaStar />)}</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='2Star' />
                                        <label htmlFor="2Star" className='start-svg'>Star {[1, 2, 3, 4]?.map(() => <FaStar />)}</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='3Star' />
                                        <label htmlFor="3Star" className='start-svg'>Star {[1, 2, 3]?.map(() => <FaStar />)}</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='4Star' />
                                        <label htmlFor="4Star" className='start-svg'>Star {[1, 2]?.map(() => <FaStar />)}</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='5Star' />
                                        <label htmlFor="5Star" className='start-svg'> Star {[1]?.map(() => <FaStar />)}</label>
                                    </div>
                                </div>
                                <div className='SuggestedForYou'>
                                    <h3>User Rating</h3>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='Excell' />
                                        <label htmlFor="Excell" className='start-svg'>Excellent: 4.2+</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='vGood' />
                                        <label htmlFor="vGood" className='start-svg'>Very Good: 3.5+</label>
                                    </div>
                                    <div className='check-btn-right'>
                                        <input type="checkbox" id='good' />
                                        <label htmlFor="good" className='start-svg'>Good: 3+</label>
                                    </div>
                                </div>
                            </div>
                            <div className='rct-view-dd' style={{ width: '100%' }}>
                                <h2 className='recently-veiw-ss'>Recently Viewed</h2>
                                <div className='list-data ht-layout-css-sr-lst' style={{ maxWidth: '100%' }}>
                                    {
                                        HotelResults?.map((hotelItem, index) => (
                                            <div className='cl-rt-ht-sr' key={index}>
                                                <div className='review-sr-ht'>
                                                    <div>
                                                        <h5>Good</h5>
                                                        <p>476 review</p>
                                                    </div>
                                                    <div>
                                                        {hotelItem?.StarRating}
                                                    </div>
                                                </div>
                                                <div className="ImageBox-ht-sr">
                                                    <img src={hotelItem?.HotelPicture} alt="service 01" className='sr-image' />
                                                    <div className='bedge-xx'>
                                                        <p>{hotelItem?.HotelName}</p>
                                                        {/* <p>2 beds (1 large double, 1 futon)</p> */}
                                                    </div>
                                                </div>
                                                <div className="content-bx-ht-sr">
                                                    <p>{hotelItem?.HotelName}</p>
                                                    <p><MdLocationPin /> {hotelItem?.HotelAddress} </p>
                                                    <p>{hotelItem?.HotelDescription}</p>
                                                    <p>
                                                        <span>
                                                            {hotelItem?.Price?.CurrencyCode} {hotelItem?.Price?.PublishedPrice}
                                                        </span>
                                                    </p>
                                                    <p className='room-guest-dt'>
                                                        <div>
                                                            Guest Details : Rooms {roomNoOfQuantity} - Adults {adultsQuantity} - Children {childrenQuantity}
                                                        </div>
                                                    </p>
                                                    <ButtonBook label={'Book'} onClick={() => getPerHotelDetailsFunc(hotelItem)} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                ) : (<SkeletonBookingList />)

            )}
            {ResponseStatus === 2 && ('Failed')}
            {ResponseStatus === 3 && ('InValidRequest')}
            {ResponseStatus === 4 && ('InValidSession')}
            {ResponseStatus === 5 && ('InValidCredentials')}
        </>
    )
}

export default HotelBookingServiceList