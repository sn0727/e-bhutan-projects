import React, { useState } from 'react';

const IncrementQuantity = () => {
  const [adultsQuantity, setAdultsQuantity] = useState(1);

  const increment = () => {
    if (adultsQuantity < 9) {
      setAdultsQuantity(adultsQuantity + 1);
    }
  };

  const decrement = () => {
    if (adultsQuantity > 0) {
      setAdultsQuantity(adultsQuantity - 1);
    }
  };

  return (
    <div className='card'>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        <button onClick={decrement} style={{ padding: '5px 10px' }}>-</button>
        <input
          type="number"
          value={adultsQuantity}
          min="1"
          max="9"
          style={{ width: '40px', textAlign: 'center', margin: '0 10px' }}
          readOnly
        />
        <button onClick={increment} style={{ padding: '5px 10px' }}>+</button>
      </div>
    </div>
  );
};

export default IncrementQuantity;
