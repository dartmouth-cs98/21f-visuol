/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
// import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import { withRouter } from 'react-router-dom';
import { postOffer } from '../../OfferAPI';
import CompanyDetails from './CompanyDetails';
import Stocks from './Stocks';
import AdditionalBenefits from './AdditionalBenefits';
import './NewOfferForm.css';

class NewOfferForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      askStocks: false,
      showStocks: false,
      askAdditionalBenefits: false,
      showAdditionalBenefits: false,
      showSubmit: false,
      company: '',
      startDate: '',
      expiration: '',
      base: '',
      bonus: '',
      matchPercentage: '',
      stocks: '',
      PTO: '',
    };
  }

      prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
      }

      nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
      }

      handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
      }

      handleSubmit = () => {
        postOffer(this.state);
        // push to new page
      }

      showStocksQuestion = () => {
        this.setState({ showStocks: true });
      }

      askAdditionalBenefitsQuestion = () => {
        this.setState({ askAdditionalBenefits: true });
      }

      showAdditionalBenefitsQuestion = () => {
        this.setState({ showAdditionalBenefits: true });
      }

      showSubmitButton = () => {
        this.setState({ showSubmit: true });
      }

      render() {
        const {
          company, askStocks, showStocks, askAdditionalBenefits,
          showAdditionalBenefits, showSubmit, baseSalary, stocks, onus, matchPercentage,
        } = this.state;
        const values = {
          company,
          askStocks,
          showStocks,
          showSubmit,
          askAdditionalBenefits,
          showAdditionalBenefits,
          baseSalary,
          stocks,
          onus,
          matchPercentage,
        };

        return (
          <div>
            <CompanyDetails handleChange={this.handleChange} values={values} />
            <h3>STOCKS</h3>
            <hr />

            <div>
              <Stocks handleChange={this.handleChange} values={values} />
            </div>

            <div>
              <h3>ADDITIONAL BENEFITS</h3>
              <hr />
              <AdditionalBenefits handleChange={this.handleChange} values={values} />

            </div>
            <div className='flex-container'>
              <Button type='button' className='yes-no-button' onClick={this.handleSubmit}>Done</Button>
            </div>
          </div>
        );
      }
}

export default withRouter(NewOfferForm);
