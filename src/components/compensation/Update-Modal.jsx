/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './Modal.css';
import './CompensationConfiguration.css';
import { updateOffer } from '../../OfferAPI';

export default function UpdateModal({
  id, open, base, bonus, children, onClose,
}) {
  const [newBase, setNewBase] = useState('');
  const [newBonus, setNewBonus] = useState('');

  if (!open) return null;

  const update = () => {
    updateOffer(id, newBase, newBonus);
    onClose();
  };

  return (
    <div>
      <div className='overlay' />
      <div className='modal'>
        <p>New Base</p>
        <input
          type='text'
          placeholder={base}
          value={newBase}
          onChange={(e) => setNewBase(e.target.value)}
        />
        <p>New Bonus</p>
        <input
          type='text'
          placeholder={bonus}
          value={newBonus}
          onChange={(e) => setNewBonus(e.target.value)}
        />
        <div className='buttons'>
          <button onClick={update} className='delete-button'>Update</button>
          <button onClick={onClose} className='delete-button'>Close</button>
          {children}
        </div>
      </div>
    </div>
  );
}
