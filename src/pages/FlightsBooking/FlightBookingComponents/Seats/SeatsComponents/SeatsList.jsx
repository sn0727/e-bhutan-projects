import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { apiData, apiSingalData, formStateAtom, ipAddressSave, saveUserDetails } from '../../../atom/atom'
import { APIRequest, ApiUrl } from '../../../../../utils/api'
import { toast } from 'react-toastify'
import Loader from '../../../../../components/Feature/Loader'
import { IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { SeatData } from './SeatsData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPassenger } from '../../../../../app/slice/FlightSlice'

const SeatsList = ({ setIdComponent }) => {
  const dispatch = useDispatch()
  const ResultIndex = useSelector(state => state.flights.ResultIndex);
  const AllPassenger = useSelector(state => state.flights.AllPassenger)
  const [AddTravelDetailRes, setAddTravelDetailRes] = useState([])
  const saveResponseData = useRecoilValue(apiData)
  const ipAddress = useRecoilValue(ipAddressSave)
  const [isLoading, setIsLoading] = useState(true)
  const [activeButton, setActiveButton] = useState(0)
  const [selectUserState, setSelectUserState] = useState(AllPassenger[0])
  const [resError, setEesError] = useState({})

  console.log(AddTravelDetailRes, 'AddTravelDetailRes =================')

  // Get ssr api 
  const SendRequest = (type) => {
    setIsLoading(true)
    let config = {
      method: 'post',
      url: ApiUrl?.bookingGetSSR,
      body: {
        "EndUserIp": ipAddress,
        "TraceId": saveResponseData?.Response?.TraceId,
        "ResultIndex": ResultIndex[type]
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res seats')
        setAddTravelDetailRes(res?.data?.Response)
        setIsLoading(false)
      },
      err => {
        console.log(err, '====================== err seats')
        setEesError(err)
        setIsLoading(false)
      }
    )
  }

  useEffect(() => {
    if (ResultIndex?.departure) {
      SendRequest('departure')
    }
    if (ResultIndex?.return) {
      SendRequest('return')
    }
  }, [])

  // Find object in Code for show box on right position
  const findObjectByCode = (seats, code) => {
    const foundObject = seats?.find(seat => seat.Code === code);
    return foundObject || null;
  }

  // find user and insert seat data in user
  const findUser = (seat, ActiveUser) => {
    const updatedData = AllPassenger.map(user => {
      if (user.label === ActiveUser.label) {
        return { ...user, userData: { ...user.userData, SeatDynamic: [seat] } };
      }
    });
    dispatch(setAllPassenger(updatedData));
  }

  // Find object in Code for show box on right position
  const findByCode = (code) => {
    // console.log(code, 'dddddd', AllPassenger[0].userData.SeatDynamic[0]?.Code);
    const foundObject = AllPassenger.find(user => user?.userData?.SeatDynamic && user.userData.SeatDynamic[0]?.Code === code);
    return foundObject !== undefined;
  }

  // Find object in Code for show box on right position
  const findObjectByCodeTwo = (Seats, code) => {
    const foundObject = Seats.find(seat => seat.Code === code);
    return foundObject || null;
  }



  const selectedUserFuc = (data, index) => {
    setSelectUserState(data)
    setActiveButton(index)
  }

  const handlerSelectedSeat = (Seats, code) => {
    findUser(findObjectByCodeTwo(Seats, code), selectUserState)
  }

  return (
    <>
      <div className='seat-table'>
        {
          isLoading ? <Loader isLoading={isLoading} /> :
            <>
              <div className='userNmae-list'>
                <div className='listName-rr'>
                  {
                    AllPassenger?.map((userData, index) => (
                      <div className={`userName-dd ${activeButton === index ? 'activeButon' : ''}`} onClick={() => selectedUserFuc(userData, index)}>
                        <FaAngleRight />
                        <span>Mr {userData?.userData?.FirstName} {userData?.userData?.LastName} </span>
                        <span>{userData?.userData?.SeatDynamic ? `(${userData?.userData?.SeatDynamic[0]?.Code})` : null}</span>
                      </div>
                    ))
                  }
                  {/* <div className='userName-dd'>
                    <FaAngleRight />
                    <span>Mr Mohd Alam</span>
                    <span>(6-F)</span>
                  </div>
                  <div className='userName-dd'>
                    <FaAngleRight />
                    <span>Mr Mohd Alam</span>
                    <span>(6-F)</span>
                  </div> */}
                </div>
              </div>
              <table>
                <thead>
                  <tr className='seatList-tr'>
                    <th><div>A</div></th>
                    <th><div>B</div></th>
                    <th><div>C</div></th>
                    <th><div>1</div></th>
                    <th><div>D</div></th>
                    <th><div>E</div></th>
                    <th><div>F</div></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    AddTravelDetailRes?.SeatDynamic?
                      AddTravelDetailRes?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats?.map((items, index) => (
                        <tr className='seatList-tr' key={`SeatList${index}`}>
                          {
                            findObjectByCode(items?.Seats, `${index}A`) ?
                              <td onClick={() => !findByCode(`${index}A`) ? handlerSelectedSeat(items?.Seats, `${index}A`) : alert('Seat Booked')} className={findByCode(`${index}A`) ? 'activeButon' : ''} > &#8377; {findObjectByCode(items?.Seats, `${index}A`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}B`) ?
                              <td onClick={() => !findByCode(`${index}B`) ? handlerSelectedSeat(items?.Seats, `${index}B`) : alert('Seat Booked')} className={findByCode(`${index}B`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}B`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}C`) ?
                              <td onClick={() => !findByCode(`${index}C`) ? handlerSelectedSeat(items?.Seats, `${index}C`) : alert('Seat Booked')} className={findByCode(`${index}C`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}C`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          <td>{index + 1}</td>
                          {
                            findObjectByCode(items?.Seats, `${index}D`) ?
                              <td onClick={() => !findByCode(`${index}D`) ? handlerSelectedSeat(items?.Seats, `${index}D`) : alert('Seat Booked')} className={findByCode(`${index}D`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}D`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}E`) ?
                              <td onClick={() => !findByCode(`${index}E`) ? handlerSelectedSeat(items?.Seats, `${index}E`) : alert('Seat Booked')} className={findByCode(`${index}E`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}E`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}F`) ?
                              <td onClick={() => !findByCode(`${index}F`) ? handlerSelectedSeat(items?.Seats, `${index}F`) : alert('Seat Booked')} className={findByCode(`${index}F`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}F`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                        </tr>
                      )) : 'not found'
                  }
                </tbody>
              </table>
            </>
        }
      </div>
      <div className='button-process procced-chnage-space'>
        <button type='button' className='button-pro' onClick={() => console.log('procced')}>
          <Link type='button'>Proceed</Link>
        </button>
      </div>
    </>
  )
}

export default SeatsList