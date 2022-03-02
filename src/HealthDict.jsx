/* eslint-disable react/button-has-type */
import React, { PureComponent } from 'react';
// Referenced from https://codesandbox.io/s/1l1xu?file=/index.js:190-278

import 'antd/dist/antd.css';
import './index.css';

import { Collapse } from 'antd';

const { Panel } = Collapse;

class Health extends PureComponent {
  render() {
    return (
      <div style={{ margin: 'auto', width: '90%' }}>
        <Collapse>
          <Panel header='What is a deductible?' key='1'>
            <p>The amount you must spend for health care before insurance begins to cover it</p>
          </Panel>
          <Panel header='What is copay?' key='2'>
            <p>The fixed amount you pay for a health service</p>
          </Panel>
          <Panel header='What is flex spending?' key='3'>
            <p>A tax-free account you can put aside from your wages to spend on health care</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Health;
