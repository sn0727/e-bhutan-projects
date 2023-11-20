import React from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { TourAndTravelData } from '../../constent/services-data'
import { Link } from 'react-router-dom'
import FlightTicket from './flight-ticket/FlightTicket'
const TravelAndTour = () => {
  return (
    <div>
      <Header />
      {/* Tour & Travel */}
      {/* <section className='rechages-bill-payment'>
        <div className="container px-4">
          <div className="recharge-bill-payment-innerBox h-178">
            <h2>Tour & Travel</h2>
            <div className='servics-list tour-and-travel'>
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
          </div>
        </div>
      </section> */}
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
        <FlightTicket />
      </div>



      <Footer />
    </div>
  )
}

export default TravelAndTour
