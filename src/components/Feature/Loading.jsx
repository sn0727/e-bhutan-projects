import React, { useEffect } from 'react';
import Loader from "./../../assets/loading/loader.gif"

const Loading = ({ setIdComponent }) => {

  useEffect(() => {
    // Set a timeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setIdComponent(7)
    }, 2000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); //

  return (
    <div className='loading-box'>
      <h1>Redirect to Payment Gateway</h1>
      <img src={Loader} alt="loadding" />
    </div>
  )
}

export default Loading
