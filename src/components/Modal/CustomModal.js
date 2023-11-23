import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IncrementQuantity from '../Button/IncrementQuantity';
import TicketButton from '../Button/TicketButton';

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

export default function CustomModal() {
    const [open, setOpen] = useState(false);
    const [saveClass, setsaveClass] = React.useState('')





    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
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
                            <IncrementQuantity />
                        </div>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Children</h5>
                            <p className='add-member-subheading text-center pb-2'>(Aged 2-12 yrs)</p>
                            <IncrementQuantity />
                        </div>
                        <div>
                            <h5 className='add-member-headig text-center pt-2'>Infants</h5>
                            <p className='add-member-subheading text-center pb-2'>(Below 2 yrs)</p>
                            <IncrementQuantity />
                        </div>
                    </div>


                    <div className='my-4'>
                        <h3 className='heading-name'>Travel Class</h3>
                        <div className='buttonBtn'>
                            {SaveBillOption.map((item, i) =>
                                <button key={`savebillbutton${i}`}
                                    onClick={() => setsaveClass(item)}
                                    className={saveClass === item ? 'active-btn' : 'btn-sucess'}
                                >{item}</button>
                            )}
                        </div>
                    </div>

                    <div className='flex mt-5'>
                        <TicketButton lable='Cancel' isCircular={true} onClick={() => handleClose()} />
                        <TicketButton lable='Done' isActive={true} isCircular={true} onClick={() => alert()} />
                    </div>

                </Box>
            </Modal>
        </div>
    );
}