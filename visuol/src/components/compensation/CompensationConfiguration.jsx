/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Slider, PageHeader, Row, Col, Divider, Typography, Card, Button,
} from 'antd';
import './CompensationConfiguration.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { removeOffer } from '../../OfferAPI';
import numberWithCommas from '../../tools/numbersWithCommas';
import Modal from './Modal';
import UpdateModal from './Update-Modal';

const { Paragraph } = Typography;

const SECTION_HEADER_CLASSNAME = 'section-header';

const CompensationSlider = (props) => {
  const {
    min,
    max,
    defaultValue,
    updateValue,
    sliderColor,
  } = props;

  return (
    <Slider
      defaultValue={defaultValue}
      min={min}
      max={max}
      onChange={updateValue}
      trackStyle={{ backgroundColor: sliderColor }}
          // TODO: currently box shadow (ring around handle) is still default blue.
          // Figure out code to change this.
      handleStyle={{ borderColor: sliderColor }}
    />
  );
};

const SliderLayout = (props) => {
  // slider properties is an array of maps with the format
  // [{
  //     title, value, min, max, updateValue, sliderColor
  // }]
  const { sliderProperties } = props;
  return (
    <Row gutter={[8, 8]}>
      <Col style={{ textAlign: 'right', whiteSpace: 'nowrap' }} span={4}>
        {sliderProperties.map((sliderProps, idx) => (
          <>
            <h1>{sliderProps.title}</h1>
            {idx + 1 !== sliderProperties.length ? <br /> : null}
          </>
        ))}
      </Col>
      <Divider type='vertical' style={{ height: 'auto' }} span={6} />
      <Col>
        {sliderProperties.map((sliderProps, idx) => (
          <>
            <h1>{sliderProps.value}</h1>
            {idx + 1 !== sliderProperties.length ? <br /> : null}
          </>
        ))}
      </Col>
      <Col span={10}>
        {sliderProperties.map((sliderProps, idx) => (
          <>
            <CompensationSlider
              defaultValue={sliderProps.defaultValue ? sliderProps.defaultValue : 0}
              min={sliderProps.min}
              max={sliderProps.max}
              updateValue={sliderProps.updateValue}
              sliderColor={sliderProps.sliderColor}
            />
            {idx + 1 !== sliderProperties.length ? <br /> : null}
          </>
        ))}
      </Col>
    </Row>
  );
};

const deleteOffer = (id) => {
  console.log(`delete offer for ${id}`);
  removeOffer(id);
  window.location.href = '/';
};

const CompensationConfiguration = (props) => {
  const {
    id,
    // company,
    base,
    bonus,
    updateBaseRate,
    updateBonusRate,
    baseColor,
    bonusColor,
    savingsColor,
    retirementColor,
    savingsPercentage,
    retirementPercentage,
    updateSavingsPercentage,
    updateRetirementPercentage,
  } = props;

  // const { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Configuration'
        subTitle='Set compensation projections for a better view of your finances.'
      />
      <Card style={{ backgroundColor: 'inherit' }}>
        <h1>Growth</h1>
        <Paragraph>
          Add your growth expectations.
          Each slider represents your projected yearly growth by percentage.
        </Paragraph>
        <SliderLayout
          sliderProperties={[{
            title: 'Base Salary',
            min: 0,
            max: 50,
            value: `$${numberWithCommas(base)}`,
            updateValue: updateBaseRate,
            sliderColor: baseColor,
          },
          {
            title: 'Annual Bonus',
            min: 0,
            max: 50,
            value: `$${numberWithCommas(bonus)}`,
            updateValue: updateBonusRate,
            sliderColor: bonusColor,
          },
          ]}
        />
      </Card>
      <Card style={{ backgroundColor: 'inherit' }}>
        <h1>Allocation</h1>
        <Paragraph>How do you expect to partition your earnings?</Paragraph>
        {/* TODO: TURN THIS INTO A HELP TOOLTIP */}
        <Paragraph>
          Adjust the savings and retirement rate sliders to change what percentage
          of your total earnings you expect to allocate.
        </Paragraph>
        <SliderLayout sliderProperties={[{
          title: 'Savings Rate',
          min: 0,
          max: 100,
          value: `${numberWithCommas(savingsPercentage)}%`,
          updateValue: updateSavingsPercentage,
          sliderColor: savingsColor,
          defaultValue: savingsPercentage,
        }, {
          title: 'Retirement Rate',
          min: 0,
          max: 10,
          value: `${numberWithCommas(retirementPercentage)}%`,
          updateValue: updateRetirementPercentage,
          sliderColor: retirementColor,
          defaultValue: retirementPercentage,
        },
        ]}
        />
      </Card>
      <div className='flex-container'>
        <NavLink to='/'>
          <Button type='button' className='delete-button' onClick={() => deleteOffer(id)}>
            Delete
          </Button>
        </NavLink>
        &nbsp;
        <Button type='button' className='delete-button' onClick={() => setIsEdit(true)}>
          Edit
        </Button>
        &nbsp;
        <Button type='button' className='delete-button' onClick={() => setIsOpen(true)}>
          Share
        </Button>
        <UpdateModal id={id} open={isEdit} base={base} bonus={bonus} onClose={() => setIsEdit(false)} />
        <Modal id={id} open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default CompensationConfiguration;
