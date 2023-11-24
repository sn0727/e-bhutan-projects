import React, { useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'
import { Checkbox, FormControlLabel } from '@mui/material'
import DatePicker from '../../../components/Input/DatePicker'
import DatePickerCustom from '../../../components/Input/DatePicker'
import CustomModal from '../../../components/Modal/CustomModal'
import { SvgIcon } from '../../../constent/SvgIcons'

const SaveBillOption = ['Armed forces', 'Student', 'Senior Citizen']

const FlightsBookingForm = ({ setIdComponent }) => {
    const [Tab, setTab] = useState(1);
    const [saveBill, setsaveBill] = useState('')
    const [isNonStop, setisNonStop] = useState(false)

    const bookingHandlerFun = () => {
        setIdComponent(2)
    }

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
                                <div className=''>
                                    <p className='ticket-gray-text text-left'>From</p>
                                    <p className='ticket-gray-bold-text'>Del</p>
                                    <input type='text' name='from' value={'Delhi'} className='ticket-gray-text' />
                                </div>
                                <div>
                                    <img src={image.SyncArrow} alt="Fingerprint" className={`Image-SyncArrow `} />
                                </div>
                                <div>
                                    <p className='ticket-gray-text text-right'>To</p>
                                    <p className='ticket-gray-bold-text text-right'>Bom</p>
                                    <input type='text' name='from' value={'Mumbai'} className='ticket-gray-text text-right' />
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
                                        <DatePickerCustom />
                                    </div>
                                </div>
                            </div>
                            <div className='flight-input-from-to my-2'>
                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-left'>Travellers & Cabin Class</p>
                                    <div className='flex border-underline gap-5'>
                                        <p>3 Travellers </p>
                                        <p>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    paddingRight: '5px'
                                                }}
                                            >{SvgIcon?.dots}</span>
                                            <span
                                            >Premium Economy</span>
                                        </p>
                                    </div>
                                </div>
                                {/* <CustomModal /> */}
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

export default FlightsBookingForm
