import React from 'react';
import Loader from "./../../assets/loading/loader.gif"

const Loading = () => {

  return (
    <div className='loading-box'>
      <h1>Redirect to Payment Gateway</h1>
      <img src={Loader} alt="loadding" />
    </div>
  )
}

export default Loading
