import React, { useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import "./css/flightBooking.css"
import FlightTicketForm from './FlightBookingComponents/FlightTicketForm'
import FlightListOfService from './FlightBookingComponents/FlightListOfService'
import FlightTicketList from './FlightBookingComponents/FlightTicketList'
import PreviousButton from './FlightBookingComponents/PreviousButton'
import AddTravelDetails from './FlightBookingComponents/AddTravelDetails'
import BookingDetails from './FlightBookingComponents/BookingDetails'
import Loading from '../../components/Feature/Loading'
import AnimateGIF from '../../components/Common/AminateGIF/AnimateGIF'


const FlightsBooking = () => {
    const [idComponent, setIdComponent] = useState(1)

    return (
        <>
            <Header />
            <div className='comman-container px-4'>
                <PreviousButton setIdComponent={setIdComponent} idComponent={idComponent} />
                {
                    idComponent === 1 && (
                        <>
                            <FlightListOfService />
                            <FlightTicketForm setIdComponent={setIdComponent}  />
                        </>
                    )
                }
                {
                    idComponent === 2 && (
                        <>
                            <FlightTicketList setIdComponent={setIdComponent} />
                        </>
                    )
                }
                {
                    idComponent === 3 && (
                        <>
                            <AddTravelDetails setIdComponent={setIdComponent} />
                        </>
                    )
                }
                {
                    idComponent === 4 && (
                        <>
                            <BookingDetails setIdComponent={setIdComponent} />
                        </>
                    )
                }

                {
                    idComponent === 5 && (
                        <>
                            <Loading setIdComponent={setIdComponent} />
                        </>
                    )
                }

                {
                    idComponent === 6 && (
                        <>
                            <AnimateGIF setIdComponent={setIdComponent} />
                        </>
                    )
                }

            </div>
            <Footer />
        </>
    )
}

export default FlightsBooking