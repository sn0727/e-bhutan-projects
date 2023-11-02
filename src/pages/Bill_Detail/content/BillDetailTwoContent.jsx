import React from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const BillDetailTwoContent = () => {
  return (
    <React.Fragment>
      <div className="comman-container px-4">
        <div className='mobile-recharge'>
          <h1>Broadband Bill Payment</h1>
          <h2 className='sdfnsd-dsfldskl'><LuIndianRupee /> <span>1,000.54</span></h2>
        </div>
        <div className="bill-details bill-details-two">
          <div className="bill-details-left12">
            <p className='text-center mb-4'>Bill Details</p>
            <div className='sdfdsnk'>
              <ul>
                <li>Due Date</li>
                <li>Bill Date</li>
                <li>Consumer Name</li>
              </ul>
              <ul>
                <li>June 9, 2023</li>
                <li>May 31, 2023</li>
                <li>Raju Lal Chauhan</li>
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

export default BillDetailTwoContent
