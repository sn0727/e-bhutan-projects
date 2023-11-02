import React from "react";
import BillDetail from "../../Bill_Detail/BillDetails";
// import { useLocation } from "react-router-dom";


const GasBookingBillDetailContent = ({location}) => {
  // const location = useLocation();
  const receivedData = location.state;
  console.log(location);

  const billDetails = [
    {
      DueDate1 : "June 9, 2023",
      BillDate1 : "May 31, 2023",
      ConsumerName1 : "Raju Lal Chauhan",
      ConsumerId : "123456789",
      ConsumerName2 : "Raju Lal Chauhan",
      DueDate2 : "June 9, 2023",
      Amount : "1,000.54",
      InvoiceNo : "12274929237687",
      BillDate2 : "May 31, 2023",
      BillPeriod : "June 28, 2023 to May 28,2023 ",
    }
  ]

  return (
    <React.Fragment>
      <BillDetail billDetails={receivedData}/>
    </React.Fragment>
  )
}

export default GasBookingBillDetailContent
