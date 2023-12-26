import { atom } from "recoil";

export const apiData = atom({
    key: 'apiData',
    default: null
})

export const apiSingalData = atom({
    key: 'apiSingalData',
    default: null
})

export const adultsQuantity1 = atom({
    key: 'adultsQuantity1',
    default: 1
})

export const childrenQuantity1 = atom({
    key: 'childrenQuantity1',
    default: 0
})

export const roomQuantity = atom({
    key: 'NoOfRoom',
    default: 1
})

export const travelClassValue = atom({
    key: 'travelClassValue',
    default: "Economy"
})

export const saveIPAddress = atom({
    key: 'ipAddress',
    default: null
})

export const addTravelDetailRes1 = atom({
    key: 'addTravelDetailRes1',
    default: "Economy"
})


export const formStateAtom = atom({
    key: 'formState',
    default: [], // Default value is an empty array
});

export const apiDataState = atom({
    key : 'apiDataState',
    default: null
})

export const childrenAgeStateArr =  atom({
    key : 'childrenAgeValue',
    default : []
})
export const reponseHotelDetails =  atom({
    key : 'hotelResponseData',
    default : []
})

export const savePerHotelRecord =  atom({
    key : 'hotelRecord',
    default : {}
})

export const saveRoomPerData =  atom({
    key : 'abroomRecord',
    default : {}
})

export const saveRoomsMultipleData =  atom({
    key : 'roomsMultipleData',
    default : []
})

export const saveHotelBookResponseData =  atom({
    key : 'saveHotelBookData',
    default : []
})

export const valueSaveFalse =  atom({
    key : 'valueSaveFalseBlock',
    default : false
})

export const selectRoomArr =  atom({
    key : 'selectRomm',
    default : []
})

export const finalDataTickState =  atom({
    key : 'finaltick',
    default : []
})

