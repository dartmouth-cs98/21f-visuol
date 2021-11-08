import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import React, { PureComponent } from 'react';

export const DataTransform = (compData, baseGrowth, bonusGrowth, years) => {
  const res = [];
  const base = compData.Base;
  const bonus = compData.Bonus;
  for (let i = 0; i < years; i += 1) {
    const data = {};
    data.Year = i;
    data.Base = parseInt((base * ((1 + (baseGrowth) / 100) ** i)), 10);
    data.Bonus = parseInt(bonus * ((1 + (bonusGrowth) / 100) ** i), 10);
    data.Total = data.Base + data.Bonus;
    res.push(data);
  }
  return res;
};

const SampleChart = (props) => {
  const { data } = props;
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
      <Line type='monotone' dataKey='Base' stroke='#8884d8' label={<CustomizedLabel />} />
      <Line type='monotone' dataKey='Bonus' stroke='#82ca9d' label={<CustomizedLabel />} />
      <Line type='monotone' dataKey='Total' stroke='#cc3300' label={<CustomizedLabel />} />
      <Tooltip />
      <Legend />
    </LineChart>
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

export default SampleChart;
