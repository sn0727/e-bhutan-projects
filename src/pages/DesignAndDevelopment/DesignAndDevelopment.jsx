import React, { useState } from 'react'
import SuccessMessage from '../../components/Common/AminateGIF/SuccessMessage'
import Header from "../../components/Common/Header/Header"
import Footer from "../../components/Common/Footer/Footer"
import DesignAndDevelopmentForm from './component/DesignAndDevelopmentForm'

const DesignAndDevelopment = () => {
  const [idComponent, setIdComponent] = useState(1)
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <DesignAndDevelopmentForm setIdComponent={setIdComponent} />
        )
      }
      {
        (idComponent === 2) && (
          <SuccessMessage />
        )
      }
      <Footer />
    </ >
  )
}

export default DesignAndDevelopment