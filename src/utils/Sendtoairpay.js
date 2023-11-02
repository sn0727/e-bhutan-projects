import React from 'react';

import App from '../pages/Wallet/content/PaymentGateway';

import { sha256 } from 'js-sha256';
import $ from 'jquery';
window.$ = $;
const customData = require('../config.json');
class Sendtoairpay extends React.Component {
    constructor() {
        super();
        // var merchantDetails;
        // var chmod;
        // var sha256 = require('js-sha256');


        var jsontext;
        this.conf = {
            'username': customData.username, // Username
            'password': customData.password, // Password
            'secret': customData.secret, // API key
            'mercid': customData.mercid //Merchant ID 

        };
        this.state = {
            isLoading: true,
            chmod: '',
            buyerEmail: '',
            buyerPhone: '',
            buyerFirstName: '',
            buyerLastName: '',
            buyerAddress: '',
            buyerCity: '',
            buyerState: '',
            buyerCountry: '',
            buyerPinCode: '',
            orderid: '',
            amount: '',
            customvar: '',
            txnsubtype: '',
            token: '',
            wallet: '',
            currency: '',
            isocurrency: '',



        }

    }
    submitForm = e => {
        alert("ss");
        e.preventDefault();
        this.setState({ isLoading: true });
        // dispatch FORM_SUBMIT action
        this.getConfig();



    };


    async getConfig() {
        await this.submit();
    }

    submit() {
        var email = $('[name="buyerEmail"]').val();
        var fname = $('[name="buyerFirstName"]').val();
        var lname = $('[name="buyerLastName"]').val();
        var city = $('[name="buyerCity"]').val();
        var state = $('[name="buyerState"]').val();
        var country = $('[name="buyerCountry"]').val();
        var address = $('[name="buyerAddress"]').val();
        var orderid = $('[name="orderid"]').val();
        var amount = $('[name="amount"]').val();


        var paramString = email + fname + lname + address + city + state + country + amount + orderid,
            date = new Date(),
            alldata = '',
            privateKey = sha256(this.conf.secret + '@' + this.conf.username + ':|:' + this.conf.password),
            checksum;

        alldata += paramString + date.toISOString().split('T')[0] + "";
        // checksum = sha256(sha256(this.merchantDetails.username + "~:~" + this.merchantDetails.password) + "@" + alldata);

        var key = sha256(this.conf.username + "~:~" + this.conf.password);
        checksum = sha256(key + "@" + alldata);

        var paramsHtml = '<input type="hidden" name="privatekey" value="' + privateKey + '"><input type="hidden" name="checksum" value="' + checksum + '"><input type="hidden" name="mercid" value="' + this.conf.mercid + '">';
        var isoCurrency = '<input type="hidden" name="isoCurrency" value="INR">';
        $('.main-transaction-form').append(paramsHtml);
        $('.main-transaction-form').append(paramsHtml);
        $('.main-transaction-form').submit();

    }


    render() {
        return (
            null()
        )
    }
}
export default Sendtoairpay
