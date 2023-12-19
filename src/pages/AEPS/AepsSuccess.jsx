import React, { useEffect, useState } from 'react'
import Header from '../../components/Common/Header/Header'
import Footer from '../../components/Common/Footer/Footer'
import BackButton from '../../components/Button/BackButton'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from "./Css/styles.module.css"
import PaymentSuccess from "../../../src/assets/loading/payment-success.gif"

const AepsSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const billDetails = location.state;
    console.log(location.state);
    const [data, setdata] = useState(billDetails?.data)
    const [ListData, setListData] = useState([])


    const navigateToAnotherRoute = () => {
        console.log('navigateToAnotherRoute');
        navigate('/home');
    }
    useEffect(() => {
        !billDetails && navigate('/home')
        const handlePopstate = () => {
            // Prevent the default "back" behavior
            // Navigate to another route instead
            navigateToAnotherRoute();
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        if (data?.ministatementlist) {
            const data1 = data?.ministatementlist?.npcidata?.split("    ");
            console.log(data1);
            const regex = /(\d{2}\/\d{2}\/\d{2})\s+(DR)\s+(\d+\.\d{2})/g;
            let matches;
            const transactions = [];

            while ((matches = regex.exec(data?.ministatementlist?.npcidata)) !== null) {
                const date = matches[1];
                const type = matches[2];
                const amount = parseFloat(matches[3]);

                transactions.push({ date, type, amount });
            }
            while ((matches = regex.exec(data?.ministatement)) !== null) {
                const date = matches[1];
                const type = matches[2];
                const amount = parseFloat(matches[3]);
                transactions.push({ date, type, amount });
            }

            setListData(transactions)
        }
        console.log(data,'555',ListData, 'data--');
    }, [data])
    return (
        <>
            <Header />
            <div className="comman-container px-4">
                <div className={styles.paymentSuccess} >
                    <div className='mobile-recharge'>
                        <BackButton link={"aeps"} />
                        <h1>Transaction status</h1>
                    </div>
                    <img src={PaymentSuccess} alt="payment-success" />
                    <h1 className={styles.header1}>Transaction Successful</h1>
                </div>
                <div className='mb-8'>
                    <div className={styles.innerbillDetails}>
                        <ul className={styles.liTextL}>
                            {data?.clientrefno ? <li>Order Id</li> : null}
                            {data?.last_aadhar ? < li >Last Aadhar</li> : null}
                            {data?.amount ? < li > Amount</li> : null}
                            {data?.balanceamount ? < li > Balance Amount</li> : null}
                            <li>Bill Date</li>
                            {data?.clientrefno ? <li>Invoice No</li> : null}
                        </ul>
                        <ul className={styles.liTextR}>
                            {data?.clientrefno ? <li>{data?.clientrefno}</li> : null}
                            {data?.last_aadhar ? < li > {data?.last_aadhar}</li> : null}
                            {data?.amount ? < li > {data?.amount}</li> : null}
                            {data?.balanceamount ? < li > {data?.balanceamount}</li> : null}
                            <li>{(new Date().toLocaleString().split(',')[0])}</li>
                            {data?.clientrefno ? <li>{data?.clientrefno}</li> : null}
                        </ul>
                    </div>
                    {
                    data?.ministatement?
                    data?.ministatement?.length > 0 ? <div>
                        <h1 className={styles.header1}>Mini Statement</h1>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.thth} >Amount</th>
                                <th className={styles.thth}>Date</th>
                                <th className={styles.thth}>Type</th>
                                <th className={styles.thth}>Narration</th>
                            </tr>

                            {data?.ministatement?.length > 0 ?
                                data?.ministatement?.map((item, index) => (
                                    <tr>
                                        <td className={styles.thth}>{item?.amount}</td>
                                        <td className={styles.thth}>{item?.date}</td>
                                        <td className={styles.thth}>{item?.txnType}</td>
                                        <td className={styles.thth}>{item?.narration}</td>
                                    </tr>
                                ))
                                : null}
                        </table>

                    </div>
                    :null:
                    ListData?.length > 0 ? <div>
                        <h1 className={styles.header1}>Mini Statement</h1>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.thth} >Amount</th>
                                <th className={styles.thth}>Date</th>
                                <th className={styles.thth}>Type</th>
                            </tr>

                            {ListData?.length > 0 ?
                                ListData?.map((item, index) => (
                                    <tr>
                                        <td className={styles.thth}>{item?.amount}</td>
                                        <td className={styles.thth}>{item?.date}</td>
                                        <td className={styles.thth}>{item?.type}</td>
                                    </tr>
                                ))
                                : null}
                        </table>

                    </div>
                     : null}

                </div>

            </div>

            <Footer />
        </>

    )
}

export default AepsSuccess