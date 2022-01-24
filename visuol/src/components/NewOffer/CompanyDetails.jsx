/* eslint-disable jsx-a11y/label-has-associated-control */
// import React from 'react';
// import { Button } from 'antd';

import { React, useState } from 'react';
import { SwitchMultiButton } from 'switch-multi-button';
import { Button } from 'antd';
import './NewOfferForm.css';

const HoursInfo = ({ handleChange, values }) => (
  <div>
    <h3>Please fill out how many hours a week and how many weeks a year you work and then press done.</h3>
    <div className='input-box'>
      <label>
        <input
          className='small-input'
          type='number'
          placeholder='Hours per week'
          value={values.hours}
          onChange={handleChange('hours')}
        />
      </label>
      <label>
        <input
          className='small-input'
          type='number'
          placeholder='Weeks per year'
          value={values.week}
          onChange={handleChange('weeks')}
        />
      </label>
      <div className='flex-container'>
        <Button type='button' className='yes-no-button'>Done</Button>
      </div>
    </div>
  </div>
);

const PaymentRateSwitch = ({ handleChange, values }) => {
  const [state, setState] = useState('year');

  if (state == 'year') {
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
  } else {
    return (
      <div>
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
        <HoursInfo handleChange={handleChange} values={values}/>
      </div>
    );
  }
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
        <PaymentRateSwitch handleChange={handleChange} values={values}/>
      </div>
    </label>
  </div>
);
export default CompanyDetails;
