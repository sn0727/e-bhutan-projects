import React, { useState } from 'react'
import { TourAndTravelData } from '../../../constent/services-data'
import { Link } from 'react-router-dom'

const FlightListOfService = () => {

    return (
        <div className="px-5">
            <div className='travel-service-list new-class-travel py-8'>
                {
                    TourAndTravelData?.map((item, index) => (
                        <Link to={item.link} className='services_is' key={index}>
                            <div className='serviceItem'>
                                {/* <img src={item?.image} alt="upi" /> */}
                                {item?.icon}
                            </div>
                            <p>{item.title}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default FlightListOfService