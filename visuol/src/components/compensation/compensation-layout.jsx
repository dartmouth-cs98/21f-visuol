import './compensation-layout.css';

import {
  Divider,
} from 'antd';

import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
// import YearlyCompensation, { DataTransform } from './YearlyCompensationGraph';
import { YearlyCompensation, YearlySavings, DataTransform } from './Graphs';
import numberWithCommas from '../../tools/numbersWithCommas';
import CompensationHeader from './CompensationHeader';
import CompensationConfiguration from './CompensationConfiguration';
// import YearlySavings, { sampleData, calculateSavings } from './SavingsGrowth';

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
  federalTaxRate: 10,
  stateTaxRate: 2,

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
  const {
    baseSalary: base, yearlyBonus: bonus, federalTaxRate: federalTax, stateTaxRate: stateTax,
  } = compensationData;
  const totalCompensation = base + bonus;

  console.log(bonusAppreciationRate, baseAppreciationRate);
  const graphData = DataTransform({
    base, bonus, federalTax, stateTax,
  },
  baseAppreciationRate, bonusAppreciationRate, savingsPercentage, 7);
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
        spendingPercentage={spendingPercentage}
        savingsPercentage={savingsPercentage}
        retirementPercentage={retirementPercentage}
      />
      <YearlySavings
        data={graphData}
      />
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
