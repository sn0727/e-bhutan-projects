import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IncrementQuantity from '../../../components/Button/IncrementQuantity';
import TicketButton from '../../../components/Button/TicketButton';
import { SvgIcon } from '../../../constent/SvgIcons';
import { useRecoilState } from 'recoil';
import { adultsQuantity1, childrenQuantity1, infantsQuantity1, travelClassValue } from '../atom/atom';

const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: '10px'
    },

};

const SaveBillOption = ['Economy', 'Premium economy', 'Business', 'First class']

export default function FlightBookingCustomeModal() {
    const [adultsQuantity, setAdultsQuantity] = useRecoilState(adultsQuantity1);
    const [childrenQuantity, setChildrenQuantity] = useRecoilState(childrenQuantity1);
    const [infantsQuantity, setInfantsQuantity] = useRecoilState(infantsQuantity1);
    const [open, setOpen] = useState(false);
    const [saveClass, setSaveClass] = useRecoilState(travelClassValue);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const increment = () => {
        if (adultsQuantity < 9) {
            setAdultsQuantity(adultsQuantity + 1);
        }
    };

    const decrement = () => {
        if (adultsQuantity > 1) {
            setAdultsQuantity(adultsQuantity - 1);
        }
    };

    const increment1 = () => {
        if (childrenQuantity < 9) {
            setChildrenQuantity(childrenQuantity + 1);
        }
    };

    const decrement1 = () => {
        if (childrenQuantity > 0) {
            setChildrenQuantity(childrenQuantity - 1);
        }
    };

    const increment2 = () => {
        if (infantsQuantity < 9) {
            setInfantsQuantity(infantsQuantity + 1);
        }
    };

    const decrement2 = () => {
        if (infantsQuantity > 0) {
            setInfantsQuantity(infantsQuantity - 1);
        }
    };

    return (
        <div style={{
            width: '100%'
        }}>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <div className='flex-fill' onClick={handleOpen}>
                <p className='ticket-gray-text text-left'>Travellers & Cabin Class</p>
                <div className='flex border-underline gap-5'>
                    {
                        adultsQuantity >= 1 ? (<p>{adultsQuantity} Adults</p>) : null
                    }
                    {
                        childrenQuantity === 0 ? null : <p>{childrenQuantity} children</p>
                    }
                    {
                        infantsQuantity === 0 ? null : <p>{infantsQuantity} infants</p>
                    }
                    <p>
                        <span
                            style={{
                                display: 'inline-block',
                                paddingRight: '5px'
                            }}
                        >{SvgIcon?.dots}</span>
                        <span
                        >{saveClass}</span>
                    </p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <h3 className='heading-name'>Travel Class</h3>
                    <div className='flex justify-content-between flex-wrap'>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Adults</h5>
                            <p className='add-member-subheading text-center pb-2'>(Aged 12+ yrs)</p>
                            <div className='card'>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <button onClick={decrement} style={{ padding: '5px 10px' }}>-</button>
                                    <input
                                        type="number"
                                        value={adultsQuantity}
                                        min="1"
                                        max="9"
                                        style={{ width: '40px', textAlign: 'center', margin: '0 10px' }}
                                        readOnly
                                    />
                                    <button onClick={increment} style={{ padding: '5px 10px' }}>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Children</h5>
                            <p className='add-member-subheading text-center pb-2'>(Aged 2-12 yrs)</p>
                            {/* <IncrementQuantity /> */}
                            <div className='card'>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <button onClick={decrement1} style={{ padding: '5px 10px' }}>-</button>
                                    <input
                                        type="number"
                                        value={childrenQuantity}
                                        min="1"
                                        max="9"
                                        style={{ width: '40px', textAlign: 'center', margin: '0 10px' }}
                                        readOnly
                                    />
                                    <button onClick={increment1} style={{ padding: '5px 10px' }}>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Infants</h5>
                            <p className='add-member-subheading text-center pb-2'>(Below 2 yrs)</p>
                            {/* <IncrementQuantity /> */}
                            <div className='card'>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <button onClick={decrement2} style={{ padding: '5px 10px' }}>-</button>
                                    <input
                                        type="number"
                                        value={infantsQuantity}
                                        min="1"
                                        max="9"
                                        style={{ width: '40px', textAlign: 'center', margin: '0 10px' }}
                                        readOnly
                                    />
                                    <button onClick={increment2} style={{ padding: '5px 10px' }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='my-4'>
                        <h3 className='heading-name'>Travel Class</h3>
                        <div className='buttonBtn'>
                            {SaveBillOption.map((item, i) =>
                                <button key={`savebillbutton${i}`}
                                    onClick={() => setSaveClass(item)}
                                    className={saveClass === item ? 'active-btn' : 'btn-sucess'}
                                >{item}</button>
                            )}
                        </div>
                    </div>

                    <div className='flex mt-5'>
                        <TicketButton lable='Cancel' isCircular={true} onClick={() => handleClose()} />
                        <TicketButton lable='Done' isActive={true} isCircular={true} onClick={() => handleClose()} />
                    </div>

                </Box>
            </Modal>
        </div>
    );
}