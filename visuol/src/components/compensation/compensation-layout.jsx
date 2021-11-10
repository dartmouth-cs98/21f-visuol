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
// const spendingColor = '#9881dd';
const savingsColor = '#cece96';
const retirementColor = '#dda481';
// const equityColor = '#DDC981';

// TODO: connect to api
const fetchCompensationData = () => ({
  baseSalary: 100000,
  yearlyBonus: 25000,
  signing: 50000,

});

const updateComplimentary = (updateSpendingPercentage,
  updateSavingsPercentage) => (savingsValue) => {
  updateSpendingPercentage(100 - savingsValue);
  updateSavingsPercentage(savingsValue);
};

const CompensationLayout = () => {
  const [bonusAppreciationRate, setBonusAppreciationRate] = useState(0);
  const [baseAppreciationRate, setBaseAppreciationRate] = useState(0);
  const [spendingPercentage, setSpendingPercentage] = useState(60);
  const [savingsPercentage, setSavingsPercentage] = useState(30);
  const [retirementPercentage, setRetirementPercentage] = useState(50);
  // const [investmentPercentage, setInvestmentPercentage] = useState(10);

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
      <div style={{
        position: 'sticky',
        top: 0,
        opacity: 1,
        zIndex: 5000, // arbitrary high value
        backgroundColor: '#F0F2F5',
      }}
      >
        <YearlyCompensation
          data={graphData}
          baseColor={baseColor}
          bonusColor={bonusColor}
          spendingPercentage={spendingPercentage}
          savingsPercentage={savingsPercentage}
          retirementPercentage={retirementPercentage}
        />
      </div>
      <Divider />
      <CompensationConfiguration
        base={base}
        bonus={bonus}
        savingsPercentage={savingsPercentage}
        retirementPercentage={retirementPercentage}
        updateBaseRate={updateValue(setBaseAppreciationRate)}
        updateBonusRate={updateValue(setBonusAppreciationRate)}
        updateSavingsPercentage={updateComplimentary(setSpendingPercentage, setSavingsPercentage)}
        updateRetirementPercentage={updateValue(setRetirementPercentage)}
        baseColor={baseColor}
        bonusColor={bonusColor}
        savingsColor={savingsColor}
        retirementColor={retirementColor}
      />
    </>
  );
};

export default withRouter(CompensationLayout);
