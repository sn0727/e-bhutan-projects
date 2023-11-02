
import React from 'react';
import Sendtoairpay from '../../../utils/Sendtoairpay'
import $ from 'jquery';
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
        return (

            <div className="comman-container px-4">
                <form className="main-transaction-form" action="https://payments.airpay.co.in/pay/index.php" method="post">
                    <input type="text" placeholder="Buyer Email" name="buyerEmail" hidden  required  />
                    <input type="text" placeholder="Buyer Phone" name="buyerPhone" required />
                    <input type="text" placeholder="Buyer First Name" name="buyerFirstName" required />
                    <input type="text" placeholder="Buyer Last Name" name="buyerLastName" />
                    <input type="text" placeholder="Buyer Address" name="buyerAddress" />
                    <input type="text" placeholder="Buyer City" name="buyerCity" />
                    <input type="text" placeholder="Buyer State" name="buyerState" />
                    <input type="text" placeholder="Buyer Country" name="buyerCountry" />
                    <input type="text" placeholder="Buyer Pincode" name="BuyerPincode" />
                    <input type="text" placeholder="Order ID" name="orderid" />
                    <input type="text" placeholder="Amount" name="amount" />
                    <input type="text" placeholder="Custom Field 1" name="customvar" />
                    <input type="text" placeholder="chmod" name="chmod" />
                    <input type="text" placeholder="Token" name="token" />
                    <input type="text" placeholder="Transaction Wallet" name="wallet" />
                    <input type="text" placeholder="Currency" name="currency" />
                    {/* <input type="text" placeholder="isoCurrency" name="isocurrency" /> */}
                    <input type="text" id="subtype" placeholder="subtype" name="txnsubtype" />
                    <button type="button" onClick={this.validates}>Pay Here</button>
                </form>
                <p>
                    {this.getErrorMessages()}
                </p>
            </div>
        )
    }

}