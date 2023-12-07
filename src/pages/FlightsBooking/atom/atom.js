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

export const infantsQuantity1 = atom({
    key: 'infantsQuantity1',
    default: 0
})

export const travelClassValue = atom({
    key: 'travelClassValue',
    default: "Economy"
})

export const ipAddressSave = atom({
    key: 'ipAddressSave',
    default: "Economy"
})

export const addTravelDetailRes1 = atom({
    key: 'addTravelDetailRes1',
    default: "Economy"
})


export const formStateAtom = atom({
    key: 'formState',
    default: null, // Default value is an empty array
});