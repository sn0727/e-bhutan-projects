import React, { useState } from 'react'
import { image } from '../../../constent/image'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { FlightInvoiceNo } from '../../../pages/FlightsBooking/atom/atom'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { FiDownload } from 'react-icons/fi';

const AnimateGIF = ({ setIdComponent }) => {
    const invoiceNo = useRecoilValue(FlightInvoiceNo)
    const [IsLoading, setIsLoading] = useState(false)
    const [PdfUrl, setPdfUrl] = useState('')

    const GetPdf = () => {
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl.generatePdf,
            body: {
                invoiceNo: invoiceNo
            }
        }
        console.log(config);
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                setIsLoading(false)
                setPdfUrl(res?.PdfUrl)
                window.open(res?.data, '_blank');
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }


    return (
        <div
            style={{
                maxWidth: '250px',
                margin: 'auto'
            }}
        >
            <img src={image?.paymentSuccess} alt="AnimateGIF"
                style={{
                    maxWidth: '150px',
                    margin: 'auto'
                }}
            />
            <p className='payment-successfull'
                style={{
                    textAlign: 'center'
                }}
            >Payment Successful</p>

            <div className='share-and-print'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '110px',
                    margin: '20px auto 0'
                }}
            >
                <Link>
                    <img width={30} height={40} src={image?.shareIcon} alt="" />
                </Link>
                <Link>
                    <img width={30} height={40} src={image?.printIcon} alt="" />
                </Link>
                {PdfUrl ?
                    <a
                        href={PdfUrl}
                        download="Example-PDF-document"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiDownload style={{ fontSize: 60, margin: 'auto' }} />
                    </a>
                    :
                    <a onClick={() => GetPdf()} >
                        <FiDownload style={{ fontSize: 60, margin: 'auto' }} />
                    </a>}
                <Link>
                    <img width={30} height={40} src={image?.downloadIcon} alt="" />
                </Link>
            </div>

            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => GetPdf()}>Share Bill</Link>
                </button>
            </div>
        </div>
    )
}

export default AnimateGIF