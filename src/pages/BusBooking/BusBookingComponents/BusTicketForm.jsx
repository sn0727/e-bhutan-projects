import React, { useEffect, useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'
import DatePickerCustom from '../../../components/Input/DatePicker'
import { SvgIcon } from '../../../constent/SvgIcons'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRecoilState } from 'recoil'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { apiDataState, ipAddress as importipAddress } from '../atom/atom'
import { toast } from 'react-toastify'
import moment from 'moment'

const SaveBillOption = ['Armed forces', 'Student', 'Senior Citizen']

const BusTicketForm = ({ setIdComponent }) => {
    const [apidata, setApiData] = useRecoilState(apiDataState)
    const [ipAddress, setipAddress] = useRecoilState(importipAddress)

    const [saveBill, setsaveBill] = useState('')
    const [fromValue, setFromValue] = React.useState(null);
    const [toValue, setToValue] = React.useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturntDate] = useState(new Date());
    const [isLoading, setisLoading] = useState()



    // set value of dropdown
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.CityName,
    };

    // get ip address value
    const getIpAddressFun = async () => {
        const response = await fetch(
            `https://api.db-ip.com/v2/free/self`
        );
        const data = await response.json();
        setipAddress(data?.ipAddress);
    }
    useEffect(() => {
        getIpAddressFun()
    }, [])


    const bookingHandlerFun = () => {
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.busSearch,
            body: {
                "DateOfJourney": moment(startDate).format('YYYY-MM-DD'),
                "DestinationId": toValue?.CityId,
                "EndUserIp": ipAddress,
                "OriginId": fromValue?.CityId,
                "PreferredCurrency": "INR"
            }
        }
        console.log(config, 'config');
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setisLoading(false)
                toast.error(err?.message)
            }
        )
    }
    // Swap the values between fromValue and toValue
    const exchangeValues = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    };

    return (
        <>
            <div className='flight-ticket-outer mb-5 mt-0'>
                <div className='card-box'>
                    <div className='flight-ticket-inner py-3'>

                        <div>
                            <div className='flight-input-from-to my-4'>
                                <div className='w-45' style={{ width: '45%' }}>
                                    <p className='ticket-gray-text text-left'>From</p>
                                    <p className='ticket-gray-bold-text'>{fromValue?.CityName}</p>
                                    {/* <input type='text' name='from' value={'Delhi'} className='ticket-gray-text' /> */}
                                    <Autocomplete
                                        {...defaultProps}
                                        id="disable-close-on-select"
                                        clearOnEscape
                                        value={fromValue}
                                        onChange={(event, newValue) => {
                                            setFromValue(newValue); // Update the selected option when an option is selected
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="From" variant="standard" />
                                        )}
                                    />
                                </div>
                                <div style={{ width: '10%' }} onClick={() => exchangeValues()}>
                                    <img src={image.SyncArrow} alt="Fingerprint" className={`Image-SyncArrow `} />
                                </div>
                                <div style={{ width: '45%' }}>
                                    <p className='ticket-gray-text text-right'>To</p>
                                    <p className='ticket-gray-bold-text text-right'>{toValue?.CityName}</p>
                                    {/* <input type='text' name='from' value={'Mumbai'} className='ticket-gray-text text-right' /> */}
                                    <Autocomplete
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
                                </div>
                            </div>
                            <div className='flight-input-from-to my-4 gap-10'>
                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-left'>Departure Date</p>
                                    <div className='date-picker-parent border-underline pt-1'>
                                        <DatePickerCustom setStartDate={setStartDate} startDate={startDate} />
                                    </div>
                                </div>
                            </div>
                            <TicketButton lable={'Search Buses'} isActive={true} onClick={bookingHandlerFun} isCircular={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusTicketForm

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { "CityId": 8463, "CityName": "Bangalore" },
    { "CityId": 9573, "CityName": "Hyderabad" },
    { "CityId": 9252, "CityName": " Bharuch (bypass)" },
    { "CityId": 16347, "CityName": " Model Colony,Nashik" },
    { "CityId": 16537, "CityName": " Mumbai Naka,Nashik" },
    { "CityId": 15949, "CityName": "(Area)Dadar.,Mumbai" },
    { "CityId": 16914, "CityName": "26 Bb, Rajasthan" },
    { "CityId": 5271, "CityName": "26th Mile(kerala)" },
    { "CityId": 16880, "CityName": "29BB, Rajasthan" },
    { "CityId": 1931, "CityName": "A K Pora" },
    { "CityId": 16133, "CityName": "A P M C,Ahmedabad" }, { "CityId": 5392, "CityName": "A.i .area" }, { "CityId": 3644, "CityName": "A.konduru" }, { "CityId": 25, "CityName": "A.r.t.c. Diphu" }, { "CityId": 5451, "CityName": "A.S.Peta" }, { "CityId": 8183, "CityName": "Aachara" }, { "CityId": 3000, "CityName": "Aade(maharashtra)" }, { "CityId": 10670, "CityName": "Aadivare" }, { "CityId": 7390, "CityName": "Aadsar" }, { "CityId": 7954, "CityName": "Aamaran" }, { "CityId": 10170, "CityName": "Aambala (Gujarat)" }, { "CityId": 16896, "CityName": "Aandhi, Rajasthan" }, { "CityId": 14482, "CityName": "Aanjangaon" }, { "CityId": 10990, "CityName": "Aansodar (gujarat)" }, { "CityId": 12299, "CityName": "Aantra" }, { "CityId": 2884, "CityName": "Aaravli" }, { "CityId": 7542, "CityName": "Aarni" }, { "CityId": 7620, "CityName": "Aaspura" }, { "CityId": 3146, "CityName": "Aathankarai" }, { "CityId": 11101, "CityName": "Aau (Phalodi)" }, { "CityId": 10485, "CityName": "Aauwa" }, { "CityId": 694, "CityName": "Aavanam Kaikaati" }, { "CityId": 9863, "CityName": "Abdasan" }, { "CityId": 2920, "CityName": "Abdul Lat" }, { "CityId": 789, "CityName": "Abhama" }, { "CityId": 10072, "CityName": "Abhana" }, { "CityId": 2416, "CityName": "Abhanpur" }, { "CityId": 6023, "CityName": "Abhayapuri" }, { "CityId": 10145, "CityName": "Abhona" }, { "CityId": 9978, "CityName": "Abhrampara" },
]