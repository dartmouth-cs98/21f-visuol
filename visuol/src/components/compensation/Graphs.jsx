import {
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from 'recharts';
import React, { PureComponent } from 'react';

// We look at total compensation through the following funnel, Start with Total Compensation,
// Subtract out amount intended for retirement savings (currently we assume this is out of the
// untaxed but this is not necessarily the case), then take out taxes, then from that remaining
// amount, we get spend vs savings. Savings are computed as a savings percentage of post tax
// post retirement money
export const DataTransform = (compData, baseGrowth,
  bonusGrowth, savingsPercentage, retirementSavingsPercentage, years) => {
  const res = [];
  let pastSavings = 0;
  let pastCompensation = 0;
  let pastTaxes = 0;
  let nonSavings = 0;
  let retirementSavings = 0;
  const {
    base, bonus, federalTax, stateTax,
  } = compData;
  for (let i = 0; i < years; i += 1) {
    const data = {};
    // Basic Data
    data.Year = i;
    data.Base = Math.round((base * ((1 + (baseGrowth) / 100) ** i)));
    data.Bonus = Math.round(bonus * ((1 + (bonusGrowth) / 100) ** i));
    data.Total = data.Base + data.Bonus;
    // Calculating Tax and Post Tax Compensation
    data.Tax = data.Total * ((federalTax + stateTax) / 100);
    data.PostTaxCompensation = data.Total - data.Tax;
    // Update accumulated variables
    pastCompensation += data.Total;
    data.TotalAccumulatedCompensation = pastCompensation;
    const retirementSavingsDollars = data.Total * (retirementSavingsPercentage / 100);
    retirementSavings += retirementSavingsDollars;
    data.RetirementSavings = Math.round(retirementSavings);
    pastTaxes += Math.round(data.Tax);
    data.TotalPaidInTaxes = pastTaxes;
    const savingsDollars = (data.PostTaxCompensation - retirementSavingsDollars)
      * (savingsPercentage / 100);
    pastSavings += savingsDollars;
    data.Savings = Math.round(pastSavings);
    nonSavings += data.PostTaxCompensation - retirementSavingsDollars
      - savingsDollars;
    data.Spending = Math.round(nonSavings);
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
      <Tooltip content={<CustomTooltipCompensation />} />
      <Legend />
    </LineChart>
  );
};
// TODO: Update Tooltips
export const YearlySavings = (props) => {
  const {
    data, savingsColor, retirementColor, spendingColor,
  } = props;
  return (
    <ComposedChart
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
      <Tooltip content={<CustomTooltipSavings />} />
      <Line type='monotone' dataKey='TotalAccumulatedCompensation' stroke='#82ca9d' fill='#82ca9d' />
      <Area type='monotone' dataKey='TotalPaidInTaxes' stackId='1' stroke='#8884d8' fill='#8884d8' />
      <Area type='monotone' dataKey='Savings' stackId='1' stroke={savingsColor} fill={savingsColor} />
      <Area type='monotone' dataKey='RetirementSavings' stackId='1' stroke={retirementColor} fill={retirementColor} />
      <Area type='monotone' dataKey='Spending' stackId='1' stroke={spendingColor} fill={spendingColor} />
    </ComposedChart>
  );
};
const CustomTooltipCompensation = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='tooltip'>
        <p className='label'>{`Year ${label}`}</p>
        <p className={payload[0].name}>{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className={payload[1].name}>{`${payload[1].name} : ${payload[1].value}`}</p>
        <p className={payload[2].name}>{`${payload[2].name} : ${payload[2].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipSavings = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='tooltip'>
        <p className='label'>{`Year ${label}`}</p>
        <p className={payload[0].name}>{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className={payload[1].name}>{`${payload[1].name} : ${payload[1].value}`}</p>
        <p className={payload[2].name}>{`${payload[2].name} : ${payload[2].value}`}</p>
        <p className={payload[3].name}>{`${payload[3].name} : ${payload[3].value}`}</p>
        <p className={payload[4].name}>{`${payload[4].name} : ${payload[4].value}`}</p>
      </div>
    );
  }
  return null;
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
