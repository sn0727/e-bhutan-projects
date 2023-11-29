import React, { useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'
import { Checkbox, FormControlLabel } from '@mui/material'
import DatePickerCustom from '../../../components/Input/DatePicker'
import { SvgIcon } from '../../../constent/SvgIcons'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomModal from '../../../components/Modal/CustomModal'

const SaveBillOption = ['Armed forces', 'Student', 'Senior Citizen']

const BusTicketForm = ({setIdComponent}) => {
    const [Tab, setTab] = useState(1);
    const [saveBill, setsaveBill] = useState('')
    const [isNonStop, setisNonStop] = useState(false)
    const [fromValue, setFromValue] = React.useState(null);
    const [toValue, setToValue] = React.useState(null);

    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
    };

    const bookingHandlerFun = () => {
        setIdComponent(2)
    }

    const exchangeValues = () => {
        // Swap the values between fromValue and toValue
        setFromValue(toValue);
        setToValue(fromValue);
    };

    return (
        <>
            <div className='flight-ticket-outer mb-5 mt-0'>
                <div className='card-box'>
                    <div className='flight-ticket-inner py-3'>
                        <div className='ticket-button-group'>
                            <TicketButton lable={'One Way'} isActive={Tab === 1 ? true : false} onClick={() => setTab(1)} />
                            <TicketButton lable={'Round Trip'} isActive={Tab === 2 ? true : false} onClick={() => setTab(2)} />
                        </div>
                        <div>
                            <div className='flight-input-from-to my-4'>
                                <div className='w-45' style={{ width: '45%' }}>
                                    <p className='ticket-gray-text text-left'>From</p>
                                    <p className='ticket-gray-bold-text'>{fromValue?.title}</p>
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
                                    <p className='ticket-gray-bold-text text-right'>{toValue?.title}</p>
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
                                        <DatePickerCustom />
                                    </div>
                                </div>

                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-right'>Return Date</p>
                                    <div className='date-picker-parent right border-underline pt-1'>
                                        <DatePickerCustom disabled={Tab === 1 ? 'disabled' : null} className={Tab === 1 ? 'disabled-flight' : null} />
                                    </div>
                                </div>
                            </div>
                            <div className='flight-input-from-to my-2'>
                                <CustomModal />
                            </div>
                            <div className='ticket-savebill my-4'>
                                <p className='ticket-gray-text save-bill-title pb-2'>Save this bill as (optional)</p>
                                <div className='buttonBtn'>
                                    {SaveBillOption.map((item, i) =>
                                        <button key={`savebillbutton${i}`}
                                            onClick={() => setsaveBill(item)}
                                            className={saveBill === item ? 'active-btn' : 'btn-sucess'}
                                        >{item}</button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormControlLabel control={<Checkbox onChange={(e) => setisNonStop(e.target.checked)} />} label="Show non stop flights only" />
                            </div>
                            <TicketButton lable={'Search Flights'} isActive={true} onClick={bookingHandlerFun} isCircular={true} />
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
    { title: 'Andhra Pradesh', year: 1994 },
    { title: 'Arunachal Pradesh', year: 1972 },
    { title: 'Assam', year: 1974 },
    { title: 'Chhattisgarh', year: 2008 },
    { title: 'Goa', year: 1957 },
    { title: "Gujarat", year: 1993 },
    { title: 'Maharashtra', year: 1994 },
]