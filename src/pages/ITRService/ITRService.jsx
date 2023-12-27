import React, { useState } from 'react'
import SuccessMessage from '../../components/Common/AminateGIF/SuccessMessage'
import Header from "../../components/Common/Header/Header"
import Footer from "../../components/Common/Footer/Footer"
import ITRServiceForm from './component/ITRServiceForm'

const ITRService = () => {
  const [idComponent, setIdComponent] = useState(1)
  return (
    <>
      <Header />
      {
        (idComponent === 1) && (
          <ITRServiceForm setIdComponent={setIdComponent} />
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

export default ITRService