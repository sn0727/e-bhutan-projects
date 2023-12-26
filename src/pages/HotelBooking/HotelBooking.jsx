import React, { useState } from 'react'
import HotelBookingTicketForm from './HotelBookingComponents/HotelBookingTicketForm'
import { RecoilRoot } from 'recoil'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { Skeleton } from '@mui/material'
import { SkeletonBookingForm } from '../../components/SkeletonTemplate/SkeletonBookingForm'
import PreviousButton from '../FlightsBooking/FlightBookingComponents/PreviousButton'
import FlightListOfService from '../FlightsBooking/FlightBookingComponents/FlightListOfService'
import HotelBookingServiceList from './HotelBookingComponents/HotelBookingServiceList'
import ServiceBookingDetails from './HotelBookingComponents/ServiceBookingDetails'
import HotelPassengerDetails from './HotelBookingComponents/HotelPassengerDetails'
import HotelPaymentSummary from './HotelBookingComponents/PaymentSummary'
import HotelConfirmBooking from './HotelBookingComponents/HotelConfirmBooking'
import HotelCancelBooking from './HotelBookingComponents/HotelCancelBooking'
import HotelCancelBookingById from './HotelBookingComponents/HotelCancelBookingById'

const HotelBooking = () => {
  const [idComponent, setIdComponent] = useState(1)
  const [animateSkeleton, setAnimateSkeleton] = useState(false)

  // setTimeout(() => {
  //   setAnimateSkeleton(false)
  // }, 3000)

  return (
    <RecoilRoot>
      <Header />
      <div className='comman-container px-4'>
        <PreviousButton setIdComponent={setIdComponent} idComponent={idComponent} />
        {
          (idComponent === 1) && (
            (animateSkeleton ? (<SkeletonBookingForm />) : (
              <>
                <FlightListOfService />
                <HotelBookingTicketForm setIdComponent={setIdComponent} />
              </>
            ))
          )
        }
        {
          (idComponent === 2) && (
            <>
              <HotelBookingServiceList setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 3) && (
            <>
              <ServiceBookingDetails setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 4) && (
            <>
              <HotelConfirmBooking setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 5) && (
            <>
              <HotelPassengerDetails setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 6) && (
            <>
              <HotelPaymentSummary setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 7) && (
            <>
              <HotelCancelBooking setIdComponent={setIdComponent} />
            </>
          )
        }
        {
          (idComponent === 8) && (
            <>
              <HotelCancelBookingById setIdComponent={setIdComponent} />
            </>
          )
        }
      </div>
      <Footer />
    </RecoilRoot>
  )
}

export default HotelBooking