/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const CompanyDetails = ({ handleChange, values }) => (
  <div>
    <label>
      <input
        type='text'
        placeholder='*Company Name'
        // defaultValue="Hello!"
        value={values.companyName}
        onChange={handleChange('companyName')}
      />
      <input
        className='small-input'
        type='text'
        placeholder='*Base Salary'
        // defaultValue="Hello!"
        value={values.baseSalary}
        onChange={handleChange('baseSalary')}
      />
    </label>

  </div>
);
export default CompanyDetails;
