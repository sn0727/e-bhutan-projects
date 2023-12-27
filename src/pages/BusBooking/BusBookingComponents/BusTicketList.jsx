import React, { useEffect, useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from "../../../constent/SvgIcons"
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../atom/atom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedSeat, setBusDetails, setBusesFilter, setSelectedSeat } from '../../../app/slice/BusSlice'
import moment from 'moment'
import { durationWithTwoTime, filterTime } from '../../../utils/FlightUtils'

const buttonS = ["Cheapest", "Timings", "Duration"]

function BusTicketList({ setIdComponent }) {
    const dispatch = useDispatch();
    const filteredBuses = useSelector(state => state.buses.filteredBuses);
    console.log(filteredBuses);
    const apiDataValue = useRecoilValue(apiDataState)
    const [activeColor, setActiveColor] = useState('')

    console.log(apiDataValue, 'apiDataState list component')


    // set filter value in state
    const handleFilter = filterOption => {
        dispatch(setBusesFilter({ filterOption }));
    };

    useEffect(() => {
        handleFilter(activeColor)
    }, [activeColor])




    const Submit = (item) => {
        dispatch(setBusDetails(item))
        dispatch(resetSelectedSeat([]))
        setIdComponent(3)
    }

    return (
        <div className='booking-list-main'>
            <div className='booking-list-tb-button'>
                <div className='booking-list-tb-button-inr'>
                    {
                        buttonS.map((button, index) => (
                            <button type='button' className={`${activeColor === button ? 'activeColor' : null}`} key={index} onClick={() => setActiveColor(button)}> {button} </button>
                        ))
                    }
                </div>
            </div>
            <h3 className='tb-title mb-5'>Fares with Exclusive discounts</h3>
            <div className='booking-list-tb-content booking-list-bus'>
                {filteredBuses?.map((item, index) => (
                    <div key={index + 'buseslist'} className='booking-01 bus-booking-col'
                        onClick={() => Submit(item)}>
                        <div className='booking-01-inr'>
                            <div className='service-logo'>
                                {/* <img src={image?.airIndiaImage} alt="logo name" /> */}
                                <h3>{item?.TravelName}</h3>
                            </div>
                            <p className='avilable-seat'>{item?.AvailableSeats} Seats Left</p>
                        </div>
                        <div className='booking-01-inr'>
                            <p className='time-inr'>{filterTime(item?.DepartureTime)} - {filterTime(item?.ArrivalTime)}</p>
                            <p className='time-inr-dt'>{durationWithTwoTime(item?.ArrivalTime, item?.DepartureTime)}</p>
                        </div>
                        <div className='booking-01-inr'>
                            <p className='price-inr'>{SvgIcon?.indiaRupe} {(item?.BusPrice?.PublishedPrice * 1.05).toFixed(2)}</p>
                            <div className='Discounted-price-at extra-width-add'>
                                <p>Discounted price at {SvgIcon?.indiaRupeGreen} {item?.BusPrice?.PublishedPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BusTicketList