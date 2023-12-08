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

const SeatsListChange = ({ setIdComponent }) => {
  const formState = useRecoilValue(formStateAtom);
  const formStoreData = useSetRecoilState(formStateAtom);

  const [AddTravelDetailRes, setAddTravelDetailRes] = useState([])
  const setApiSingalData = useRecoilValue(apiSingalData);
  const saveResponseData = useRecoilValue(apiData)
  const ipAddress = useRecoilValue(ipAddressSave)
  const [isLoading, setIsLoading] = useState(true)
  const [activeButton, setActiveButton] = useState(0)
  const [selectUserState, setSelectUserState] = useState(formState[0])
  const [selectedSeat, setSelectedSeat] = useState('')
  const [resError, setEesError] = useState({})

  console.log(AddTravelDetailRes, 'AddTravelDetailRes =================')

  useEffect(() => {
    setIsLoading(true)
    let config = {
      method: 'post',
      url: ApiUrl?.bookingGetSSR,
      body: {
        "EndUserIp": ipAddress,
        "TraceId": saveResponseData?.TraceId,
        "ResultIndex": setApiSingalData?.ResultIndex
      }
    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res seats')
        setAddTravelDetailRes(res?.data?.Response)
        setIsLoading(false)
        // setIdComponent(4)
      },
      err => {
        console.log(err, '====================== err seats')
        setEesError(err)
        setIsLoading(false)
      }
    )
  }, [setAddTravelDetailRes])

  // Find object in Code for show box on right position
  const findObjectByCode = (seats, code) => {
    const foundObject = seats?.find(seat => seat.Code === code);
    return foundObject || null;
  }

  const findUser = (seat, ActiveUser) => {
    console.log(ActiveUser, '6789876545678467');
    const updatedData = formState.map(user => {
      if (user.id === ActiveUser.id) {
        console.log('waesrfyijutdse');
        return { ...user, SeatDynamic: [seat] };
      }
      return user;
    });
    formStoreData(updatedData);
  }

  const findByCode = (code) => {
    const foundObject = formState.find(user => user?.SeatDynamic && user?.SeatDynamic[0]?.Code === code);
    return foundObject !== undefined;
  }

  // Find object in Code for show box on right position
  const findObjectByCodeTwo = (Seats, code) => {
    const foundObject = Seats.find(seat => seat.Code === code);
    return foundObject || null;
  }


  useEffect(()=> {
    console.log(formState, '================ formState')
  }, [formState])

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
                    formState?.map((userData, index) => (
                      <div className={`userName-dd ${activeButton === index ? 'activeButon' : ''}`} onClick={() => selectedUserFuc(userData, index)}>
                        <FaAngleRight />
                        <span>Mr {userData?.fistname} {userData?.lastname} </span>
                        <span>{userData?.SeatDynamic ? `(${userData?.SeatDynamic[0]?.Code})` : null}</span>
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
                    AddTravelDetailRes?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats?.length > 0 ?
                      AddTravelDetailRes?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats?.map((items, index) => (
                        <tr className='seatList-tr'>
                          {
                            findObjectByCode(items?.Seats, `${index}A`) ?
                              <td onClick={() => !findByCode(`${index}A`) ? handlerSelectedSeat(items?.Seats, `${index}A`) : console.log('err')} className={findByCode(`${index}A`) ? 'activeButon' : ''} > &#8377; {findObjectByCode(items?.Seats, `${index}A`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}B`) ?
                              <td onClick={() => !findByCode(`${index}B`) ? handlerSelectedSeat(items?.Seats, `${index}B`) : console.log('err')} className={findByCode(`${index}B`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}B`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}C`) ?
                              <td onClick={() => !findByCode(`${index}C`) ? handlerSelectedSeat(items?.Seats, `${index}C`) : console.log('err')} className={findByCode(`${index}C`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}C`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          <td>{index + 1}</td>
                          {
                            findObjectByCode(items?.Seats, `${index}D`) ?
                              <td onClick={() => !findByCode(`${index}D`) ? handlerSelectedSeat(items?.Seats, `${index}D`) : console.log('err')} className={findByCode(`${index}D`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}D`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}E`) ?
                              <td onClick={() => !findByCode(`${index}E`) ? handlerSelectedSeat(items?.Seats, `${index}E`) : console.log('err')} className={findByCode(`${index}E`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}E`)?.Price}</td>
                              : <td><IoClose style={{ margin: 'auto' }} /></td>
                          }
                          {
                            findObjectByCode(items?.Seats, `${index}F`) ?
                              <td onClick={() => !findByCode(`${index}F`) ? handlerSelectedSeat(items?.Seats, `${index}F`) : console.log('err')} className={findByCode(`${index}F`) ? 'activeButon' : ''}> &#8377; {findObjectByCode(items?.Seats, `${index}F`)?.Price}</td>
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
        <button type='button' className='button-pro' onClick={() => setIdComponent(6)}>
          <Link type='button'>Proceed</Link>
        </button>
      </div>
    </>
  )
}

export default SeatsListChange