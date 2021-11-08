import './compensation-layout.css';

import {
  Divider,
  // Card,
  Slider,
  PageHeader,
  Row,
  Col,
  Typography,
} from 'antd';

import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import YearlyCompensation, { DataTransform } from './overview-graph';
import numberWithCommas from '../tools/numbersWithCommas';

const { Title, Text } = Typography;

const SECTION_HEADER_CLASSNAME = 'section-header';

const baseColor = '#9696CE';
const bonusColor = '#81DDB0';
// const equityColor = '#DDC981';

// TODO: connect to api
const fetchCompensationData = () => ({
  baseSalary: 100000,
  yearlyBonus: 25000,
  signing: 50000,

});

const CompensationLayout = () => {
  const [bonusAppreciationRate, setBonusAppreciationRate] = useState(0);
  const [baseAppreciationRate, setBaseAppreciationRate] = useState(0);
  const updateValue = (setter) => (value) => {
    setter(value);
  };

  const compensationData = fetchCompensationData();
  const { baseSalary: base, yearlyBonus: bonus } = compensationData;
  const totalCompensation = base + bonus;

  console.log(bonusAppreciationRate, baseAppreciationRate);
  const graphData = DataTransform({ base, bonus },
    baseAppreciationRate, bonusAppreciationRate, 7);
  return (
    <>
      <CompensationHeader
        totalCompensation={numberWithCommas(totalCompensation)}
        position='Level 3 SWE'
        company='Snapchat'
      />
      <YearlyCompensation data={graphData} />
      <Divider />
      <CompensationConfiguration
        base={base}
        bonus={bonus}
        updateBaseRate={updateValue(setBaseAppreciationRate)}
        updateBonusRate={updateValue(setBonusAppreciationRate)}
      />
    </>
  );
};

const CompensationHeader = (props) => {
  const { company, position, totalCompensation } = props;
  return (
    <>
      <Row justify='space-between' wrap={false} align='middle'>
        <Col justify='start'>
          <Title style={{ display: 'inline-block' }}>{company}</Title>
          <Text style={{ display: 'inline-block', margin: '10px' }}>
            {position}
          </Text>
        </Col>
        <Col style={{ whiteSpace: 'nowrap' }}>
          <Title style={{ display: 'inline-block' }}>
            {totalCompensation}
            $
          </Title>
          <div style={{ display: 'inline-block', margin: '10px' }}>
            <Text>yearly</Text>
            <br />
            <Text>compensation</Text>
          </div>
        </Col>
      </Row>
      <Divider />
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Compensation'
        subTitle="Here's a quick rundown of your financials."
      />
    </>
  );
};

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

const CompensationConfiguration = (props) => {
  const {
    base, bonus, updateBaseRate, updateBonusRate,
  } = props;

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Growth'
        subTitle='Add your growth expectations. Each slider represents your projected yearly growth by percentage.'
      />
      <Row gutter={[8, 8]}>
        <Col style={{ textAlign: 'right', whiteSpace: 'nowrap' }} span={4}>
          <h1>Base Salary</h1>
          <br />
          <h1>Yearly Bonus</h1>
        </Col>
        <Divider type='vertical' style={{ height: 'auto' }} span={6} />
        <Col>
          <h1>
            $
            {numberWithCommas(base)}
          </h1>
          <br />
          <h1>
            $
            {numberWithCommas(bonus)}
          </h1>
        </Col>
        <Col span={10}>
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBaseRate}
            sliderColor={baseColor}
          />
          <br />
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBonusRate}
            sliderColor={bonusColor}
          />
        </Col>
      </Row>
    </>
  );
};

export default withRouter(CompensationLayout);
