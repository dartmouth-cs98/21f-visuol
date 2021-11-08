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
import SampleChart, { DataTransform } from './overview-graph';

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
  const sampleData = DataTransform({ Base: 150000, Bonus: 30000 },
    baseAppreciationRate, bonusAppreciationRate, 7);
  return (
    <>
      <CompensationHeader
        totalCompensation={205000}
        position='Level 3 SWE'
        company='Snapchat'
      />
      {/* <CompensationSummary
        baseSalary={100000}
        bonus={30000}
        equity={1000}
        vestingPeriod={48}
      /> */}
      <SampleChart data={sampleData} />
      {/* <ExplorationExplaination /> */}
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

// const ExplorationExplaination = () => (
//   <PageHeader
//     className={SECTION_HEADER_CLASSNAME}
//     title='Explore Your Offer'
//     subTitle='Manipulate different aspects of your offer with the sliders below.'
//   />
// );

// const SliderCard = (props) => {
//   const {
//     title,
//     description,
//     min,
//     max,
//     defaultValue,
//     updateValue,
//     sliderColor,
//   } = props;

//   return (
//     <Card title={title} style={{ width: 500 }}>
//       <p>{description}</p>
//       <Slider
//         defaultValue={defaultValue}
//         min={min}
//         max={max}
//         onChange={updateValue}
//         trackStyle={{ backgroundColor: sliderColor }}
//         // TODO: currently box shadow (ring around handle) is still default blue.
//         // Figure out code to change this.
//         handleStyle={{ borderColor: sliderColor }}
//       />
//     </Card>
//   );
// };

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

// const CompRow = (props) => {
//   const {
//     compType,
//     compValue,
//     compTimeframe,
//     illiquid, // if the unit is not in dollars
//   } = props;

//   return (
//     <div style={{ color: 'black' }}>
//       <Row justify='center' style={{ fontSize: 20, fontWeight: 'bold', maxHeight: '75px' }}>
//         <Col flex=''>
//           {compType ? (
//             <p>
//               {compType}
//             </p>
//           ) : null}
//         </Col>
//         <Col>
//           <Divider type='vertical' />
//         </Col>
//         <Col>
//           {!illiquid ? '$' : null}
//           {compValue}
//           {compTimeframe ? ` over ${compTimeframe} months` : null}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const CompensationSummary = (props) => {
//   const {
//     baseSalary,
//     bonus,
//     equity,
//     vestingPeriod,
//   } = props;

//   return (
//     <>
//       <PageHeader
//         className={SECTION_HEADER_CLASSNAME}
//         title='Compensation Overview'
//         subTitle="Here's a quick summary of your compensation."
//       />
//       <div style={{ width: '600px' }}>
//         <CompRow
//           compType='Base Salary'
//           compValue={baseSalary}
//         />
//         <CompRow
//           compType='Bonus'
//           compValue={bonus}
//         />
//         <CompRow
//           compType='Equity'
//           compValue={equity}
//           vestingPeriod={vestingPeriod}
//           illiquid
//         />
//       </div>
//     </>
//   );
// };

const CompensationConfiguration = (props) => {
  const { updateBase, updateBonus } = props;

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Growth'
        subTitle='Add your growth expectations. Each slider represents your projected yearly growth by percentage.'
      />
      <Row gutter={[8, 8]}>
        <Col style={{ textAlign: 'right' }} span={4}>
          <h1>Base Salary</h1>
          <br />
          <h1>Yearly Bonus</h1>
          <br />
        </Col>
        <Divider type='vertical' style={{ height: 'auto' }} span={6} />
        <Col>
          <h1>$150,000</h1>
          <br />
          <h1>$30,000</h1>
        </Col>
        <Col span={10}>
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBase}
            sliderColor={baseColor}
          />
          <br />
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBonus}
            sliderColor={bonusColor}
          />
        </Col>
      </Row>
    </>
  );
};

export default withRouter(CompensationLayout);
