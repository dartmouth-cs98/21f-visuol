/* eslint-disable max-len */
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
          <Panel header='What can I do with my offers?' key='2'>
            <p>Using the sliders, you can view how your compensation would grow over time given different growth rates. You can also see how much you would have saved in accumulations over time.</p>
          </Panel>
          <Panel header='Why are there no local taxes?' key='3'>
            <p>Because there are very few cities that charge local income taxes, and they make up such a small percentage of your total compensation, we deemed it unneccesary to include</p>
          </Panel>
          <Panel header='What does comparing offers do?' key='4'>
            <p>You can display two offers side by side to compare how savings or compensation differ</p>
          </Panel>
        </Collapse>
        <Countdown title='Days until launch' value={deadline} format='DD:HH:mm:ss:SSS' style={{ paddingBottom: '5%' }} />
        <img src={companyLogo} alt='VisuOL' width='20%' height='20%' />
      </div>
    );
  }
}

export default Home;
