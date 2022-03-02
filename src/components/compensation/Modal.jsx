/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './Modal.css';
import './CompensationConfiguration.css';
import { shareOffer } from '../../OfferAPI';

export default function Modal({
  id, open, children, onClose,
}) {
  const [email, setEmail] = useState('');
  
  if (!open) return null;

  const share = () => {
    shareOffer(id, email);
    onClose();
  };

  return (
    <div>
      <div className='overlay' />
      <div className='modal'>
        <p>Enter the email of the user you would like to share this offer with</p>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='buttons'>
          <button onClick={share} className='delete-button'>Share</button>
          <button onClick={onClose} className='delete-button'>Close</button>
          {children}
        </div>
      </div>
    </div>
  );
}
