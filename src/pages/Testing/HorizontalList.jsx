import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HorizontalList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [id, setId] = useState(location?.state.id ? location?.state.id : 1)

  const handlerCom = () => {
    navigate('/Another', {
      state : {id : id}
    })
  }

  console.log(id, 'tes =============')
  return (
    <div>
      <button type='button' onClick={handlerCom}>Butonn</button>
    </div>
  )
}

export default HorizontalList