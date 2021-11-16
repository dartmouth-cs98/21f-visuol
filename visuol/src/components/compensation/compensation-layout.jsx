/* eslint-disable no-unused-vars */
import {
  Divider,
  Button,
  Row,
} from 'antd';

import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../OfferAPI';
import { YearlyCompensation, YearlySavings, DataTransform } from './Graphs';
import numberWithCommas from '../../tools/numbersWithCommas';
import CompensationHeader from './CompensationHeader';
import CompensationConfiguration from './CompensationConfiguration';

const baseColor = '#9696CE';
const bonusColor = '#81DDB0';
const spendingColor = '#9881dd';
const savingsColor = '#cece96';
const retirementColor = '#dda481';
// const equityColor = '#DDC981';

// TODO: connect to api
const fetchCompensationData = async (id, company, setters) => {
  const token = localStorage.getItem('token');
  console.log('fetching');
  const resp = await axios.post(`${BASE_URL}api_v1/fetch_offer`, {
    id,
    company,
  }, {
    headers: { Authorization: token },
  });

  const {
    base,
    bonus,
  } = resp.data;
  const signing = 0;

  const taxResp = await axios.post(`${BASE_URL}api_v1/fed_taxes`, {
    married: 'not-married',
    income: base + bonus,
  }, {
    headers: { Authorization: token },
  });

  const fedTaxRate = taxResp.data.fed_tax_percent;

  const {
    setBase,
    setBonus,
    setSigning,
    setFederalTaxRate,
    setStateTaxRate,
  } = setters;

  setBase(base != null ? base : 0);
  setBonus(bonus != null ? bonus : 0);
  setSigning(0);
  setFederalTaxRate(fedTaxRate);
  setStateTaxRate(0);
};

const updateComplimentary = (updateSpendingPercentage,
  updateSavingsPercentage) => (savingsValue) => {
  updateSpendingPercentage(100 - savingsValue);
  updateSavingsPercentage(savingsValue);
};

const CompensationLayout = (props) => {
  const { match } = props;
  const { id, company } = match.params;

  const [base, setBase] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [signing, setSigning] = useState(0);
  const [federalTax, setFederalTaxRate] = useState(0);
  const [stateTax, setStateTaxRate] = useState(0); // Not currently using

  const [bonusAppreciationRate, setBonusAppreciationRate] = useState(0);
  const [baseAppreciationRate, setBaseAppreciationRate] = useState(0);
  const [spendingPercentage, setSpendingPercentage] = useState(60);
  const [savingsPercentage, setSavingsPercentage] = useState(30);
  const [retirementPercentage, setRetirementPercentage] = useState(4);

  // used to record which graph to show
  const [showCompensation, setShowCompenstaion] = useState(true);

  fetchCompensationData(id, company, {
    setBase, setBonus, setSigning, setFederalTaxRate, setStateTaxRate,
  });

  const updateValue = (setter) => (value) => {
    setter(value);
  };

  const totalCompensation = base + bonus;

  console.log(bonusAppreciationRate, baseAppreciationRate);
  const graphData = DataTransform({
    base, bonus, federalTax, stateTax,
  },
  baseAppreciationRate, bonusAppreciationRate, savingsPercentage, retirementPercentage, 7);
  return (
    <>
      <CompensationHeader
        totalCompensation={numberWithCommas(totalCompensation)}
        position='' // CURRENTLY DO NOT HAVE POSITION DATA
        company={company}
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
      <div style={{
        position: 'sticky', // TODO: NEED TO ADD TOGGLE BEFORE WE MAKE THIS STICKY
        bottom: 0,
        opacity: 1,
        zIndex: 5000, // arbitrary high value
        backgroundColor: '#F0F2F5',
      }}
      >
        <Row justify='start'>
          {showCompensation ? (
            <YearlyCompensation
              data={graphData}
              baseColor={baseColor}
              bonusColor={bonusColor}
              spendingPercentage={spendingPercentage}
              savingsPercentage={savingsPercentage}
              retirementPercentage={retirementPercentage}
            />
          ) : (
            <YearlySavings
              data={graphData}
              spendingColor={spendingColor}
              savingsColor={savingsColor}
              retirementColor={retirementColor}
            />
          )}
          <Button
            onClick={() => {
              setShowCompenstaion(!showCompensation);
            }}
          >
            {showCompensation ? 'Show Savings Graph' : 'Show Compensation Graph'}

          </Button>
        </Row>

      </div>

    </>
  );
};

export default withRouter(CompensationLayout);
