import React from 'react'

const TicketButton = (props) => {
 const {
  lable = 'lable',
  isActive = false,
  onClick,
  isCircular= false
 } = props
 return (
  <div className={`ticket-button ${isActive ? 'active' : ''} ${isCircular? 'circular':''}`}
   onClick={onClick}>
   <p>{lable}</p>
  </div>
 )
}

export default TicketButton
