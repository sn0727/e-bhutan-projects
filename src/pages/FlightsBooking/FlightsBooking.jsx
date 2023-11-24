import React, { useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import  "./css/flightBooking.css"
import FlightTicketForm from './FlightBookingComponents/FlightTicketForm'
import FlightListOfService from './FlightBookingComponents/FlightListOfService'
import FlightTicketList from './FlightBookingComponents/FlightTicketList'
import PreviousButton from './FlightBookingComponents/PreviousButton'


const FlightsBooking = () => {
    const [idComponent, setIdComponent] = useState(2)

    return (
        <>
            <Header />
            <div className='comman-container px-4'>
                <PreviousButton setIdComponent={setIdComponent} idComponent={idComponent} />
                {
                    idComponent === 1 && (
                        <>
                            <FlightListOfService />
                            <FlightTicketForm setIdComponent={setIdComponent} />
                        </>
                    )
                }
                {
                    idComponent === 2 && (
                        <>
                            <FlightTicketList />
                        </>
                    )
                }
            </div>
            <Footer />
        </>
    )
}

export default FlightsBooking