import React, { useState } from 'react'
import Header from '../../components/Common/Header/Header'
import PreviousButton from '../FlightsBooking/FlightBookingComponents/PreviousButton'
import FlightListOfService from '../FlightsBooking/FlightBookingComponents/FlightListOfService'
import Footer from '../../components/Common/Footer/Footer'
import BusTicketForm from './BusBookingComponents/BusTicketForm'
import BusTicketList from './BusBookingComponents/BusTicketList'
import AddBusTravelDetails from './BusBookingComponents/AddBusTravelDetails'
import BusBookingDetails from './BusBookingComponents/BusBookingDetails'
import AnimateGIF from '../../components/Common/AminateGIF/AnimateGIF'
import Loading from '../../components/Feature/Loading'
import { RecoilRoot } from 'recoil'

const BusBooking = () => {
    const [idComponent, setIdComponent] = useState(1)

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
                                <BusTicketForm setIdComponent={setIdComponent} />
                            </>
                        )
                    }
                    {
                        idComponent === 2 && (
                            <>
                                <BusTicketList setIdComponent={setIdComponent} />
                            </>
                        )
                    }
                    {
                        idComponent === 3 && (
                            <>
                                <AddBusTravelDetails setIdComponent={setIdComponent} />
                            </>
                        )
                    }
                    {
                        idComponent === 4 && (
                            <>
                                <BusBookingDetails setIdComponent={setIdComponent} />
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
            </RecoilRoot>
            <Footer />
        </>
    )
}

export default BusBooking