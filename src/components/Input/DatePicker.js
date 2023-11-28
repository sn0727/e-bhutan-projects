
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustom = ({disabled, className}) => {
    const [startDate, setStartDate] = useState(new Date());
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
