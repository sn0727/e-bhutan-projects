export function ValidatePhone(data) {
    const phone = /^\+?[1-9][0-9]{9,9}$/;
    return phone.test(data);
}

export function ValidateAadhaar(data) {
    const aadhaar = /^\+?[1-9][0-9]{11,11}$/;
    return aadhaar.test(data);
}

export function ValidateZipCode(data) {
    const zipRegex = /^\+?[1-9][0-9]{5,5}$/;
    return zipRegex.test(data);
}
export function ValidatePan(data) {
    const pan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return pan.test(data);
}

export function ValidateEmail(data) {
    const email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return email.test(data);
}

export function ValidateOtp4(data) {
    const otp = /^\+?[1-9][0-9]{3,3}$/;
    return otp.test(data);
}

export function ValidateOtp6(data) {
    const otp = /^\+?[1-9][0-9]{5,5}$/;
    return otp.test(data);
}

export function ValidatePassword(data) {
    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return password.test(data);
}

export function isAddressValid(address) {
    // Remove leading and trailing whitespaces
    const trimmedAddress = address.trim();

    // Split the address into words
    const words = trimmedAddress.split(/\s+/);

    // Check if the number of words is at least 3
    return words.length >= 3;
}
