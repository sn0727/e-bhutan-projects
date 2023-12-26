import React, { useEffect, useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { ipAddress } from '../atom/atom'
import SeatLayout from './SeatLayout'
import { setAllPassenger } from '../../../app/slice/BusSlice'
import Loader from '../../../components/Feature/Loader'

const AddBusTravelDetails = ({ setIdComponent }) => {
    const dispatch = useDispatch()
    const busDetails = useSelector(state => state.buses.busDetails);
    const selectedSeat = useSelector(state => state.buses.selectedSeat);
    const TraceId = useSelector(state => state.buses.TraceId);
    const [isLoading, setisLoading] = useState(false);
    const IpAddress = useRecoilValue(ipAddress)
    const [res, setres] = useState('')
    const [BoardingPointDetails, setBoardingPointDetails] = useState()


    const GetSeatLayout = () => {
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.busGetBusSeatLayOut,
            body: {
                "EndUserIp": IpAddress,
                "ResultIndex": busDetails?.ResultIndex,
                "TraceId": TraceId
            }
        }
        console.log(config, 'config');
        APIRequest(
            config,
            res => {
                console.log(res, '===========busGetBusSeatLayOut ')
                setres(res)
                setisLoading(false)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setisLoading(false)
            }
        )
    }
    const GetBoardingPointDetails = () => {
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.busGetBoardingPointDetails,
            body: {
                "EndUserIp": IpAddress,
                "ResultIndex": busDetails?.ResultIndex,
                "TraceId": TraceId
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res, '===============busGetBoardingPointDetails')
                setBoardingPointDetails(res)
                setisLoading(false)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setisLoading(false)
            }
        )
    }

    useEffect(() => {
        GetSeatLayout()
        GetBoardingPointDetails()
    }, [])
    const TotalPrice = (data) => {
        const result = data.reduce((total, obj) => {
            return total + obj.Price.PublishedPrice;
        }, 0);
        return result
    }

    const setPassengerData = () => {
        let AllPassenger = []
        for (let i = 0; i < selectedSeat?.length; i++) {
            AllPassenger.push({ isShow: i === 0 ? true : false, label: `Passenger ${i + 1}`, seat: selectedSeat[i] })
        }
        dispatch(setAllPassenger(AllPassenger))
    }

    const Submit = () => {
        setPassengerData()
        setIdComponent(4)
    }

    console.log(selectedSeat, 'selectedSeat----');

    return (
        <div className='add-travel-detail'>

            <h3 className='add-travel-detail-title'>Select seat</h3>
            {res ? <SeatLayout
                seatLayoutData={res?.data.GetBusSeatLayOutResult.SeatLayoutDetails.SeatLayout}
            /> : null}
            <div>
                <h3>Total Price</h3>
                <h5>{TotalPrice(selectedSeat)}</h5>
            </div>
            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => Submit()}>Proceed</Link>
                </button>
            </div>

            <Loader isLoading={isLoading} />

        </div>
    )
}

export default AddBusTravelDetails