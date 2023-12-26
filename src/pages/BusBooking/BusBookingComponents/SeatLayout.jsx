import { useDispatch, useSelector } from "react-redux";
import { setSelectedSeat } from "../../../app/slice/BusSlice";
import { useEffect, useState } from "react";

// SeatRow component to represent a row of seats
const SeatRow = ({ seats }) => {

  // return (
  //   <div >

  //     <div style={{
  //       display: 'flex',
  //       flexDirection: 'row',
  //       marginBottom: '10px',
  //       border: '1px solid black'
  //     }}>
  //       {upperSeats.length > 0 &&
  //         upperSeats.map((seat, index) => (
  //           <Seat key={index} seat={seat} width={seat.SeatType === 2 ? seat.Width * 2 : seat.Width} />
  //         ))
  //       }
  //     </div>

  //     {/* Display lower seats in a separate box */}
  //     <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', border: '1px solid blue' }}>
  //       {lowerSeats.map((seat, index) => (
  //         <Seat key={index} seat={seat} width={seat.SeatType === 2 ? seat.Width * 2 : seat.Width} />
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
      {seats.map((seat, index) => {
        console.log(seat.IsUpper, 'seat.IsUpper');
        const isSleeper = seat.SeatType === 2;
        const isUpper = seat.IsUpper;
        const seatWidth = isSleeper ? seat.Width * 2 : seat.Width;
        const rowStyle = {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '5px',
        };
        if (isUpper) {
          return (
            <div key={index} style={rowStyle}>
              <Seat key={index} seat={seat} width={seatWidth} />
            </div>
          );
        }
        return <Seat key={index} seat={seat} width={seatWidth} />;
      })}
    </div>
  );
};

// SeatRow component to represent a row of seats
const SeatRow1 = ({ seats }) => {
  const upperSeats = seats.filter(seat => seat.IsUpper); // Filter seats that are upper
  const lowerSeats = seats.filter(seat => !seat.IsUpper); // Filter seats that are not upper

  return (
    <div>
      {/* Display upper seats in a separate box */}
      {upperSeats.length > 0 && (
        <div style={{ border: '1px solid black', marginBottom: '10px' }}>
          {upperSeats.map((seat, index) => (
            <div key={index}>
              <Seat seat={seat} />
            </div>
          ))}
        </div>
      )}

      {/* Display lower seats in a separate box */}
      {lowerSeats.map((seat, index) => (
        <Seat key={index} seat={seat} />
      ))}
    </div>
  );
};

// Rest of your code remains the same...


// Seat component to represent an individual seat
const Seat = ({ seat, width }) => {
  const selectedSeat = useSelector((state) => state.buses.selectedSeat)
  const dispatch = useDispatch()
  const seatStyle = {
    backgroundColor: seat.SeatStatus ? (selectedSeat.some(selected => selected.SeatName === seat.SeatName) ? 'gray' : 'blue') : 'red',
    // backgroundColor: seat.SeatStatus ? 'blue' : 'red',
    width: `${width * 50}px`, // Adjust width based on seat type
    height: '50px',
    margin: '5px',
    textAlign: 'center',
    lineHeight: '50px',
    border: '1px solid black',
    color: 'white',
  };

  const setSeat = (seat) => {
    if (seat?.SeatStatus) {
      dispatch(setSelectedSeat(seat))
    }
    console.log(seat);
  }

  return (
    <div style={seatStyle} onClick={() => setSeat(seat)}>
      {seat.SeatName}
    </div>
  );
};

// Main component to display the seat layout
const SeatLayout = ({ seatLayoutData }) => {
  const [UpperRow, setUpperRow] = useState([])
  const [LowerRow, setLowerRow] = useState([])

  const myFunc = () => {
    let upper = []
    let lower = []
    for (let i = 0; i < seatLayoutData?.SeatDetails.length; i++) {
      if (seatLayoutData?.SeatDetails[i][0]?.IsUpper == true) {
        upper.push(seatLayoutData?.SeatDetails[i])
      }
      if (seatLayoutData?.SeatDetails[i][0]?.IsUpper == false) {
        lower.push(seatLayoutData?.SeatDetails[i])
      }
      setLowerRow(lower);
      setUpperRow(upper)
    }
  }

  useEffect(() => {
    console.log(seatLayoutData?.NoOfRows);
    myFunc()
  }, [])



  console.log(LowerRow, 'LowerRow', UpperRow, 'UpperRow');
  return (
    <div>
      {UpperRow?.length > 0 ? <div className="myname">
        <h5>UPPER BERTH</h5>
        {UpperRow.map((row, index) => (
          <SeatRow key={index} seats={row} />
        ))}
      </div> : null}
      {LowerRow?.length > 0 ? <div className="myname">
        <h5>LOWER BERTH</h5>
        {LowerRow.map((row, index) => (
          <SeatRow key={index} seats={row} />
        ))}
      </div> : null}

    </div>
  );
};

export default SeatLayout;
