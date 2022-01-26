/* eslint-disable react/button-has-type */
import React, { PureComponent } from 'react';
// Referenced from https://codesandbox.io/s/1l1xu?file=/index.js:190-278

import 'antd/dist/antd.css';
import './index.css';

import { Statistic, Collapse } from 'antd';

import companyLogo from './VisuOL-logos.jpeg';

const { Panel } = Collapse;

const { Countdown } = Statistic;
const deadline = new Date(2022, 3, 9);
class Home extends PureComponent {
  render() {
    return (
      <div style={{ margin: 'auto', width: '90%' }}>
        <Collapse>
          <Panel header='How do I get started?' key='1'>
            <p>Make an account using register, then log in.</p>
            <p>Recruiters can send offers to candidates as well as view outstanding offers.</p>
            <p>Candidates can interact with their offers to see how compensation grows.</p>
          </Panel>
        </Collapse>
        <Countdown title='Days until launch' value={deadline} format='DD:HH:mm:ss:SSS' style={{ paddingBottom: '5%' }} />
        <img src={companyLogo} alt='VisuOL' width='20%' height='20%' />
      </div>
    );
  }
}

export default Home;
