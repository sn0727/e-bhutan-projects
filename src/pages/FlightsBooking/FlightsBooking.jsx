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
import PassengerDetails from './FlightBookingComponents/PassengerDetails'
import { RecoilRoot } from 'recoil'
import SeatsMain from './FlightBookingComponents/Seats/SeatsMain'


const FlightsBooking = () => {
    const [idComponent, setIdComponent] = useState(1)
    const [saveResponseData, setSaveResponseData] = useState([])

    console.log(idComponent, 'idComponent ==========')

    const flightBookingData = (data) => {
        setSaveResponseData(data)
    }

    return (
        <>
            <Header />
            <RecoilRoot>
                <div className='comman-container px-4'>
                    <PreviousButton setIdComponent={setIdComponent} idComponent={idComponent} />
                    {
                        idComponent === 1 && (
                            <>
                                <FlightListOfService />
                                <FlightTicketForm
                                    setIdComponent={setIdComponent}
                                    flightBookingData={flightBookingData}
                                />
                            </>
                        )
                    }
                    {
                        idComponent === 2 && (
                            <>
                                <FlightTicketList
                                    setIdComponent={setIdComponent}
                                    saveResponseData={saveResponseData}
                                />
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
                                <PassengerDetails setIdComponent={setIdComponent} />
                            </>
                        )
                    }

                    {/* {
                        idComponent === 5 && (
                            <>
                                <BookingDetails setIdComponent={setIdComponent} />
                            </>
                        )
                    } */}
                    {
                        idComponent === 5 && (
                            <>
                                <SeatsMain setIdComponent={setIdComponent} />
                            </>
                        )
                    }

                    {
                        idComponent === 6 && (
                            <>
                                <BookingDetails setIdComponent={setIdComponent} />
                            </>
                        )
                    }

                    {
                        idComponent === 7 && (
                            <>
                                <Loading setIdComponent={setIdComponent} />
                            </>
                        )
                    }

                    {
                        idComponent === 8 && (
                            <>
                                <AnimateGIF setIdComponent={setIdComponent} />
                            </>
                        )
                    }
                </div>
            </RecoilRoot>
            <Footer />
        </>
    )
}

export default FlightsBooking