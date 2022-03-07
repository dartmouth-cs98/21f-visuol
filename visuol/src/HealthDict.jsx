/* eslint-disable react/button-has-type */
import React, { PureComponent } from 'react';
// Referenced from https://codesandbox.io/s/1l1xu?file=/index.js:190-278

import 'antd/dist/antd.css';
import './index.css';

import { Collapse, Typography, Divider } from 'antd';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

class Health extends PureComponent {
  render() {
    return (
      <div style={{ margin: 'auto', width: '90%' }}>
        <Typography>
          <Title>Employer-Sponsored Health Insurance</Title>
          <Divider />
          <Paragraph>
            Not all employers off employer-sponsored health insurance,
            aka &apos;group plans&apos;.
            Employers choose the plans and determine what it covers, with both employers and
            employees sharing the cost of health insurance premiums.
            One tax-advantage of group plans is that employee contriubtions can be made pre-tax.
            It is mandatory in the United States for businesses with more than 50 employees to offer
            employer-sponsored health insurance so all medium to large employers should offer
            Employer-Sponsored Health Insurance.
          </Paragraph>

          <Paragraph>
            <Text strong>
              Typically, large employers will offer their employees a variety
              of plans to choose from which vary in their cost to the employee and coverage.
            </Text>
          </Paragraph>
          <Title level={3}>Key Terms</Title>
          <Divider />
          <Collapse>
            <Panel header='Premiums' key='1'>
              <Paragraph>
                Monthly payments an employee or other insured party has to make
                to maintain the healthcare plan. By definition, the total premium
                of the health care coverage will be shared
                by both the employer and employee in an employer-sponsored plan.
                Employers will typically only quote the amount that the employee has to contribute
                as the premium.

              </Paragraph>
            </Panel>
            <Panel header='Deductible' key='2'>
              <Paragraph>
                A fixed dollar amount during the benefit period, usually a year, that an
                insured person pays before the insurer starts to make payments for covered medical
                services. Plans may have both per individual and family deductibles.

                <ul>
                  <li>
                    {' '}
                    Some plans may have separate deductibles for specific services. For example,
                    a plan may have a hospitalization deductible per admission.

                  </li>
                  <li>
                    Deductibles may differ if services are received from an approved provider or if
                    received from providers not on the approved list.
                  </li>
                </ul>
              </Paragraph>
            </Panel>
            <Panel header='Copayment' key='3'>
              <Paragraph>
                A form of medical cost sharing in a health insurance plan that requires an
                insured person to pay a fixed dollar amount when a medical service is received. The
                insurer is responsible for the rest of the reimbursement.

                <ul>
                  <li>
                    There may be separate copayments for different services.
                  </li>
                  <li>
                    Some plans require that a deductible first be met for some specific services
                  </li>
                </ul>
              </Paragraph>
            </Panel>
            <Panel header='Savings Accounts' key='4'>
              <Paragraph>
                Accounts offered and administered by employers that provide a way for employees
                to set aside, out of their paycheck, pretax dollars to pay for the employee’s
                share of qualified medical expenses not covered by the employer’s health plan.
                There are two main types of spending accounts, Flexible Spending Accounts (FSA)
                and Health Savings Accounts (HSA).

                <ul>
                  <li>
                    <Text strong>Flexible Spending Account (FSA): </Text>
                    Typically, funds must be used within the given benefit year or the employee
                    loses the money. The employer may also make contriubtions.
                  </li>
                  <li>
                    <Text strong>Health Savings Account (HSA): </Text>
                    Typically, funds will roll over year after year. Sometimes, HSAs can also
                    offer investment options so that the saved funds can grow. The employer may
                    also make contributions. HSAs are only offered alongside
                    <Text strong> High-Deductible Health Plans (HDHP) </Text>
                    a term for insurance plans that have higher deductibles
                    in-exchange for lower premiums.
                  </li>
                </ul>
              </Paragraph>
            </Panel>
          </Collapse>
          <Title level={3}>Types of Plans</Title>
          <Divider />
          <Collapse>
            <Panel header='Health Maintenance Organization (HMO) Plan' key='1'>
              <Paragraph>
                HMO plans are a unique type of health care system that help bring down the cost of
                individual plans by limiting the insured to using affiliated
                (&apos;in-network&apos;) doctors
                that are typically local to a certain geography.

              </Paragraph>
              <Paragraph>
                Typically, members of an HMO must select an in-network doctor as a primary care
                physician (PCP), whom they see for regular checkups. The PCP must give the
                insured a referral before they can see another in-network specialist.
              </Paragraph>
              <Paragraph>
                Naturally, this type of plan limits the geographic reach of the healthcare.
                As a result, HMO plans typically have low premiums and deductibles, and fixed
                copays for doctor visits.
              </Paragraph>
            </Panel>
            <Panel header='Exclusive Provider Organization (EPO) Plan' key='2'>
              <Paragraph>
                EPO plans resemble HMO plans in structure and terms but are ran under
                larger national healthcare networks. Like HMO plans, EPO plans require
                the insured party to use in-network doctors.
              </Paragraph>
              <Paragraph>
                Typically, members of an EPO must also select an in-network doctor as a
                primary care physician (PCP), whom they see for regular checkups. They
                may or may not requrie referrals from a PCP to see another in-network
                specialist.
              </Paragraph>
              <Paragraph>
                The benefit of an EPO plan over HMO is that the networks are typically
                larger and are not limited by geographic area. As a result, EPO plans have
                a higher associated premium than comparable HMO plans.
              </Paragraph>
            </Panel>
            <Panel header='Preferred Provider Organization (PPO) Plan' key='3'>
              <Paragraph>
                PPO plans can be thought of as the more flexible version of an EPO plan.
                Like an EPO plan, you are still tied to a national network of doctors.
                However, you have the ability to see specialists and out-of-network doctors
                without a referral. You typically will have a lower copay and deductible for
                in-network doctors.
              </Paragraph>
              <Paragraph>
                PPO plans offer the most flexbility but typically have higher premiums as
                a result.
              </Paragraph>
            </Panel>
            <Panel header='Point-of-service (POS) Plans' key='4'>
              <Paragraph>
                POS plans are a sort of hybrid of HMO and PPO plans. They’re typically
                offered by HMO networks and are nearly identical to traditional HMO plans
                when it comes to in-network care. That means the insured still have to
                designate a PCP that typically still refers them to specialists. However,
                POS plans offer the insured the ability to see out-of-network doctors
                although they will have to pay more.
              </Paragraph>
              <Paragraph>
                Coverage for out-of-network doctors can also come in the form of
                reimbursement rather than immediate coverage with copay.
              </Paragraph>
            </Panel>
          </Collapse>
        </Typography>

      </div>
    );
  }
}

export default Health;
