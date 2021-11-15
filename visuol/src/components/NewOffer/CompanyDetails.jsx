/* eslint-disable jsx-a11y/label-has-associated-control */
// import React from 'react';
// import { Button } from 'antd';

import { React, useState } from 'react';
import { SwitchMultiButton } from 'switch-multi-button';

function PaymentRateSwitch() {
  const [state, setState] = useState('year');

  return (
    <SwitchMultiButton
      className='wage-toggle'
      value={state}
      setValue={setState}
      style={{ fontSize: 18, fontWeight: 20 }}
      buttons={[
        {
          text: 'Year',
          value: 'year',
        },
        {
          text: 'Hour',
          value: 'hour',
        },
      ]}
    />
  );
}

const CompanyDetails = ({ handleChange, values }) => (
  <div>
    <label>
      <input
        type='text'
        placeholder='*Company Name'
        value={values.company}
        onChange={handleChange('company')}
      />
      <h3>BASE SALARY</h3>
      <hr />
      <div className='input-box'>
        <input
          className='small-input'
          type='number'
          placeholder='*Base Salary'
          value={values.base}
          onChange={handleChange('base')}
        />
        <PaymentRateSwitch />
      </div>
    </label>
  </div>
);
export default CompanyDetails;
