import './compensation-layout.css';

import {
  Divider,
  Card,
  Slider,
  PageHeader,
  Row,
  Col,
  Typography,
  Space,
} from 'antd';

import { withRouter } from 'react-router-dom';

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const SECTION_HEADER_CLASSNAME = 'section-header';

const baseColor = '#9696CE';
const bonusColor = '#81DDB0';
// const equityColor = '#DDC981';

const CompensationLayout = () => {
  const [bonusAppreciationRate, setBonusAppreciationRate] = useState(0);
  const [baseAppreciationRate, setBaseAppreciationRate] = useState(0);
  const updateValue = (setter) => (value) => {
    setter(value);
  };
  console.log(bonusAppreciationRate, baseAppreciationRate);

  return (
    <>
      <CompensationHeader
        totalCompensation={205000}
        position='Level 3 SWE'
        company='Snapchat'
      />
      <CompensationSummary
        baseSalary={100000}
        bonus={30000}
        equity={1000}
        vestingPeriod={48}
      />
      <Divider />
      <SampleChart />
      <Divider />
      <ExplorationExplaination />
      <Divider />
      <CompensationConfiguration
        updateBase={updateValue(setBaseAppreciationRate)}
        updateBonus={updateValue(setBonusAppreciationRate)}
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
          <Space />
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

const ExplorationExplaination = () => (
  <PageHeader
    className={SECTION_HEADER_CLASSNAME}
    title='Explore Your Offer'
    subTitle='Manipulate different aspects of your offer with the sliders below.'
  />
);

const SliderCard = (props) => {
  const {
    title,
    description,
    min,
    max,
    defaultValue,
    updateValue,
    sliderColor,
  } = props;

  return (
    <Card title={title} style={{ width: 500 }}>
      <p>{description}</p>
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
    </Card>
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

const CompRow = (props) => {
  const {
    compType,
    compValue,
    compTimeframe,
    illiquid, // if the unit is not in dollars
  } = props;

  return (
    <div style={{ color: 'black' }}>
      <Row justify='center' style={{ fontSize: 20, fontWeight: 'bold', maxHeight: '75px' }}>
        <Col flex=''>
          {compType ? (
            <p>
              {compType}
            </p>
          ) : null}
        </Col>
        <Col>
          <Divider type='vertical' />
        </Col>
        <Col>
          {!illiquid ? '$' : null}
          {compValue}
          {compTimeframe ? ` over ${compTimeframe} months` : null}
        </Col>
      </Row>
    </div>
  );
};

const CompensationSummary = (props) => {
  const {
    baseSalary,
    bonus,
    equity,
    vestingPeriod,
  } = props;

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Compensation Overview'
        subTitle="Here's a quick summary of your compensation."
      />
      <div style={{ width: '600px' }}>
        <CompRow
          compType='Base Salary'
          compValue={baseSalary}
        />
        <CompRow
          compType='Bonus'
          compValue={bonus}
        />
        <CompRow
          compType='Equity'
          compValue={equity}
          vestingPeriod={vestingPeriod}
          illiquid
        />
      </div>
    </>
  );
};

const CompensationConfiguration = (props) => {
  const { updateBase, updateBonus } = props;

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Base'
        subTitle='Configure your base salary options.'
      />
      <Row gutter={[8, 8]}>
        <Col span={4}><Text>Base Salary</Text></Col>
        <Col span={4}>$110,000</Col>
        <Col span={16}>
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBase}
            sliderColor={baseColor}
          />
        </Col>

        <Col span={8} />
        <Col span={8} />
        <Col span={8} />
      </Row>
      <SliderCard
        title='Projected Growth'
        description='How much, in percentage terms, do you expect your salary to grow yearly?'
        defaultValue={0}
        min={0}
        max={50}
        updateValue={updateBase}
        sliderColor={baseColor}
      />
      <SliderCard
        title='Projected Growth'
        description='How much, in percentage terms, do you expect your bonus to grow yearly?'
        defaultValue={0}
        min={0}
        max={50}
        updateValue={updateBonus}
        sliderColor={bonusColor}
      />
    </>
  );
};

export default withRouter(CompensationLayout);

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const SampleChart = () => (
  <AreaChart
    width={730}
    height={250}
    data={data}
    margin={{
      top: 10, right: 30, left: 0, bottom: 0,
    }}
  >
    <defs>
      <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
      </linearGradient>
      <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
        <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey='name' />
    <YAxis />
    <CartesianGrid strokeDasharray='3 3' />
    <Tooltip />
    <Area type='monotone' dataKey='uv' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
    <Area type='monotone' dataKey='pv' stroke='#82ca9d' fillOpacity={1} fill='url(#colorPv)' />
  </AreaChart>
);
