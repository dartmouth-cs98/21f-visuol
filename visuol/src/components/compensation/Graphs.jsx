import {
  AreaChart, Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import React, { PureComponent } from 'react';

export const DataTransform = (compData, baseGrowth, bonusGrowth, savingsPercentage, years) => {
  const res = [];
  let pastSavings = 0;
  const {
    base, bonus, federalTax, stateTax,
  } = compData;
  for (let i = 0; i < years; i += 1) {
    const data = {};
    data.Year = i;
    data.Base = Math.round((base * ((1 + (baseGrowth) / 100) ** i)));
    data.Bonus = Math.round(bonus * ((1 + (bonusGrowth) / 100) ** i));
    data.Total = data.Base + data.Bonus;
    data.PostTaxCompensation = Math.round(data.Total * ((100
        - federalTax - stateTax) / 100));
    pastSavings += data.PostTaxCompensation * (savingsPercentage / 100);
    data.Savings = Math.round(pastSavings);
    res.push(data);
  }
  return res;
};

export const YearlyCompensation = (props) => {
  const { data, baseColor, bonusColor } = props;
  return (
    <LineChart
      width={730}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='Year' height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Line type='monotone' dataKey='Base' stroke={baseColor} label={<CustomizedLabel />} />
      <Line type='monotone' dataKey='Bonus' stroke={bonusColor} label={<CustomizedLabel />} />
      <Line type='monotone' dataKey='Total' stroke='#cc3300' label={<CustomizedLabel />} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export const YearlySavings = (props) => {
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
      <XAxis dataKey='Year' height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Area type='monotone' dataKey='Savings' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
      <Area type='monotone' dataKey='PostTaxCompensation' stackId='1' stroke='#8884d8' fill='#8884d8' />
    </AreaChart>
  );
};

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor='middle'>
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor='end' fill='#666' transform='rotate(0)'>
          {`Year ${payload.value}`}
        </text>
      </g>
    );
  }
}
