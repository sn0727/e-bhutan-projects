import React, { useEffect, useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'
import { Checkbox, FormControlLabel } from '@mui/material'
import DatePickerCustom, { DatePickerCustom2 } from '../../../components/Input/DatePicker'
import { SvgIcon } from '../../../constent/SvgIcons'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomModal from '../../../components/Modal/CustomModal'
import { APIRequest, ApiUrl } from '../../../utils/api'
import Loader from '../../../components/Feature/Loader'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { adultsQuantity1, apiData, childrenQuantity1, roomQuantity, ipAddressSave, modalState, travelClassValue, childrenAgeStateArr, reponseHotelDetails, saveIPAddress } from '../atom/atom'
import HotelBookingCustomeModal from '../modal/HotelBookingCustomeModal'
import moment from 'moment'
import { FaSearch } from 'react-icons/fa'

const HotelBookingTicketForm = ({ setIdComponent }) => {
    const setHotelDataResponse = useSetRecoilState(reponseHotelDetails);
    const [stateName, setStateName] = useState([])
    const [selectedOption, setSelectedOption] = useState(null); // Set the default value to null or an initial option
    const [nightOfStay, setNightOfStay] = useState(1);
    const [maxRating, setMaxRating] = useState(5);
    const [minRating, setMinRating] = useState(4);
    const [demoIp_Address, setDemoIp_Address] = useState('192.168.10.26')
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const roomNoOfQuantity = useRecoilValue(roomQuantity)
    const childrenAgeArr = useRecoilValue(childrenAgeStateArr)

    // get ip address value
    useEffect(() => {
        const getIpAddressFun = async () => {
            try {
                const response = await fetch(`https://api.db-ip.com/v2/free/self`);
                const data = await response.json();
                setDemoIp_Address(data?.ipAddress);
                // Now that the IP address is set, call getStateName
            } catch (error) {
                console.log('Error fetching IP address:', error);
            }
        };
        getIpAddressFun();
    }, [setDemoIp_Address]);

    useEffect(() => {
        // Check if ipAddress is available
        if (demoIp_Address) {
            let config = {
                url: ApiUrl?.getDestinationSearchStaticData,
                method: 'post',
                body: {
                    "EndUserIp": '192.168.10.26',
                    "CountryCode": "IN",
                    "SearchType": "1"
                }
            };
            APIRequest(
                config,
                res => {
                    setStateName(res?.data?.Destinations)
                },
                err => { console.log('err of the hotel state name =======', err) }
            );
        }
    }, [demoIp_Address])

    //  =============== this is a distributeGuests funcation ============= //
    function distributeGuests(adults, children, numRooms, childAges) {
        const roomGuests = [];

        // Distribute adults evenly among rooms
        const adultsPerRoom = Math.floor(adults / numRooms);
        let remainingAdults = adults % numRooms;

        // Calculate children per room
        const childrenPerRoom = Math.floor(children / numRooms);
        let remainingChildren = children % numRooms;

        // Create roomGuests array
        for (let i = 0; i < numRooms; i++) {
            const room = {
                NoOfAdults: adultsPerRoom + (remainingAdults > 0 ? 1 : 0),
                NoOfChild: childrenPerRoom + (remainingChildren > 0 ? 1 : 0),
                ChildAge: []  // Array to store child ages
            };

            // Add ages to ChildAge array for all children
            for (let j = 0; j < childrenPerRoom + (remainingChildren > 0 ? 1 : 0); j++) {
                room.ChildAge.push(childAges.shift()); // Take the first age from the specified ages
            }

            roomGuests.push(room);

            // Update remaining adults and children
            remainingAdults = Math.max(0, remainingAdults - 1);
            remainingChildren = Math.max(0, remainingChildren - 1);
        }

        return roomGuests;
    }

    // // Example usage
    const adults = adultsQuantity;
    const children = childrenQuantity;
    const numRooms = roomNoOfQuantity;
    const childAges = [...childrenAgeArr];

    const RoomGuestsResult = distributeGuests(adults, children, numRooms, childAges);
    //  =============== this is a distributeGuests funcation ============= //

    // this is working on the click search button then will be reture response
    const bookingHandlerFun = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.hotelSearch,
            method: 'post',
            body: {
                "CheckInDate": moment(startDate).format("DD/MM/YYYY"),
                "NoOfNights": nightOfStay,
                "CountryCode": "IN",
                "CityId": selectedOption?.DestinationId,
                "ResultCount": null,
                "PreferredCurrency": "INR",
                "GuestNationality": "IN",
                "NoOfRooms": roomNoOfQuantity,
                "RoomGuests": RoomGuestsResult,
                "MaxRating": maxRating,
                "MinRating": minRating,
                "ReviewScore": null,
                "IsNearBySearchAllowed": false,
                "EndUserIp": demoIp_Address
            }
        }
        APIRequest(
            config,
            res => {
                // console.log(res?.data, 'res hotel booking ==================')
                setHotelDataResponse(res?.data)
                setIsLoading(false)
                setIdComponent(2)
            },
            err => {
                // console.log(err, 'err ============ hotel booking')
                if (err?.error) {
                    toast.error(err?.message)
                }
                setIsLoading(false)
            }
        )
    }
    // this is working on the click search button then will be reture response



    return (
        <>
            <div className="serach-bx-ht-sr mb-4">
                <div className='search-dropdown comman-border-ht'>
                    <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={stateName}
                        value={selectedOption}
                        onChange={(event, newValue) => setSelectedOption(newValue)}
                        getOptionLabel={(option) => option.CityName} // Assuming CityName is the correct property name
                        defaultValue={stateName}
                        renderInput={(params) => (
                            <TextField {...params} label="Where do you want to stay" placeholder="City" />
                        )}
                    />
                </div>
                <div className='flex-fill comman-border-ht'>
                    {/* <p className='ticket-gray-text text-left'>Departure Date</p> */}
                    <div className='date-picker-parent'>
                        <DatePickerCustom setStartDate={setStartDate} startDate={startDate} />
                    </div>
                </div>
                <div className='flight-input-from-to my-0 comman-border-ht'>
                    <HotelBookingCustomeModal />
                </div>
                <div className='flight-input-from-to my-0 comman-border-ht'>
                    <label value="select" style={{ margin: '0' }}>Night of Stay</label>
                    <select name="noghtOfStay" id="noghtOfStay" onChange={(e) => setNightOfStay(e.target.value)}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 30]?.map((noOfStay, index) => (
                                <option
                                    value={noOfStay}
                                    key={index}
                                >
                                    {noOfStay}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='flight-input-from-to my-0 comman-border-ht'>
                    <label value="select" style={{ margin: '0' }}>Max Rating</label>
                    <select name="maxRating" id="maxRating" value={maxRating} onChange={(e) => setMaxRating(e.target.value)}>
                        {
                            [1, 2, 3, 4, 5]?.map((noOfStay, index) => (
                                <option
                                    value={noOfStay}
                                    key={index}
                                >
                                    {noOfStay}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='flight-input-from-to my-0 comman-border-ht'>
                    <label value="select" style={{ margin: '0' }}>Min Rating</label>
                    <select name="minRating" id="minRating" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                        {
                            [1, 2, 3, 4, 5]?.map((noOfStay, index) => (
                                <option
                                    value={noOfStay}
                                    key={index}
                                >
                                    {noOfStay}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='serchButton' style={{ maxWidth: '8%' }}>
                    <TicketButton lable={<FaSearch style={{ textAlign: 'center', display: 'inline-block' }} />} isActive={true} onClick={bookingHandlerFun} isCircular={true} />
                </div>
            </div>

            <div className='cencel-click-btn'>
                <p>Do you want cancel booking then click cancel button </p>
                <TicketButton lable={'Cancel Booking'} isActive={true} onClick={() => setIdComponent(8)} isCircular={true} />
            </div>

            <div className='image-bx-tanding'>
                <img src={image?.trandingImg} alt="lastest image" />
            </div>
            <>
                <Loader isLoading={isLoading} />
            </>
        </>


    )
}

export default HotelBookingTicketForm;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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