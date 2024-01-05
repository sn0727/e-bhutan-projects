// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import MobileRecharge from './pages/Mobile_Recharge/MobileRecharge';
import MobileChoicePlan from './pages/Mobile_Recharge/MobileChoicePlan';
import MobileRechargePayment from './pages/Mobile_Recharge/MobileRechargePayment';
import MobileRechargeBillDetails from './pages/Mobile_Recharge/MobileRechargeBillDetails';
import PaymentSuccess from './pages/Payment_Sucess/PaymentSuccess';
import GasRecharge from './pages/Gas_Recharge/GasBooking';
import GasBookingBillDetail from './pages/Gas_Recharge/GasBookingBillDetail';
import ElectricityBillPayment from './pages/Electricity/ElectricityBillPayment';
import ElectricityBillDetails from './pages/Electricity/ElectricityBillDetails';
import Login from './components/Auth/Login';
import MobileNumber from './components/Auth/MobileNumber';
import AccountVerification from './components/Auth/AccountVerification';
import Registration from './components/Auth/Registration';
import ForgatePassword from './components/Auth/ForgatePassword';
import ResetPassword from './components/Auth/ResetPassword';
import ResetPasswordLink from './components/Common/SuccessAuth/ResetPasswordLink';
import ResetPasswordSuccess from './components/Common/SuccessAuth/ResetPasswordSuccess';
import ProtectedRoute from './routes/ProtectedRoute';
import Page404 from './pages/404Page/404Page';
import Profile from './pages/Profile/Profile';
import Transaction from './pages/Transaction/Transaction';
import Water from "./pages/Water_Bill/WaterBill"
import DTHRecharge from "./pages/DTH_Recharge/DTHRecharge"
import BroadbandBill from './pages/Broadband_Service/BroadbandBill';
import MunicipalTax from './pages/Municipal_Tax/MunicipalTax';
import CreditCard from './pages/Credit_Card/CreditCard';
import FastagRecharge from './pages/Fastag/FastagRecharge';
import CommisionTransaction from './pages/Transaction/CommisionTransaction';
import FastagBillDetails from './pages/Fastag/FastagBillDetails';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BillDetails from './pages/Bill_Detail/BillDetails';
import Wallet from './pages/Wallet/Wallet';
import DTHBillDetails from './pages/DTH_Recharge/DTHBillDetails';
import WalletTransaction from './pages/Transaction/WalletTransaction';
import Laandline from './pages/Landline/Landline';
import Loan from './pages/Loan/Loan';
import Insurance from './pages/Insurance/Insurance';
import PostPaidMobileRecharge from './pages/PostPaid_Recharge/PostPaidMobileRecharge';
import TermsConditions from './pages/Terms-and-Conditions/TermsConditions';
import AadhaarNumber from './components/Auth/AadhaarNumber';
import AadhaarVerification from './components/Auth/AadhaarVerification';
import ChangePassword from './components/Auth/ChangePassword';
import AddWallet from './pages/Wallet/AddWallet';
import MoneyRequest from './pages/Wallet/MoneyRequest';
import MoneyRequestStatus from './pages/Transaction/MoneyRequestStatus';
import BackPage from './pages/test/BackPage';
import PaymentSuccessful from './pages/test/PaymentSuccessful';
import PaymentGateway from './pages/Wallet/content/PaymentGateway';
import { ChakraProvider } from '@chakra-ui/react';
import Money_Transfer from './pages/Money_Transfer/Money_Transfer';
import RegisterBeneficiary from './pages/Money_Transfer/RegisterBeneficiary';
import OpenAccount from './pages/OpenAccount/OpenAccount';
import AepsSuccess from './pages/AEPS/AepsSuccess';
import NetwordError from './pages/NetwordError/NetwordError';
import Testing from './pages/Testing/Testing';
import QuickDhan from './pages/QuickDhan/QuickDhan';
import FlightsBooking from './pages/FlightsBooking/FlightsBooking';
import BankAccountVerification from './pages/BankAccountVerification/BankAccountVerification';
import BusBooking from './pages/BusBooking/BusBooking';
import HorizontalList from './pages/Testing/HorizontalList';
import { Another } from './pages/Testing/Another';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AepsParent from './pages/AEPS/AepsParent';
import FlightTicketCancel from './pages/FlightsBooking/FlightTicketCancel';
import HotelBooking from './pages/HotelBooking/HotelBooking';
import MainTesting from './pages/Testing/MainTesting';
import CompanyFormation from './pages/CompanyFormation/CompanyFormation';
import GstService from './pages/GstService/GstService';
import PanCard from './pages/PanCard/PanCard';
import ITRService from './pages/ITRService/ITRService';
import DesignAndDevelopment from './pages/DesignAndDevelopment/DesignAndDevelopment';
import DigitalMarketing from './pages/DigitalMarketing/DigitalMarketing';
import AccountingService from './pages/AccountingService/AccountingService';
import DigitalSignature from './pages/DigitalSignature/DigitalSignature';
import PersonalLoan from './pages/PersonalLoanServices/PersonalLoan'
import HousingLoan from './pages/PersonalLoanServices/HousingLoan'
import MSMELoan from './pages/PersonalLoanServices/MSMELoan'
import LoanAgainstProperty from './pages/PersonalLoanServices/LoanAgainstProperty'
import BusinessLoan from './pages/PersonalLoanServices/BusinessLoan'
import HealthInsurance from './pages/InsuranceService/HealthInsurance/HealthInsurance';
import LifeInsurance from './pages/InsuranceService/LifeInsurance/LifeInsurance';
import GroupTeamInsurance from './pages/InsuranceService/GroupTeamInsurance/GroupTeamInsurance';
import VehcleInsurance from './pages/InsuranceService/VehcleInsurance/VehcleInsurance';
import TravelInsurance from './pages/InsuranceService/TravelInsurance/TravelInsurance';
import { useEffect } from 'react';
import PanCardVerification from './components/panCardVerification/panCardVerification';
// import HorizontalList from './pages/Testing/HorizontalList';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // const authToken = sessionStorage.getItem("token");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        {navigator.onLine ? <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<MobileNumber />} />
          <Route path='/account-verification' element={<AccountVerification />} />
          <Route path='/aadhaar-number' element={<AadhaarNumber />} />
          <Route path='/aadhaar-verification' element={<AadhaarVerification />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/forget-password' element={<ForgatePassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/send-email' element={<ResetPasswordLink />} />
          <Route path='/reset-password-success' element={<ResetPasswordSuccess />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/404page' element={<Page404 />} />


          <Route path='/payment-successful' element={<PaymentSuccessful />} />
          <Route path='/back-page' element={<BackPage />} />

          <Route path='/*' element={<Navigate replace to="/404page" />}></Route>
          {/* protected router */}
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/mobile-recharge' element={<MobileRecharge />} />
            <Route path='/mobile-choice-plan' element={<MobileChoicePlan />} />
            <Route path='/mobile-recharge-payment' element={<MobileRechargePayment />} />
            <Route path='/mobile-recharge-bill-details' element={<MobileRechargeBillDetails />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/gas-booking' element={<GasRecharge />} />
            <Route path='/gas-booking-bill-details' element={<GasBookingBillDetail />} />
            <Route path='/electricity-bill-payment' element={<ElectricityBillPayment />} />
            <Route path='/electricity-bill-details' element={<ElectricityBillDetails />} />
            <Route path='/dth-recharge' element={<DTHRecharge />} />
            <Route path='/water-bill' element={<Water />} />
            <Route path='/broadband-bill' element={<BroadbandBill />} />
            <Route path='/municipal-service' element={<MunicipalTax />} />
            <Route path='/credit-card' element={<CreditCard />} />
            <Route path='/fastag-recharge' element={<FastagRecharge />} />
            <Route path='/user-profile' element={<Profile />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/commission-transaction' element={<CommisionTransaction />} />
            <Route path='/aeps' element={<AepsParent />} />
            <Route path='/aeps-success' element={<AepsSuccess />} />
            <Route path='/filght-booking' element={<FlightsBooking />} />
            <Route path='/wallet-transaction' element={<WalletTransaction />} />
            <Route path='/landline-recharge' element={<Laandline />} />
            <Route path='/loan-payment' element={<Loan />} />
            <Route path='/insurance-emi-payment' element={<Insurance />} />
            <Route path='/postPaid-recharge' element={<PostPaidMobileRecharge />} />

            <Route path='/bill-detail' element={<BillDetails />} />
            <Route path='/fastag-bill-detail' element={<FastagBillDetails />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/dth-bill-detail' element={<DTHBillDetails />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/add-wallet' element={<AddWallet />} />
            <Route path='/money-request' element={<MoneyRequest />} />
            <Route path='/money-request-status' element={<MoneyRequestStatus />} />
            <Route path='/payment-gateway' element={<PaymentGateway />} />
            <Route path='/network-error' element={<NetwordError />} />
            <Route path='/open-account' element={<OpenAccount />} />
            <Route path='/another' element={<Another />} />
            <Route path='/register-beneficiary' element={<RegisterBeneficiary />} />
            <Route path='/money-transfer' element={<ChakraProvider><Money_Transfer /></ChakraProvider>} />
            <Route path='/quick-dhan' element={<QuickDhan />} />
            <Route path='/bank-account-verification' element={<BankAccountVerification />} />
            <Route path='/bus-booking' element={<BusBooking />} />
            <Route path='/flight-ticket-cancel' element={<FlightTicketCancel />} />
            <Route path='/hotel-booking' element={<HotelBooking />} />
            <Route path='/company-information' element={<CompanyFormation />} />
            <Route path='/gst-service' element={<GstService />} />
            <Route path='/pan-card' element={<PanCard />} />
            <Route path='/itr-service' element={<ITRService />} />
            <Route path='/design-and-development' element={<DesignAndDevelopment />} />
            <Route path='/digital-marketing' element={<DigitalMarketing />} />
            <Route path='/accounting-service' element={<AccountingService />} />
            <Route path='/digital-signature' element={<DigitalSignature />} />
            <Route path='/personal-loan' element={<PersonalLoan />} />
            <Route path='/housing-loan' element={<HousingLoan />} />
            <Route path='/business-loan' element={<BusinessLoan />} />
            <Route path='/loan-against-property' element={<LoanAgainstProperty />} />
            <Route path='/msme-loan' element={<MSMELoan />} />
            <Route path='/health-insurance' element={<HealthInsurance />} />
            <Route path='/life-insurance' element={<LifeInsurance />} />
            <Route path='/group-insurance' element={<GroupTeamInsurance />} />
            <Route path='/vehcle-insurance' element={<VehcleInsurance />} />
            <Route path='/travel-insurance' element={<TravelInsurance />} />
            <Route path='/pan-card-status' element={<PanCardVerification />} />
            <Route path='/testing' element={<MainTesting />} />
          </Route>
          {/* protected router */}
        </Routes> : <NetwordError />}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
