function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Format 1: dd-MM-yyyy
    const ddMMyyyy = `${date.getDate()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    // Format 2: yyyy-MM-dd
    const yyyyMMdd = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

    // Format 3: dd-mm-yyyy
    const ddMmyyyy = `${date.getDate()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    // Format 4: dd/MM/yyyy
    const ddMMyyyy2 = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    // Format 5: DD-MM-YYYY
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const DDMMYYYY = date.toLocaleDateString('en-GB', options).replace(/ /g, '-');

    // Format 5: DD-MM-YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format 6: yyyyMMdd
    const yyyyMMdd2 = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate()}`;

    // Format 7: ddMMyyyy
    const ddMMyyyy3 = `${date.getDate()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;

    // Format 8: ^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$
    const regexFormat = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    return {
        "dd-MM-yyyy": ddMMyyyy, /*done*/
        "yyyy-MM-dd": yyyyMMdd, /*done*/
        "dd-mm-yyyy": ddMmyyyy, /*done*/
        "dd/MM/yyyy": ddMMyyyy2, /*done*/
        "DD-MM-YYYY": DDMMYYYY, /*done*/
        "yyyyMMdd": yyyyMMdd2, /*done*/
        "ddMMyyyy": ddMMyyyy3, /*done*/
        "^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$": regexFormat, /*done*/
        "DD/MM/YYYY": `${month}/${day}/${year}`,
    };
}

const Test = () => {
    if (operator?.id === 16 || operator?.id === 21 || operator?.id === 51 || operator?.id === 93 || operator?.id === 380) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['dd-mm-yyyy'], 'dd-mm-yyyy ==============');
        return formattedDates['dd-mm-yyyy']
        // return formatDate.dd-MM-yyyy
    } else if (operator?.id === 40 || operator?.id === 56) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['DD-MM-YYYY'], 'DD-MM-YYYY ==============');
        return formattedDates['DD-MM-YYYY']
    } else if (operator?.id === 42 || operator?.id === 73 || operator?.id === 137 || operator?.id === 160 || operator?.id === 187 || operator?.id === 230) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['yyyy-MM-dd'], 'yyyy-MM-dd==============');
        return formattedDates['yyyy-MM-dd']
    } else if (operator?.id === 380) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['dd-mm-yyyy'], 'dd-mm-yyyy==============');
        return formattedDates['dd-mm-yyyy']
    } else if (operator?.id === 106 || operator?.id === 197 || operator?.id === 212 || operator?.id === 223 || operator?.id === 226 || operator?.id === 354 || operator?.id === 530) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['dd/MM/yyyy'], 'dd/MM/yyyy ==============');
        return formattedDates['dd/MM/yyyy']
    } else if (operator?.id === 145 || operator?.id === 151) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['yyyyMMdd'], 'yyyyMMdd ==============');
        return formattedDates['yyyyMMdd']
    } else if (operator?.id === 171) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['ddMMyyyy'], 'ddMMyyyy ==============');
        return formattedDates['ddMMyyyy']
    } else if (operator?.id === 531) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$'], '^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$ ==============');
        return formattedDates['^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$']
    } else if (operator?.id === 241) {
        const formattedDates = formatDate(Date12);
        console.log(formattedDates['DD/MM/YYYY'], 'DD/MM/YYYY ==============');
        return formattedDates['DD/MM/YYYY']
    }
    else {
        console.log('alalalalalala');
    }
}

useEffect(() => {
    Test()
}, [Date12])

// const Test = () => {
//     if (operator?.ad1_d_name === "Date Of Birth  ( dd-MM-yyyy )") {
//         const formattedDates = formatDate(Date12);
//         console.log(formattedDates['dd-MM-yyyy'], 'dd-MM-yyyy ==============');
//         // return formatDate.dd-MM-yyyy

//     } 

//     else if(operator?.ad1_d_name === "Date of Birth (yyyy-MM-dd)"){
//         const formattedDates = formatDate(Date12);
//         console.log(formattedDates['yyyy-MM-dd'], 'yyyy-MM-dd ==============');

//     }

//     else if(operator?.ad1_d_name === "dd-mm-yyyy"){
//         const formattedDates = formatDate(Date12);
//         console.log(formattedDates['dd-mm-yyyy'], 'dd-mm-yyyy ==============');

//     }

//     else if(operator?.ad1_d_name === "Date Of Birth(dd/MM/yyyy)"){
//         const formattedDates = formatDate(Date12);
//         console.log(formattedDates['dd-mm-yyyy'], 'dd-mm-yyyy==============');
//     } 

//     else{
//         console.log('alalalalalala');
//     } 
// }