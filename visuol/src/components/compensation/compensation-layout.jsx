import './compensation-layout.css';

import {
  Divider,
} from 'antd';

import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import YearlyCompensation, { DataTransform } from './YearlyCompensationGraph';
import numberWithCommas from '../../tools/numbersWithCommas';
import CompensationHeader from './CompensationHeader';
import CompensationConfiguration from './CompensationConfiguration';

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
      <YearlyCompensation
        data={graphData}
        baseColor={baseColor}
        bonusColor={bonusColor}
      />
      <Divider />
      <CompensationConfiguration
        base={base}
        bonus={bonus}
        updateBaseRate={updateValue(setBaseAppreciationRate)}
        updateBonusRate={updateValue(setBonusAppreciationRate)}
        baseColor={baseColor}
        bonusColor={bonusColor}
      />
    </>
  );
};

export default withRouter(CompensationLayout);
