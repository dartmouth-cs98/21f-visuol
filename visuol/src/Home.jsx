// Referenced from https://codesandbox.io/s/1l1xu?file=/index.js:190-278
import React, { PureComponent } from 'react';
import { Statistic } from 'antd';
import companyLogo from './VisuOL-logos.jpeg';

const { Countdown } = Statistic;
const deadline = new Date(2022, 3, 9);

class Home extends PureComponent {
  render() {
    return (
      <div style={{ margin: 'auto', width: '90%' }}>
        <Countdown title="Days until launch" value={deadline} format="DD:HH:mm:ss:SSS" style={{ paddingBottom: '5%' }} />
        <img src={companyLogo} alt="VisuOL" width="20%" height="20%" />
      </div>
    );
  }
}

export default Home;
