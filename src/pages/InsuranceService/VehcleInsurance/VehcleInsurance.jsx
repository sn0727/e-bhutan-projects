import React, { useState } from 'react'
import Footer from '../../../components/Common/Footer/Footer'
import SuccessMessage from '../../../components/Common/AminateGIF/SuccessMessage'
import InsuranceForm from '../FormComponent/InsuranceForm/InsuranceForm'
import Header from '../../../components/Common/Header/Header'
import { ApiUrl } from '../../../utils/api'

const VehcleInsurance = () => {
    const [idComponent, setIdComponent] = useState(1)
    return (
        <>
            <Header />
            {
                (idComponent === 1) && (
                    <InsuranceForm
                        pageTitle={'Vehcle Insurance'}
                        pageRequrest={'VehcleInsurance'}
                        loanServiceAPiRoute={ApiUrl?.vehcleInsurance}
                        setIdComponent={setIdComponent}
                    />
                )
            }
            {
                (idComponent === 2) && (
                    <SuccessMessage />
                )
            }
            <Footer />
        </>
    )
}

export default VehcleInsurance