/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Row, Col, Select } from 'antd';
import { myOffers } from '../../OfferAPI';
import CompensationLayout from '../compensation/compensation-layout';

const { Option } = Select;

const ComparisonLayout = () => {
  const [constructed, setConstructed] = useState(false); // so we don't fetch data multiple times
  const [offers, setOffers] = useState([]);
  const [offer1, setOffer1] = useState(null);
  const [offer2, setOffer2] = useState(null);
  if (!constructed) {
    myOffers().then((response) => {
      // eslint-disable-next-line no-underscore-dangle
      setOffers(response.map((offerObj) => ({ ...offerObj, id: offerObj._id })));
    });
    setConstructed(true);
  }
  console.log('offers', offers);
  console.log(offer1, offer2);
  // offer selection
  // offer display
  return (
    <>
      <Row justify='space-around'>
        <Col>
          <Select
            placeholder='Company 1'
            onChange={(choice) => {
              const match = offers.find((offer) => choice === offer.company);
              console.log(match);
              setOffer1(match);
            }}
          >
            {offers.map((offer) => (<Option value={offer.company}>{offer.company}</Option>))}
          </Select>
        </Col>
        <Col>
          <Select
            placeholder='Company 2'
            onChange={(choice) => {
              const match = offers.find((offer) => choice === offer.company);
              console.log(match);
              setOffer2(match);
            }}
          >
            {offers.map((offer) => (<Option value={offer.company}>{offer.company}</Option>))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: '50%' }}>
          {offer1 ? (
            <CompensationLayout
              offer={offer1}
            />
          ) : null }
        </Col>
        <Col style={{ width: '50%' }}>
          {offer2 ? (
            <CompensationLayout
              offer={offer2}
            />
          ) : null }
        </Col>
      </Row>
    </>
  );
};

export default ComparisonLayout;
