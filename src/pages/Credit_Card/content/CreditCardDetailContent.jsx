import React from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const CreditCardDetailContent = () => {
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <h1>Credit Card Payment</h1>
          <h2 className='sdfnsd-dsfldskl my-4'><LuIndianRupee /> <span>14,112.00</span></h2>
          <p className='text-center mb-4 PaymentDetails'>Payment Details</p>
        </div>
        <div className="bill-details bill-details-two">
          <div className="bill-details-right">
            <ul>
              <li>Consumer Id</li>
              <li>Consumer Name</li>
              <li>Due Date</li>
              <li>Amount</li>
              <li>Invoice No.</li>
              <li>Bill Date</li>
              <li>Bill Period</li>
            </ul>
            <ul>
              <li>123456789</li>
              <li>Raju Lal Chauhan</li>
              <li>June 9, 2023</li>
              <li>1,000.54</li>
              <li>12274929237687</li>
              <li>May 31, 2023</li>
              <li>June 28, 2023 to <br></br> May 28,2023 </li>
            </ul>
          </div>
        </div>
        <div className="enter-mobilenum cs-w-45">
            <label className='lable-text d-block'>Enter OPT</label>
            <div className='set-p-relative'>
              <input type="text" maxLength={6} className='enter-mobile-num InputTextColor' defaultValue={'123456'} />
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

export default CreditCardDetailContent
