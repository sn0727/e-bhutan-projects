import React from 'react'

const HotelBookingLogic = () => {

    function distributionRoom(totalRooms, adultofNumber, childrenofNumber, childrenAge) {
        let roomGuest = []

        // adults per room 
        let adultPerRoom = Math.floor(adultofNumber / totalRooms)
        let remainderAdults = adultofNumber % totalRooms;

        // children per room 
        let childrenPerRoom = Math.floor(childrenofNumber / totalRooms)
        let remainderChildren = childrenofNumber % totalRooms;

        for (let index = 0; index < totalRooms; index++) {
            let room = {
                NoOfAdults : adultPerRoom + (remainderAdults === 1 ? 1 : 0),
                NoOfChild : childrenPerRoom + (remainderChildren === 1 ? 1 : 0),
                ChildAge : []
            }

            for(let j = 0; j < childrenPerRoom + (remainderChildren === 1 ? 1 : 0); j++){
                room.ChildAge.push(childrenAge.shift())
            }
            roomGuest.push(room)
            remainderAdults = Math.max(0, remainderAdults - 1)
            remainderChildren = Math.max(0, remainderChildren - 1)
        }


        return roomGuest;
    }

    // my hotel booking parson data;

    let totalRooms = 2;
    let adultofNumber = 5;
    let childrenofNumber = 3;
    let childrenAge = [3,4,5]

    let result = distributionRoom(totalRooms, adultofNumber, childrenofNumber, childrenAge);
    console.log('result', result)
  return (
    <div>HotelBookingLogic</div>
  )
}

export default HotelBookingLogic