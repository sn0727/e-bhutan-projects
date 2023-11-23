// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import EnterAadhaar from './components/Auth/EnterAadhaar';
import Aeps from './pages/AEPS/Aeps';
import TravelAndTour from './pages/Travel_And_Tour/TravelAndTour';
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
import QuickDhanTest from './pages/QuickDhan/QuickDhanTesting';

function App() {
  // const authToken = sessionStorage.getItem("token");
  return (
    <BrowserRouter>
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
          <Route path='/aeps' element={<Aeps />} />
          <Route path='/aeps-success' element={<AepsSuccess />} />
          <Route path='/travel-and-tour' element={<TravelAndTour />} />
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
          <Route path='/testing' element={<Testing />} />
          <Route path='/register-beneficiary' element={<RegisterBeneficiary />} />
          <Route path='/money-transfer' element={<ChakraProvider><Money_Transfer /></ChakraProvider>} />
          <Route path='/quick-dhan' element={<QuickDhan />} />
        </Route>
        {/* protected router */}
      </Routes> : <NetwordError />}
    </BrowserRouter>
  );
}

export default App;
