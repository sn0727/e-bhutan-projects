import { toast } from "react-toastify";

export const nameValidation = (name) => {
    // let nameReg = /^[a-zA-Z_]+( [a-zA-Z_]+)+$/  //validated name 
    if (name === '') {
        toast.error(`Name is a mandatory field.`)
        return false;
    }
    // else if (!nameReg?.test(name)) {
    //     toast.error(`Enter full name.`);
    //     return false;
    // }
    return true;
}

export const validateFirstName = (firstName) => {
    let firstNameReg = /^[A-Za-z]+$/  //validated name 
    if (firstName === '') {
        toast.error(`First Name is a mandatory field.`)
        return false;
    }else if (!firstNameReg?.test(firstName)) {
        toast.error(`First name is not valid. Only alphabets and. are allowed`);
        return false;
    }
    return true;
}

export const validateLastName = (lastName) => {
    let lastNameReg = /^[A-Za-z]+$/  //validated name 
    if (lastName === '') {
        toast.error(`Last Name is a mandatory field.`)
        return false;
    }else if (!lastNameReg?.test(lastName)) {
        toast.error(`Last name is not valid. Only alphabets and. are allowed`);
        return false;
    }
    return true;
}

export const validateAddress = (address) => {
    if (address === '') {
        toast.error(`Address is a mandatory field.`)
        return false;
    }
    return true;
}

export const validateBankName = (bankName) => {
    if (bankName === '') {
        toast.error(`Bank name is a mandatory field.`)
        return false;
    }
    return true;
}

export const mobileNoValidation = (mobileNo) => {
    let mobileNoReg = /^[0-9]{10}$/  //validated name 
    if (mobileNo === '') {
        toast.error(`Mobile number is a mandatory field.`)
        return false;
    }else if (!mobileNoReg?.test(mobileNo)) {
        toast.error(`Please enter a valid 10 digit mobile number`);
        return false;
    }
    return true;
}

export const emailValidation = (email) => {
    let emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/  //validated name 
    if (email === '') {
        toast.error(`Email is a mandatory field.`)
        return false;
    }else if (!emailReg?.test(email)) {
        toast.error(`Please enter a valid email id`);
        return false;
    }
    return true;
}

export const postalCodeValidation = (postalCode) => {
    // let postalReg = /^[0-9]{6}$/  //validated name 
    if (postalCode === '') {
        toast.error(`Postal Code is a mandatory field.`)
        return false;
    }
    // else if (!postalReg?.test(postalCode)) {
    //     toast.error(`Please enter a valid 6 digit Postal code.`);
    //     return false;
    // }
    return true;
}

export const stateValidation = (state) => {
    let stateReg = /^[A-Za-z\s]+$/  //validated name 
    if (state === '') {
        toast.error(`State is a mandatory field.`)
        return false;
    }else if (!stateReg?.test(state)) {
        toast.error(`Please enter valid state name.`);
        return false;
    }
    return true;
}

export const AadhaarNoValidation = (aadhaarNo) => {
    let aadhaarReg = /^[0-9]{12}$/  //validated name 
    if (aadhaarNo === '') {
        toast.error(`Aadhaar number is a mandatory field.`)
        return false;
    }else if (!aadhaarReg?.test(aadhaarNo)) {
        toast.error(`Please enter a valid 12 digit Aadhaar number.`);
        return false;
    }
    return true;
}

export const PanNoValidation = (panNo) => {
    let panNoReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/  //validated name 
    if (panNo === '') {
        toast.error(`Pan card number is a mandatory field.`)
        return false;
    }else if (!panNoReg?.test(panNo)) {
        toast.error(`Please enter a valid 10 digit pan card number.`);
        return false;
    }
    return true;
}


export const passwordValidation = (password) => {
    let passwordReg = /^.{8}$/  //validated name 
    if (password === '') {
        toast.error(`This is a mandatory field.`)
        return false;
    }else if (!passwordReg?.test(password)) {
        toast.error(`Password is not valid. It should be 8 characters long.`);
        return false;
    }
    return true;
}

export const validateAccountNumber = (accountNumber) => {
    let accountNumberReg = /^\d{9,}$/  //validated name 
    if (accountNumber === '') {
        toast.error(`Account number is a mandatory field.`)
        return false;
    }else if (!accountNumberReg?.test(accountNumber)) {
        toast.error(`Account number is not valid. maximum 9 digits`);
        return false;
    }
    return true;
}

export const validateBankId = (BankId) => {
    // let BankIdReg = /^\d{1,2}$/  //validated name 
    if (BankId === '') {
        toast.error(`Bank name is a mandatory field.`)
        return false;
    }
    // else if (!BankIdReg?.test(BankId)) {
    //     toast.error(`Bank Id is not valid. It should be 2 characters long.`);
    //     return false;
    // }
    return true;
}

export const validateIFSCCode = (ifscCode) => {
    // let ifscCodeReg = /^[A-Z]{4}\d{7}$/ //validated name 
    if (ifscCode === '') {
        toast.error(`IFSC code is a mandatory field.`)
        return false;
    }
    // else if (!ifscCodeReg?.test(ifscCode)) {
    //     toast.error(`IFSC code is not valid.`);
    //     return false;
    // }
    return true;
}

export const validateDateFormat = (inputDate) => {
    // let inputDateReg = /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; //validated name 
    if (inputDate === '') {
        toast.error(`Date is a mandatory field.`)
        return false;
    }
    // else if (!inputDateReg?.test(inputDate)) {
    //     toast.error(`Date format is not valid.`);
    //     return false;
    // }
    return true;
}

export const AadhaarEnrolmentID = (inputEnrolmentID) => {
    if (inputEnrolmentID === '') {
        toast.error(`Aadhaar Enrolment Id is a mandatory field.`)
        return false;
    }
    return true;
}

export const BlockNo = (inputBlockNo) => {
    if (inputBlockNo === '') {
        toast.error(`Flat/Door/Block No. is a mandatory field.`)
        return false;
    }
    return true;
}


export const postOffice = (inputPostOffice) => {
    if (inputPostOffice === '') {
        toast.error(`Road/Street/Post Office. is a mandatory field.`)
        return false;
    }
    return true;
}

export const areaLocality = (inputAreaLocality) => {
    if (inputAreaLocality === '') {
        toast.error(`Road/Street/Post Office. is a mandatory field.`)
        return false;
    }
    return true;
}

export const townCityDis = (inputTownCityDis) => {
    if (inputTownCityDis === '') {
        toast.error(`Town / City / District is a mandatory field.`)
        return false;
    }
    return true;
}

export const countryFun = (inputCountry) => {
    if (inputCountry === '') {
        toast.error(`Country is a mandatory field.`)
        return false;
    }
    return true;
}

export const docmentFile = (inputDocmentFile) => {
    if (inputDocmentFile === '') {
        toast.error(`Bank Statement is a mandatory field.`)
        return false;
    }
    return true;
}






















// export const validateIFSCCode = (ifscCode) => {
//     // let ifscCodeReg = /^[A-Z]{4}\d{7}$/ //validated name 
//     if (ifscCode === '') {
//         toast.error(`IFSC code is a mandatory field.`)
//         return false;
//     }
//     // else if (!ifscCodeReg?.test(ifscCode)) {
//     //     toast.error(`IFSC code is not valid.`);
//     //     return false;
//     // }
//     return true;
// }

// const regexPatterns = {
//     name: /^[a-zA-Z_]+( [a-zA-Z_]+)+$/,  //validated name 
//     email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
//     mobile: /^[0-9]{10}$/,
//     postalCode: /^[0-9]{6}$/,
//     state: /^[A-Za-z\s]+$/,
//     district: /^[A-Za-z\s]+$/,
//     aadhaar: /^[0-9]{12}$/,
//     panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
// };

// if (name === '') {
//     toast.error(`Name feild is required`)
// }else if (!regexPatterns?.name?.test(name)) {
//     toast.error(`${name} Name is not valid`)
// }else if (mobileNo === '') {
//     toast.error(`Mobile no feild is required`)
// }else if (!regexPatterns?.mobile?.test(mobileNo)) {
//     toast.error(`${mobileNo} mobile no is not valid`)
// } else if (email === '') {
//     toast.error(`Email feild is required`)
// }else if (!regexPatterns?.email?.test(email)) {
//     toast.error(`${email} your email is not valid`)
// } else if (postalCode === '') {
//     toast.error(`Postal Code feild is required`)
// } else if (!regexPatterns?.postalCode?.test(postalCode)) {
//     toast.error(`${postalCode} your postal code is not valid min 6 digit`)
// } else if (stateValue === '') {
//     toast.error(`State feild is required`)
// }else if (!regexPatterns?.state?.test(stateValue)) {
//     toast.error(`${stateValue} your state is not valid`)
// }else if (aadhaarNo === '') {
//     toast.error(`Aadhaar no feild is required`)
// }else if (!regexPatterns?.aadhaar?.test(aadhaarNo)) {
//     toast.error(`${aadhaarNo} Aadhaar no is not valid, 12 digis`)
// }else if (panNo === '') {
//     toast.error(`Pan no feild is required`)
// }else if (!regexPatterns?.panCard?.test(panNo)) {
//     toast.error(`${panNo} Pan no is not valid`)
// }