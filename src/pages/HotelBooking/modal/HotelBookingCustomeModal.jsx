import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IncrementQuantity from '../../../components/Button/IncrementQuantity';
import TicketButton from '../../../components/Button/TicketButton';
import { SvgIcon } from '../../../constent/SvgIcons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adultsQuantity1, childrenAgeStateArr, childrenQuantity1, infantsQuantity1, modalState, roomQuantity } from '../atom/atom';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export default function HotelBookingCustomeModal() {
    const [adultsQuantity, setAdultsQuantity] = useRecoilState(adultsQuantity1);
    const [childrenQuantity, setChildrenQuantity] = useRecoilState(childrenQuantity1);
    const [roomQuantityNoOf, setRoomQuantity] = useRecoilState(roomQuantity);
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useRecoilState(childrenAgeStateArr);

    const handleAutocompleteChange = (event, values) => {
        const numericValues = values.map(item => {
            const title = item.title;
            return parseInt(title, 10); // Convert the string to an integer
        });

        setSelectedValues(numericValues);
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const increment = () => {
        if (adultsQuantity < 6) {
            setAdultsQuantity(adultsQuantity + 1);
        }
    };

    const decrement = () => {
        if (adultsQuantity > 1) {
            setAdultsQuantity(adultsQuantity - 1);
        }
    };

    const increment1 = () => {
        if (childrenQuantity < 4) {
            setChildrenQuantity(childrenQuantity + 1);
        }
    };

    const decrement1 = () => {
        if (childrenQuantity > 0) {
            setChildrenQuantity(childrenQuantity - 1);
        }
    };

    const increment2 = () => {
        if (roomQuantityNoOf < 6) {
            setRoomQuantity(roomQuantityNoOf + 1);
        }
    };

    const decrement2 = () => {
        if (roomQuantityNoOf > 1) {
            setRoomQuantity(roomQuantityNoOf - 1);
        }
    };

    return (
        <div style={{
            width: '100%'
        }}>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <div className='flex-fill' onClick={handleOpen}>
                <div className='flex gap-2' style={{ fontSize: '13px' }}>
                    {
                        adultsQuantity >= 1 ? (<p>{adultsQuantity} Adults</p>) : null
                    }
                    {
                        childrenQuantity === 0 ? null : <p>{childrenQuantity} Children</p>
                    }
                    {
                        roomQuantityNoOf === 0 ? null : <p>{roomQuantityNoOf} Room</p>
                    }
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <h3 className='heading-name'>Hotel Booking</h3>
                    <div className='flex justify-content-between flex-wrap'>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Adults</h5>
                            <p className='add-member-subheading text-center pb-2'>(Aged 18+ yrs)</p>
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
                            <p className='add-member-subheading text-center pb-2'>(Aged 0-17 yrs)</p>
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
                            <h5 className='add-member-headig text-center pt-2'>Rooms</h5>
                            <p className='add-member-subheading text-center pb-2'>(Number of room)</p>
                            {/* <IncrementQuantity /> */}
                            <div className='card'>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <button onClick={decrement2} style={{ padding: '5px 10px' }}>-</button>
                                    <input
                                        type="number"
                                        value={roomQuantityNoOf}
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

                    {
                        childrenQuantity > 0 && (

                            <div className='my-4'>
                                <h3 className='heading-name'>Choice Children Age</h3>
                                <div className='age-dropdowm'>
                                    <Autocomplete
                                        multiple
                                        size="small"
                                        id="checkboxes-tags-demo"
                                        options={top100Films}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.title}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props} size="small">
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                    size="small"
                                                />
                                                {option.title}
                                            </li>
                                        )}
                                        style={{ width: '100%' }}
                                        onChange={handleAutocompleteChange}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Age Needed" placeholder="Age Needed" />
                                        )}
                                    />
                                </div>
                            </div>
                        )
                    }

                    <div className='flex mt-5'>
                        <TicketButton lable='Cancel' isCircular={true} onClick={() => handleClose()} />
                        <TicketButton lable='Done' isActive={true} isCircular={true} onClick={() => handleClose()} />
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

const top100Films = [
    { title: '0 year', year: 1972 },
    { title: '1 year', year: 1972 },
    { title: '2 year', year: 1974 },
    { title: '3 year', year: 2008 },
    { title: '4 year', year: 1957 },
    { title: "5 year", year: 1993 },
    { title: '6 year', year: 1994 },
    { title: '7 year', year: 1994 },
    { title: '8 year', year: 1994 },
    { title: '9 year', year: 1994 },
    { title: '10 year', year: 1994 },
    { title: '11 year', year: 1994 },
    { title: '12 year', year: 1994 },
    { title: '13 year', year: 1994 },
    { title: '14 year', year: 1994 },
    { title: '15 year', year: 1994 },
    { title: '16 year', year: 1994 },
    { title: '17 year', year: 1994 }
]

