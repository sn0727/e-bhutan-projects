import React, { useState } from 'react'
import SuccessMessage from '../../components/Common/AminateGIF/SuccessMessage'
import Header from "../../components/Common/Header/Header"
import Footer from "../../components/Common/Footer/Footer"
import GstServiceForm from './components/GstServiceForm'

const GstService = () => {
  const [idComponent, setIdComponent] = useState(1)
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <GstServiceForm setIdComponent={setIdComponent} />
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

export default GstService