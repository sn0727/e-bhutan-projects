import React from 'react';
import { BiSolidChevronRight } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { services } from "../../../constent/services-data"

const HomeContent = () => {
  
  return (
    <>
      {/* <section className='offer-box'>
        <div className="container">
          <div className="offerboxs">
            <div className='offer-box'>
              <img src="assets/image/offer/offer.png" alt="offer" />
              <span>Get 40% cash back on Mobile Recharge</span>
              <span><BiSolidChevronRight /></span>
            </div>
            <div className='offer-box'>
              <img src="assets/image/offer/offer.png" alt="offer" />
              <span>Get 40% cash back on Mobile Recharge</span>
              <span><BiSolidChevronRight /></span>
            </div>
            <div className='offer-box'>
              <img src="assets/image/offer/offer.png" alt="offer" />
              <span>Get 40% cash back on Mobile Recharge</span>
              <span><BiSolidChevronRight /></span>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className='Prepaidoffer-box'>
        <div className="container">
          <div className="offerboxs">
            <div className='offer-box'>
              <img src="assets/image/recharge/airtel.png" alt="recharge" />
              <span className='multiple-content'>
                <p>Prepaid - 9876543210</p>
                <p>&#8377; 200 plan expires on Sat, 01 Jul</p>
              </span>
              <span>
                <p>Recharge</p>
              </span>
            </div>
            <div className='offer-box'>
              <img src="assets/image/recharge/dishtv.png" alt="recharge" />
              <span className='multiple-content'>
                <p>Dish TV Recharge</p>
                <p>&#8377; 799 plan expires on Sat, 08 Jul</p>
              </span>
              <span>
                <p>Recharge</p>
              </span>
            </div>
            <div className='offer-box'>
              <img src="assets/image/recharge/hpgas.png" alt="recharge" />
              <span className='multiple-content'>
                <p>Gas Bill Due</p>
                <p>&#8377; 1000 plan expires on Sat, 01 Jul</p>
              </span>
              <span>
                <p>Recharge</p>
              </span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Recharge & Bill Payment */}
      <section className='rechages-bill-payment mb-5'>
        <div className="container mx-auto px-4">
          <div className="recharge-bill-payment-innerBox h-344">
            <h2>Recharge & Bill Payment</h2>
            <div className='servics-list'>
              {

                services.map(({RechargeBillPayment}) => (
                  RechargeBillPayment.map((item, index) => (
                    <Link to={item.link} className='services_is' key={index}>
                      <div className={`serviceItem ${item.ImageColor}`}>
                        <img src={item.image} alt="upi" />
                      </div>
                      <p>{item.title}</p>
                    </Link>
                  ))
                ))
              }

            </div>
          </div>
        </div>
      </section>
      {/* Recharge & Bill Payment */}

      {/* Banking Services & Insurance Services */}
      <section className='rechages-bill-payment'>
        <div className="container px-4">
          <div className="recharge-bill-payment-innerBox h-344">
            <h2>Banking Services & Insurance Services</h2>
            <div className='servics-list banking-service'>
              {
                services.map(({BankingServicesAndInsuranceServices}) => (
                  BankingServicesAndInsuranceServices.map((item, index) => (
                    <Link to={item.link} className='services_is' key={index}>
                      <div className='serviceItem'>
                        <img src={item.image} alt="upi" />
                      </div>
                      <p>{item.title}</p>
                    </Link>
                  ))
                ))
              }
            </div>
          </div>
        </div>
      </section>
      {/* Banking Services & Insurance Services */}

      {/* Tour & Travel */}
      {/* <section className='rechages-bill-payment'>
        <div className="container px-4">
          <div className="recharge-bill-payment-innerBox h-178">
            <h2>Tour & Travel</h2>
            <div className='servics-list tour-and-travel'>
              {

                services.map(({TourAndTravel}) => (
                  TourAndTravel.map((item, index) => (
                    <Link to={item.link} className='services_is' key={index}>
                      <div className='serviceItem'>
                        <img src={item.image} alt="upi" />
                      </div>
                      <p>{item.title}</p>
                    </Link>
                  ))
                ))
              }

            </div>
          </div>
        </div>
      </section> */}
      {/* Tour & Travel */}

      {/* Financial Services */}
      {/* <section className='rechages-bill-payment mb-319'>
        <div className="container">
          <div className="recharge-bill-payment-innerBox h-318">
            <h2>Financial Services</h2>
            <div className='servics-list tour-and-travel'>
              {

                services.map(({FinancialServices}) => (
                  FinancialServices.map((item, index) => (
                    <Link to="" className='services_is' key={index}>
                      <div className='serviceItem'>
                        <img src={item.image} alt="upi" />
                      </div>
                      <p>{item.title}</p>
                    </Link>
                  ))
                ))
              }

            </div>
          </div>
        </div>
      </section> */}
      {/* Financial Services */}

    </>

  )
}

export default HomeContent