/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Stocks = ({ handleChange, values }) => (
  <div>
    <label>
      <div className='input-box'>
        <input
          className='small-input'
          type='number'
          placeholder='Stocks'
          value={values.stocks}
          onChange={handleChange('stocks')}
        />
      </div>

    </label>

  </div>
);

export default Stocks;
