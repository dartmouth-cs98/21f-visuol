import {
  Divider,
  Card,
  Slider,
  PageHeader,
  Row,
  Col,
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
import React from 'react';

const SECTION_HEADER_CLASSNAME = 'section-header';

const updateValue = (fieldName) => (value) => {
  // TODO: Figure out where our data/states are stored
  console.log('fieldname', fieldName, 'value', value);
};

const CompensationLayout = () => (
  <>
    <CompensationHeader />
    <CompensationSummary
      baseSalary={100000}
      bonus={30000}
      equity={1000}
      vestingPeriod={48} // in months
    />
    <Divider />
    <SampleChart />
    <Divider />
    <ExplorationExplaination />
    <Divider />
    <BaseSalary />
    <Divider />
    <BonusConfiguration />
  </>
);

const CompensationHeader = () => (
  <PageHeader
    className={SECTION_HEADER_CLASSNAME}
    title='Compensation'
    subTitle="Here's a quick rundown of your financials."
  />
);

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
    fieldName,
  } = props;

  return (
    <Card title={title} style={{ width: 500 }}>
      <p>{description}</p>
      <Slider
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={updateValue(fieldName)}
      />
    </Card>
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
      <Row justify='center' style={{ fontSize: 20, fontWeight: 'bold' }}>
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
    </>
  );
};

const BonusConfiguration = () => (
  <>
    <PageHeader
      className={SECTION_HEADER_CLASSNAME}
      title='Bonus'
      subTitle='Configure your bonus options.'
    />
    <SliderCard
      title='Projected Growth'
      description='How much, in percentage terms, do you expect your bonus to grow yearly?'
      defaultValue={0}
      min={0}
      max={50}
      fieldName='projectedBonusGrowth'
    />
  </>
);

const BaseSalary = () => (
  <>
    <PageHeader
      className={SECTION_HEADER_CLASSNAME}
      title='Base'
      subTitle='Configure your base salary options.'
    />
    <SliderCard
      title='Projected Growth'
      description='How much, in percentage terms, do you expect your salary to grow yearly?'
      defaultValue={0}
      min={0}
      max={50}
      fieldName='projectedBaseGrowth'
    />
  </>
);

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
