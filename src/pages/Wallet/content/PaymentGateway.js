
import React from 'react';
import Sendtoairpay from '../../../utils/Sendtoairpay'
import $ from 'jquery';
import styles from "./../style/style.module.css"
import jwt_decode from "jwt-decode";
import { makeid } from '../../../utils/MakeId';
import { useLocation } from 'react-router-dom';

const  PaymentGateway = () => {
    const location = useLocation();
    const Data = location.state;

    const token = localStorage.getItem('token')
    let decoded = jwt_decode(token);
    console.log(decoded.user);
    var email = decoded.user.email.replaceAll(' ', '');
    var fname = decoded.user.name;
    var lname = '';
    var city = decoded.user.district;
    var state = decoded.user.state;
    var country = 'India';
    var address = decoded.user.address;
    var contact = decoded.user.contact;
    var orderid = makeid(10);
    var amount = Data?.amount
    var Pincode = decoded.user?.postalCode



    const getCs = () => {
        var airpay = new Sendtoairpay()
        airpay.getConfig();
    }
    const validates = () => {
        var email = $('[name="buyerEmail"]').val();
        var buyerPhone = $('[name="buyerPhone"]').val();
        var fname = $('[name="buyerFirstName"]').val();
        var lname = $('[name="buyerLastName"]').val();
        var BuyerPincode = $('[name="BuyerPincode"]').val();
        var city = $('[name="buyerCity"]').val();
        var state = $('[name="buyerState"]').val();
        var country = $('[name="buyerCountry"]').val();
        var buyerAddress = $('[name="buyerAddress"]').val();
        var orderid = $('[name="orderid"]').val();
        var amount = $('[name="amount"]').val();
        var currency = $('[name="currency"]').val();
        var isocurrency = $('[name="isocurrency"]').val();
        var chmod = $('[name="chmod"]').val();
        var rt_type = true;


        // var app = new PaymentGateway();
        // app.getCs();
        getCs()

    }

    return (
        <div className="comman-container px-4" >
            <form style={{ display: 'grid' }} className="main-transaction-form" action="https://payments.airpay.co.in/pay/index.php" method="post">
                <input type="text" value={email} placeholder="Buyer Email" name="buyerEmail" required hidden  />
                <input type="text" value={contact} placeholder="Buyer Phone" name="buyerPhone" required  hidden />
                <input type="text" value={fname}  placeholder="Buyer First Name" name="buyerFirstName" required  hidden />
                <input type="text" value={lname} placeholder="Buyer Last Name" name="buyerLastName"  hidden />
                <input type="text" value={address} placeholder="Buyer Address" name="buyerAddress" hidden  />
                <input type="text" value={city} placeholder="Buyer City" name="buyerCity"  hidden />
                <input type="text" value={state} placeholder="Buyer State" name="buyerState" hidden  />
                <input type="text" value={country} placeholder="Buyer Country" name="buyerCountry"  hidden />
                <input type="text" value={Pincode} placeholder="Buyer Pincode" name="BuyerPincode"  hidden />
                <input value={orderid} type="text" placeholder="Order ID" name="orderid"  hidden />
                <input value={amount}  type="text" placeholder="Amount" name="amount"  hidden />
                <input type="text" placeholder="Custom Field 1" name="customvar"  hidden />
                <input type="text" placeholder="chmod" name="chmod"  hidden />
                <input type="text" placeholder="Token" name="token"  hidden />
                <input type="text" placeholder="Transaction Wallet" name="wallet" hidden  />
                <input value={365} type="text" placeholder="Currency" name="currency" className='enter-mobile-num pl-4' hidden  />
                <input value={'INR'} type="text" placeholder="isoCurrency" name="isocurrency"  hidden />
                <input type="text" id="subtype" placeholder="subtype" name="txnsubtype" hidden  />
                {/* <button type="button" onClick={this.validates}>Pay Here</button> */}
                <div className='p-5'>
                    <button onClick={() => validates()} type='button' style={{ width: 150 }} className={styles.addMoney}>
                        <div className={`text-white`}>Pay Here</div>
                    </button>
                </div>

            </form>
        </div>
    )
}

export default PaymentGateway