import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export const sampleData = [{
  Year: 0,
  'Total Compensation': 100000,
  'Federal Tax Rate': 10,
  'State Tax Rate': 10,
},
{
  Year: 1,
  'Total Compensation': 200000,
  'Federal Tax Rate': 10,
  'State Tax Rate': 10,
}];

export const calculateSavings = (data, savingsPercentage) => {
  let lastSavings = 0;
  const res = data.map((yearData) => {
    const newMap = {};
    newMap.Year = yearData.Year;
    newMap.PostTaxCompensation = yearData['Total Compensation'] * ((100
      - yearData['Federal Tax Rate'] - yearData['State Tax Rate']) / 100);
    lastSavings += newMap.PostTaxCompensation * (savingsPercentage / 100);
    newMap.Savings = lastSavings;
    return newMap;
  });

  return res;
};

const YearlySavings = (props) => {
  const { data } = props;
  return (
    <AreaChart
      width={730}
      height={500}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='Year' />
      <YAxis />
      <Tooltip />
      <Area type='monotone' dataKey='Savings' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
      <Area type='monotone' dataKey='PostTaxCompensation' stackId='1' stroke='#8884d8' fill='#8884d8' />
    </AreaChart>
  );
};

export default YearlySavings;
