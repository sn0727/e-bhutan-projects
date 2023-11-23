




import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustom = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            dateFormat="E, dd MMM yy"
            onChange={(date) => setStartDate(date)}
        />
    );
};

export default DatePickerCustom;
