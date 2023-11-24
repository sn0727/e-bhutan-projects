import React from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { TourAndTravelData } from '../../constent/services-data'
import { Link } from 'react-router-dom'
import FlightTicket01 from './FlightBookingComponents/FlightTicket01'

const FlightsBooking = () => {
    return (
        <div>
            <Header />
            {/* Tour & Travel */}
            <div className="px-4">
                <div className='travel-service-list py-8'>
                    {
                        TourAndTravelData.map((item, index) => (
                            <Link to={item.link} className='services_is' key={index}>
                                <div className='serviceItem'>
                                    <img src={item.image} alt="upi" />
                                </div>
                                <p>{item.title}</p>
                            </Link>
                        ))
                    }
                </div>
                <FlightTicket01 />
            </div>
            <Footer />
        </div>
    )
}

export default FlightsBooking