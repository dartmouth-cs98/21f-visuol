import React, { Component } from 'react';
import { CompBreakdown, MonthlyComp } from '../CompBreakdown';
import mock from './MockData';
import './LoadGraphs.css';

const LoadData = () => {
  const data1 = [
    { name: 'base', value: mock.base },
    { name: 'bonus', value: mock.bonus },
    { name: 'rsu', value: mock.rsu },
  ];
  const data2 = [
    {
      month: 'Januray', base: mock.base / 12, bonus: mock.bonus / 12, rsu: mock.rsu / 12,
    },
    {
      month: 'Feburary', base: mock.base / 12, bonus: mock.bonus / 12, rsu: mock.rsu / 12,
    },
    {
      month: 'March', base: mock.base / 12, bonus: mock.bonus / 12, rsu: mock.rsu / 12,
    },
  ];
  return [data1, data2];
};

class LoadGraphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: LoadData(),
    };
  }

  render() {
    const job = `${mock.company}, ${mock.role}`;
    const { data } = this.state;
    return (
      <div>
        <div className="Role">{job}</div>
        <div className="Graphs">
          <CompBreakdown data={data[0]} />
          <MonthlyComp barData={data[1]} />
        </div>
      </div>

    );
  }
}

export default LoadGraphs;
