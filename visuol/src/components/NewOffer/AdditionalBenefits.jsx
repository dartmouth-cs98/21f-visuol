/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const AdditionalBenefits = ({ handleChange, values }) => (
  <div>
    <label>
      <input
        className='small-input'
        type='number'
        placeholder='Cash Bonus'
        value={values.bonus}
        onChange={handleChange('bnus')}
      />
    </label>
    <label>
      <input
        className='small-input'
        type='number'
        placeholder='401k Match Percentage'
        value={values.matchPercentage}
        onChange={handleChange('matchPercentage')}
      />
    </label>
  </div>
);

export default AdditionalBenefits;
