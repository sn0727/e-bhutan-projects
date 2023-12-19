import React, { useEffect, useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import { APIRequest, ApiUrl } from '../../utils/api';
import { toast } from 'react-toastify';
import { Autocomplete, TextField } from '@mui/material';


const top100Films = [
  { title: 'Andhra Pradesh', year: 1994 },
  { title: 'DEL', year: 1994 },
  { title: 'Arunachal Pradesh', year: 1972 },
  { title: 'BOM', year: 1972 },
  { title: 'Assam', year: 1974 },
  { title: 'Chhattisgarh', year: 2008 },
  { title: 'Goa', year: 1957 },
  { title: "Gujarat", year: 1993 },
  { title: 'Maharashtra', year: 1994 },
]




const FlightReleasePNRRequest = (props) => {
  const {
    ipAddress,
    BookingId,
    setBookingId,
    AirlineSources,
    setAirlineSources,
    setcondition,
  } = props

  const [isLoading, setisLoading] = useState(false);

  const SendRequeset = () => {
    setisLoading(true)
    let config = {
      method: 'post',
      url: ApiUrl?.flightReleasePNRRequest,
      body: {
        "EndUserIp": ipAddress,
        "BookingId": BookingId,
        "Source": AirlineSources
      },

    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res booking dd')
        setisLoading(false)
        setcondition(2)
      },
      err => {
        console.log(err, '====================== err booking')
        toast.error(err?.message)
        setisLoading(false)
        setcondition(2)
      }
    )
  }


  return (
    <>
      <Header />
      <div style={{ alignItems: 'center', }}>
        <div className='card-box mx-auto my-5 p-4 space-y-4 md:space-y-6'>
          <div className=" ">
            <div className='myW position-relative'>
              <label htmlFor="BookingId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Booking Id</label>
              <input type="text"
                onChange={(e) => setBookingId(e.target.value)}
                placeholder='Booking Id'
                name='BookingId'
                value={BookingId}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className='myW position-relative'>
              <label htmlFor="AirlineSources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Airline Sources</label>
              <input type="text"
                onChange={(e) => setAirlineSources(e.target.value)}
                placeholder='Airline Sources'
                name='AirlineSources'
                value={AirlineSources}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className='text-center'>
            <button
              onClick={() => SendRequeset()}
              type="submit"
              className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
            >Proceed</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
const SendChangeRequest = (props) => {
  const {
    ipAddress,
    BookingId,
    setBookingId,
    AirlineSources,
    setAirlineSources,
    setcondition,
  } = props
  const [Remarks, setRemarks] = useState('')
  const [toValue, setToValue] = React.useState(null);
  const [fromValue, setFromValue] = React.useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [TicketId, setTicketId] = useState('')

  const SendRequeset = () => {
    setisLoading(true)
    let str = TicketId
    let cleanedStr = str.replace(/\s/g, '').replace(/\s*,\s*/g, ',');
    let arr = cleanedStr.split(',').map(Number);
    let config = {
      method: 'post',
      url: ApiUrl?.flightSendChangeRequest,
      body: {
        "BookingId": BookingId,
        "RequestType": 1,
        "CancellationType": 3,
        "Sectors": [
          {
            "Origin": toValue,
            "Destination": fromValue
          }
        ],
        "TicketId": arr,
        "Remarks": Remarks,
        "EndUserIp": ipAddress,
      },

    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res booking dd')
        setisLoading(false)
        SendRequeset2('test')
      },
      err => {
        console.log(err, '====================== err booking')
        toast.error(err?.message)
        setisLoading(false)
      }
    )
  }
  const SendRequeset2 = (ChangeRequestId) => {
    setisLoading(true)
    let config = {
      method: 'post',
      url: ApiUrl?.flightGetChangeRequestStatus,
      body: {
        "ChangeRequestId": ChangeRequestId,
        "EndUserIp": ipAddress,
      },

    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res booking dd')
        setisLoading(false)
        setcondition(2)
      },
      err => {
        console.log(err, '====================== err booking')
        toast.error(err?.message)
        setisLoading(false)
      }
    )
  }

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };


  return (
    <>
      <Header />
      <div style={{ alignItems: 'center', }}>
        <div className='card-box mx-auto my-5 p-4 space-y-4 md:space-y-6'>
          <div className=" ">
            <div className='myW position-relative'>
              <label htmlFor="TicketId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Id</label>
              <input type="text"
                onChange={(e) => setTicketId(e.target.value)}
                placeholder='1234567,234567'
                name='TicketId'
                value={TicketId}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p style={{ fontSize: 10, color: 'gray' }}>Enter ticket id in this format(123456,23456,234534)</p>
            </div>
            <div className='myW position-relative formGroup'>
              <Autocomplete
                style={{ width: '100%' }}
                {...defaultProps}
                id="disable-close-on-select"
                onChange={(event, newValue) => {
                  setToValue(newValue); // Update the selected option when an option is selected
                }}
                clearOnEscape
                value={toValue}
                renderInput={(params) => (
                  <TextField {...params} label="To" variant="standard" />
                )}
              />
              <Autocomplete
                style={{ width: '100%' }}
                {...defaultProps}
                id="disable-close-on-select"
                onChange={(event, newValue) => {
                  setFromValue(newValue); // Update the selected option when an option is selected
                }}
                clearOnEscape
                value={fromValue}
                renderInput={(params) => (
                  <TextField {...params} label="From" variant="standard" />
                )}
              />
            </div>
            <div className='myW position-relative'>
              <label htmlFor="Remarks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
              <input type="text"
                onChange={(e) => setRemarks(e.target.value)}
                placeholder='Remarks'
                name='Remarks'
                value={Remarks}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className='text-center'>
            <button
              onClick={() => SendRequeset()}
              type="submit"
              className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
            >Proceed</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
const FlightTicketCancel = () => {
  const [BookingId, setBookingId] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [AirlineSources, setAirlineSources] = useState('')
  const [condition, setcondition] = useState(1)

  // get ip address value
  const getIpAddressFun = async () => {
    const response = await fetch(
      `https://api.db-ip.com/v2/free/self`
    );
    const data = await response.json();
    setIpAddress(data?.ipAddress);
  }
  useEffect(() => {
    getIpAddressFun()
  }, [])

  if (condition === 1) {
    return (
      <FlightReleasePNRRequest
        BookingId={BookingId}
        setBookingId={setBookingId}
        AirlineSources={AirlineSources}
        setAirlineSources={setAirlineSources}
        setcondition={setcondition}
        ipAddress={ipAddress}
      />
    )
  } else if (condition === 2) {
    return (
      <SendChangeRequest
        BookingId={BookingId}
        setBookingId={setBookingId}
        AirlineSources={AirlineSources}
        setAirlineSources={setAirlineSources}
        setcondition={setcondition}
        ipAddress={ipAddress}
      />
    )
  } else {
    return (
      <p>decv</p>
    )
  }

}





export default FlightTicketCancel
