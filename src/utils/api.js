import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClearSession from "./ClearSession";

export const BASEURL = 'https://api.ebhuktan.com';
// export const BASEURL = 'http://65.2.143.179:3000';

const apiBaseUrl = `${BASEURL}/api/`;
export const SaveBillOption = ['Home', 'Mom', 'Office', 'Other']
export const SaveBillOption1 = ['Withdrawal', 'Balance Enquiry', 'Mini Statement']
export const transactionByType = ['All', 'Sent', 'Received']



const APIUser = `${apiBaseUrl}user/`
const APISuperadmin = `${apiBaseUrl}superAdmin/`
const APIBank = `${apiBaseUrl}bank/`


export const ApiUrl = {
  signup: `${APIUser}signup`,
  accountVerification: `${APIUser}accountVerification`,
  login: `${APIUser}login`,
  update: `${APIUser}update`,
  removeProfile: `${APIUser}removeProfile`,
  forgotPassword: `${APIUser}forgotPassword`,
  // forgotPassword: `${APISuperadmin}forgotPassword`,
  resetPassword: `${APIUser}resetPassword`,
  changePassword: `${APIUser}changePassword`,
  resendOTP: `${APIUser}resendOTP`,
  // resetPassword: `${APISuperadmin}resetPassword`,
  changePassword: `${APIUser}changePassword`,
  getByToken: `${APIUser}getByToken`,
  generatePdf: `${APIUser}generatePdf`,
  addAmount: `${APIUser}addAmount`,
  walletTransfer: `${APIUser}walletTransfer`,
  generateQRCode: `${APIUser}UPI/generateQRCode`,
  aadhaarWithOTP: `${APIUser}verification/aadhaarWithOTP`,
  verifyAadhaarOTP: `${APIUser}verification/verifyAadhaarOTP`,
  mobileSendOTP: `${APIUser}sendOTP`,
  contactVerification: `${APIUser}contactVerification`,
  userCreate: `${APIUser}userCreate`,
  requestRise: `${APIUser}payment/request/rise`,
  requestGetAll: `${APIUser}payment/request/getAll`,



  // transaction api
  getAllTransaction: `${apiBaseUrl}transaction/getAllTransaction`,
  getAllType: `${apiBaseUrl}transaction/getType`,
  commissionGetAll: `${apiBaseUrl}transaction/commission/getAll`,
  walletTransferGetAll: `${apiBaseUrl}transaction/wallet/get/transaction`,
  walletTransactionByType: `${apiBaseUrl}transaction/wallet/transactionByType`,

  // mobile recharge api
  rechargeGetOperatorList: `${apiBaseUrl}recharge/getOperatorList`,
  rechargeGetCircle: `${apiBaseUrl}recharge/getCircle`,
  recharGetPlan: `${apiBaseUrl}recharge/getPlan`,
  recharDoRecharge: `${apiBaseUrl}recharge/doRecharge`,
  rechargeCheckHLR: `${apiBaseUrl}recharge/checkHLR`,

  // postPaid recharge api
  recharPostpaidGetOperatorList: `${apiBaseUrl}recharge/postpaid/getOperatorList`,
  recharPostpaidfetchBill: `${apiBaseUrl}recharge/postpaid/fetchBill`,
  recharPostpaidpayBill: `${apiBaseUrl}recharge/postpaid/payBill`,

  // Landline bill details api
  landlineGetOperatorList: `${apiBaseUrl}broadband/bill-payment/landline/getOperatorList`,
  landlineGetFetchBill: `${apiBaseUrl}broadband/bill-payment/landline/fetchBill`,
  landlinePayBill: `${apiBaseUrl}broadband/bill-payment/landline/payBill`,

  // loan emi payment api
  loanEmiPaymentGetOperatorList: `${apiBaseUrl}loan/EMI/payment/getOperatorList`,
  loanPaymentfetchLoanEMI: `${apiBaseUrl}loan/EMI/payment/fetchLoanEMI`,
  loanPaymentPayLoanEMI: `${apiBaseUrl}loan/EMI/payment/payLoanEMI`,

  // Insurance EMI payment api
  insuranceEMIgetOperatorList: `${apiBaseUrl}insurance/EMI/payment/getOperatorList`,
  emiFetchInsuranceDetails: `${apiBaseUrl}insurance/EMI/payment/fetchInsuranceDetails`,
  emiPayInsurance: `${apiBaseUrl}insurance/EMI/payment/payInsurance`,


  // user getBy Token api
  userGetByToken: `${apiBaseUrl}user/getByToken`,

  fastTag: `${apiBaseUrl}fastTag/`,
  fastTagGetOperatorList: `${apiBaseUrl}fastTag/getOperatorList`,
  fastTagFetchDetails: `${apiBaseUrl}fastTag/fetchDetails`,
  fastTagDoRecharge: `${apiBaseUrl}fastTag/doRecharge`,


  // booking api route
  bookingSearch: `${apiBaseUrl}flight/ticket/booking/search`,

  // electricityGetOperatorList: `${apiBaseUrl}electricity/bill-payment/getOperaterList`,
  // electricityGetState: `${apiBaseUrl}electricity/bill-payment/getState`,
  // electricityFetchBill: `${apiBaseUrl}electricity/bill-payment/fetchBill`,

  electricity: `${apiBaseUrl}electricity/bill-payment/`,
  electricityGetOperatorList: `${apiBaseUrl}electricity/bill-payment/getOperaterList`,
  electricityGetState: `${apiBaseUrl}electricity/bill-payment/getState`,
  electricityFetchBill: `${apiBaseUrl}electricity/bill-payment/fetchBill`,
  electricityPayBill: `${apiBaseUrl}electricity/bill-payment/payBill`,

  waterGetOperaterList: `${apiBaseUrl}water/bill-payment/getOperaterList`,
  waterFetchBill: `${apiBaseUrl}water/bill-payment/fetchBill`,
  waterPayBill: `${apiBaseUrl}water/bill-payment/payBill`,

  lpgGetOperatorList: `${apiBaseUrl}lpg-gas/getOperatorList`,
  lpgGetBookingList: `${apiBaseUrl}lpg-gas/getBookingList`,
  lpgFetchDetails: `${apiBaseUrl}lpg-gas/fetchDetails`,
  lpgFetchBookingDetails: `${apiBaseUrl}lpg-gas/fetchBookingDetails`,
  lpgPayBill: `${apiBaseUrl}lpg-gas/payBill`,
  lpgBookGas: `${apiBaseUrl}lpg-gas/bookGas`,

  municipalityGetOperatorList: `${apiBaseUrl}municipality/getOperatorList`,
  municipalityFetchDetails: `${apiBaseUrl}municipality/fetchDetails`,
  municipalityPayBill: `${apiBaseUrl}municipality/payBill`,

  cardPaymentGenerateOTP: `${apiBaseUrl}card-payment/generateOTP`,
  cardPaymentPaybill: `${apiBaseUrl}card-payment/paybill`,
  cardGenerateInvoice: `${apiBaseUrl}card-payment/generateInvoice`,

  DthGetOperatorList: `${apiBaseUrl}dth-recharge/getOperatorList`,
  CableDthGetOperatorList: `${apiBaseUrl}dth-recharge/cable/getOperatorList`,

  DthGetInfo: `${apiBaseUrl}dth-recharge/getInfo`,
  CableDthGetInfo: `${apiBaseUrl}dth-recharge/cable/fetchBill`,
  DthDoRecharge: `${apiBaseUrl}dth-recharge/doRecharge`,
  DthDoRechargeCablePaybill: `${apiBaseUrl}dth-recharge/cable/paybill`,

  broadbandGetOperatorList: `${apiBaseUrl}broadband/bill-payment/getOperaterList`,
  broadbandFetchBill: `${apiBaseUrl}broadband/bill-payment/fetchBill`,
  broadbandPayBill: `${apiBaseUrl}broadband/bill-payment/payBill`,




  // banking api route
  aepsOnboarding: `${APIBank}aeps/onboarding`,
  aepsRegistration: `${APIBank}aeps/registration`,
  aepsAuthentication: `${APIBank}aeps/authentication`,
  aepsGetBankList: `${APIBank}aeps/getBankList`,
  aepsWithdraw: `${APIBank}aeps/cash/withdraw`,
  aepsDeposit: `${APIBank}aeps/aadhaarPay `,

  newOnboarding: `${APIBank}aeps/newOnboarding `,
  twoFactorAuthLogin: `${APIBank}aeps/twoFactorAuthLogin `,
  withdrawal: `${APIBank}aeps/withdrawal `,
  balanceEnquiry: `${APIBank}aeps/balanceEnquiry `,
  getMiniStatement: `${APIBank}aeps/getMiniStatement `,
  getBanks: `${APIBank}dmt/transfer/getBanks `,
  bankAccountVerify: `${APIBank}account/verify/details `,


  // DMT api route
  queryImmitor: `${APIBank}dmt/transfer/queryRemitter`,
  registerBeneficiary: `${APIBank}dmt/transfer/registerBeneficiary`,
  registerRemitter: `${APIBank}dmt/transfer/registerRemitter`,
  fetchBeneficiary: `${APIBank}dmt/transfer/fetchBeneficiary`,
  getRemitterById: `${APIBank}dmt/transfer/getRemitterById`,
  deleteBeneficiary: `${APIBank}dmt/transfer/deleteBeneficiary`,
  transactionMoney: `${APIBank}dmt/transfer/transaction`,
  pennyDrop: `${APIBank}dmt/transfer/pennyDrop`,
  getBankList: `${APIBank}aeps/getBankList`,

  // Bank Account
  generateURL: `${APIBank}account/generateURL`,

  //Quik Dhan
  dhanSendOTP: `${APIBank}account/quick/dhan/sendOTP`,
  dhanVerifyOTP: `${APIBank}account/quick/dhan/verifyOTP`,


};






export const APIRequest = async (config = {}, onSuccess, onError, noAuth = null) => {

  const token = sessionStorage.getItem("token");

  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        // timeout: 180000, // Wait for 5 seconds
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
    // console.log(data);
    axios(data)
      .then(res => {
        console.log(res, 'api--------');
        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          if (res?.data?.message === 'Token expired please login again.') {
            ClearSession()
            window.location.reload();
          }
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        console.log(err, 'catch--');
        if (err?.response?.data?.message === 'Token expired please login again.') {
          ClearSession()
          window.location.reload();
        }
        onError(err?.response?.data ? err?.response.data : err?.response);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = sessionStorage.getItem("token");

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token

        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    console.log('config', data);
    axios(data)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          console.log(res.data);
          onSuccess(res.data);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};


export const Statelist = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Orissa',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Tamil Nadu',
  'Tripura',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Pondicherry',
]

export const StatelistCode = [
  { State: 'Andhra Pradesh', Abbreviation: 'AP' },
  { State: 'Arunachal Pradesh', Abbreviation: 'AR' },
  { State: 'Assam', Abbreviation: 'AS' },
  { State: 'Bihar', Abbreviation: 'BR' },
  { State: 'Chhattisgarh', Abbreviation: 'CG' },
  { State: 'Goa', Abbreviation: 'GA' },
  { State: 'Gujarat', Abbreviation: 'GJ' },
  { State: 'Haryana', Abbreviation: 'HR' },
  { State: 'Himachal Pradesh', Abbreviation: 'HP' },
  { State: 'Jammu and Kashmir', Abbreviation: 'JK' },
  { State: 'Jharkhand', Abbreviation: 'JH' },
  { State: 'Karnataka', Abbreviation: 'KA' },
  { State: 'Kerala', Abbreviation: 'KL' },
  { State: 'Madhya Pradesh', Abbreviation: 'MP' },
  { State: 'Maharashtra', Abbreviation: 'MH' },
  { State: 'Manipur', Abbreviation: 'MN' },
  { State: 'Meghalaya', Abbreviation: 'ML' },
  { State: 'Mizoram', Abbreviation: 'MZ' },
  { State: 'Nagaland', Abbreviation: 'NL' },
  { State: 'Orissa', Abbreviation: 'OR' },
  { State: 'Punjab', Abbreviation: 'PB' },
  { State: 'Rajasthan', Abbreviation: 'RJ' },
  { State: 'Sikkim', Abbreviation: 'SK' },
  { State: 'Tamil Nadu', Abbreviation: 'TN' },
  { State: 'Tripura', Abbreviation: 'TR' },
  { State: 'Uttarakhand', Abbreviation: 'UK' },
  { State: 'Uttar Pradesh', Abbreviation: 'UP' },
  { State: 'West Bengal', Abbreviation: 'WB' },
  { State: 'Tamil Nadu', Abbreviation: 'TN' },
  { State: 'Tripura', Abbreviation: 'TR' },
  { State: 'Andaman and Nicobar Islands', Abbreviation: 'AN' },
  { State: 'Chandigarh', Abbreviation: 'CH' },
  { State: 'Dadra and Nagar Haveli', Abbreviation: 'DH' },
  { State: 'Daman and Diu', Abbreviation: 'DD' },
  { State: 'Delhi', Abbreviation: 'DL' },
  { State: 'Lakshadweep', Abbreviation: 'LD' },
  { State: 'Pondicherry', Abbreviation: 'PY' }
];
