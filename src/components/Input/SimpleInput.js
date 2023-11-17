import React from 'react'

const SimpleInput = (props) => {
    const {
        InputValue = '',
        setInputValue,
        disc='',
        type='text',
        placeholder=''
    } = props
    return (
        <div className="enter-mobilenum select-plan mt-2 mb-2">
            <div className="enter-mobilenum">
                {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
                <div className='set-p-relative'>
                    <input type={type} maxLength={10} placeholder={placeholder} onChange={(e) => setInputValue(e.target.value)} className='enter-mobile-num bg-white border-cs InputTextColor' value={InputValue} />
                    <span className='mt-1'>{disc?disc:''}</span>
                </div>
            </div>
        </div>
    )
}

export default SimpleInput
