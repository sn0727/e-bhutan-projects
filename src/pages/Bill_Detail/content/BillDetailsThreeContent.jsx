import React from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const BillDetailsThreeContent = () => {
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <h1>Municipal Tax Payment</h1>
          <h2 className='sdfnsd-dsfldskl my-4'><LuIndianRupee /> <span>14,112.00</span></h2>
          <p className='text-center mb-4 PaymentDetails'>Payment Details</p>
        </div>
        <div className="bill-details bill-details-two">
          <div className="bill-details-left12">

            <div className='sdfdsnk three-payment-method'>
              <ul>
                <li>
                  <p className='mb-1'>General Tax</p>
                  <span>Rate</span>
                  <span className='text-black'> 23.5 </span>
                </li>
                <li>
                  <p className='mb-1'>Water Benefit Tax</p>
                  <span>Rate</span>
                  <span className='text-black'> 1 </span>
                </li>
                <li>
                  <p className='mb-1'>Defecation Benefit Tax</p>
                  <span>Rate</span>
                  <span className='text-black'> 3 </span>
                </li>
                <li>
                  <p className='mb-1'>Tuition Cess</p>
                  <span>Rate</span>
                  <span className='text-black'> 1 </span>
                </li>
                <li>
                  <p className='mb-1'>Tree Cess</p>
                </li>
              </ul>
              <ul>
                <li>6813.00</li>
                <li>290.00</li>
                <li>870.00</li>
                <li>290.00</li>
                <li>145.00</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='button-process'>
          <button type='button' className='button-pro'>
            <Link to={"/payment-success"}>Proceed</Link>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BillDetailsThreeContent
