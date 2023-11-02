
import React from 'react';
import Sendtoairpay from '../../../utils/Sendtoairpay'
import $ from 'jquery';
import styles from "./../style/style.module.css"
import jwt_decode from "jwt-decode";
import { makeid } from '../../../utils/MakeId';

export default class PaymentGateway extends React.Component {
    constructor() {
        super();

    }



    ;
    getErrorMessages() {
        return this.err;
    }
    getCs() {
        var airpay = new Sendtoairpay()
        airpay.getConfig();

    }
    validates() {
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


        var app = new PaymentGateway();
        app.getCs();


    }

    render() {
        const { location } = this.props;
        const receivedData = location?.state ? location.state.data : null;
        console.log(location);


        const token = localStorage.getItem('token')
        let decoded = jwt_decode(token);
        console.log(decoded.user);
        var email = decoded.user.email;
        var fname = decoded.user.name;
        var lname = 'anand';
        var city = decoded.user.district;
        var state = decoded.user.state;
        var country = 'India';
        var address = decoded.user.address;
        var orderid = makeid(10);
        return (

            <div className="comman-container px-4" >
                <form style={{display: 'grid'}} className="main-transaction-form" action="https://payments.airpay.co.in/pay/index.php" method="post">
                    <input type="text" value={email} placeholder="Buyer Email" name="buyerEmail" hidden required />
                    <input type="text" placeholder="Buyer Phone" name="buyerPhone" required />
                    <input type="text" placeholder="Buyer First Name" name="buyerFirstName" required />
                    <input type="text" placeholder="Buyer Last Name" name="buyerLastName" />
                    <input type="text" placeholder="Buyer Address" name="buyerAddress" />
                    <input type="text" placeholder="Buyer City" name="buyerCity" />
                    <input type="text" placeholder="Buyer State" name="buyerState" />
                    <input type="text" placeholder="Buyer Country" name="buyerCountry" />
                    <input type="text" placeholder="Buyer Pincode" name="BuyerPincode" />
                    <input type="text" placeholder="Order ID" name="orderid" />
                    <input type="text" placeholder="Amount" name="amount" value={this.receivedData?.amount} />
                    <input type="text" placeholder="Custom Field 1" name="customvar" />
                    <input type="text" placeholder="chmod" name="chmod" />
                    <input type="text" placeholder="Token" name="token" />
                    <input type="text" placeholder="Transaction Wallet" name="wallet" />
                    <input type="text" placeholder="Currency" name="currency" className='enter-mobile-num pl-4' />
                    {/* <input type="text" placeholder='1234567890' className='enter-mobile-num bg-white border-cs InputTextColor' /> */}

                    <input type="text" placeholder="isoCurrency" name="isocurrency" />
                    <input type="text" id="subtype" placeholder="subtype" name="txnsubtype" />
                    {/* <button type="button" onClick={this.validates}>Pay Here</button> */}
                    <div className='p-5'>
                        <button onClick={this.validates} type='button' style={{ width: 150 }} className={styles.addMoney}>
                            <div className={`text-white`}>Pay Here</div>
                        </button>
                    </div>

                </form>
                <p>
                    {this.getErrorMessages()}
                </p>
            </div>
        )
    }

}