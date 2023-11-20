import React, { useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'

const SaveBillOption = ['Armed forces', 'Student', 'Senior Citizen']
const FlightTicket = () => {
    const [Tab, setTab] = useState(1);
    const [saveBill, setsaveBill] = useState('')
    return (
        <>
            <div>
                <div className='flight-ticket-outer'>
                    <div className='card'>
                        <div className='flight-ticket-inner'>
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
                                <div className='flight-input-from-to my-4'>
                                    <div className=''>
                                        <p className='ticket-gray-text text-left'>Departure Date</p>
                                        <input type='date' name='from' value={'Delhi'} className='ticket-gray-text' />
                                    </div>
                                    {/* <div>
                                        <img src={image.SyncArrow} alt="Fingerprint" className={`Image-SyncArrow `} />
                                    </div> */}
                                    <div>
                                        <p className='ticket-gray-text text-right'>Return Date</p>
                                        <input type='date' name='from' value={'Mumbai'} className='ticket-gray-text text-right' />
                                    </div>
                                </div>
                                <div className='ticket-savebill'>
                                    <p>Save this bill as (optional)</p>
                                    <div className='buttonBtn'>
                                        {SaveBillOption.map((item, i) =>
                                            <button key={`savebillbutton${i}`}
                                                onClick={() => setsaveBill(item)}
                                                className={saveBill === item ? 'active-btn' : 'btn-sucess'}
                                            >{item}</button>
                                        )}
                                    </div>
                                </div>
                                <TicketButton lable={'Submit'} isActive={true} onClick={() => setTab(2)} isCircular={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FlightTicket
