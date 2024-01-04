import React, { useState } from 'react'
import Header from '../../../components/Common/Header/Header'
import Footer from '../../../components/Common/Footer/Footer'
import SuccessMessage from '../../../components/Common/AminateGIF/SuccessMessage'
import InsuranceForm from '../FormComponent/InsuranceForm/InsuranceForm'
import { ApiUrl } from '../../../utils/api'

const GroupTeamInsurance = () => {
    const [idComponent, setIdComponent] = useState(1)
    return (
        <>
            <Header />
            {
                (idComponent === 1) && (
                    <InsuranceForm
                        pageTitle={'Group Insurance'}
                        pageRequrest={'GroupInsurance'}
                        loanServiceAPiRoute={ApiUrl?.groupInsurance}
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

export default GroupTeamInsurance