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
    </div>
    <div className='flex-container'>
      <Button type='button' className='yes-no-button' onClick={handleChange('total')}>Done</Button>
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

        <div className='input-box'>
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
        </div>
        
        <div>
          <HoursInfo 
            handleChange={handleChange} 
            values={values}/>
        </div>

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
      <input
        type='text'
        placeholder='*State (Ex: Ohio)'
        value={values.state}
        onChange={handleChange('state')}
      />
      <h3>BASE SALARY</h3>
      <hr width='10%' align='left' />
      <div className='input-box'>
        <input
          className='small-input'
          type='number'
          placeholder='*Base Salary'
          value={values.base}
          onChange={handleChange('base')}
        />
      </div>
      <div className='input-box'>
        <PaymentRateSwitch 
          handleChange={handleChange} 
          values={values}
          className='salary-info'
        />
      </div>
    </label>
  </div>
);
export default CompanyDetails;
