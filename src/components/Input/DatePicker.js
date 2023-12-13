
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerCustom2 = ({disabled, className, setReturntDate, returnDate}) => {
    return (
        <DatePicker
            selected={returnDate}
            dateFormat="E, dd MMM yy"
            onChange={(date) => setReturntDate(date)}
            disabled={disabled}
            className={className}
        />
    )
}

const DatePickerCustom = ({ disabled, className, setStartDate, startDate }) => {

    // console.log(startDate, '=============== startDate')
    return (
        <DatePicker
            selected={startDate}
            dateFormat="E, dd MMM yy"
            onChange={(date) => setStartDate(date)}
            disabled={disabled}
            className={className}
        />
    );
};

export default DatePickerCustom;

