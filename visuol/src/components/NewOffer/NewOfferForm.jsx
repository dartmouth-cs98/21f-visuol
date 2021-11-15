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
        const { step } = this.state;
        const {
          company, askStocks, showStocks, askAdditionalBenefits,
          showAdditionalBenefits, showSubmit, baseSalary, stocks, bonus, matchPercentage,
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
          bonus,
          matchPercentage,
        };

        switch (step) {
          case 1:
            return (
              <div>
                <CompanyDetails handleChange={this.handleChange} values={values} />
                {/* Change to equity */}
                <h3>STOCKS</h3>
                <hr />
                <h2>Does your company offer stocks?</h2>
                <div className='flex-container'>
                  <Button className='yes-no-button' onClick={this.showStocksQuestion}> Yes </Button>
                  <Button className='yes-no-button' onClick={this.askAdditionalBenefitsQuestion}>No </Button>
                </div>

                {showStocks
                && (
                  <div>
                    <Stocks handleChange={this.handleChange} values={values} />
                    <h3>CASH BONUS</h3>
                    <hr />
                    <h2>Does your company offer a cash bonus?</h2>
                    <div className='flex-container'>
                      <Button className='yes-no-button' onClick={this.showAdditionalBenefitsQuestion}> Yes </Button>
                      <Button className='yes-no-button'> No </Button>
                    </div>
                  </div>
                )}
                {askAdditionalBenefits
                && (
                  <div>
                    <h3>CASH BONUS</h3>
                    <hr />
                    <h2>Does your company offer a cash bonus?</h2>
                    <div className='flex-container'>
                      <Button className='yes-no-button' onClick={this.showAdditionalBenefitsQuestion}> Yes </Button>
                      <Button className='yes-no-button' onClick={this.showSubmitButton}> No </Button>
                    </div>
                  </div>
                )}
                {showAdditionalBenefits
                && (
                  <div>
                    <h3>ADDITIONAL BENEFITS</h3>
                    <hr />
                    <AdditionalBenefits handleChange={this.handleChange} values={values} />
                    <button type='button' className='yes-no-button' onClick={this.handleSubmit}>Done</button>

                  </div>
                )}
                {showSubmit
                && (
                  <button type='button' className='yes-no-button' onClick={this.handleSubmit}>Done</button>
                )}
                {/* <button type="button" onClick={this.nextStep}>Next</button> */}
              </div>
            );
          case 2:
            return (
              <div>
                <CompanyDetails
                  handleChange={this.handleChange}
                  values={values}
                />
                <button type='button' onClick={this.nextStep}>Next</button>
                <button type='button' onClick={this.prevStep}>Previous</button>
              </div>
            );
          case 3:
            return (
              <div>
                <CompanyDetails
                  handleChange={this.handleChange}
                  values={values}
                />
                <Stocks
                  handleChange={this.handleChange}
                  values={values}
                />
                <AdditionalBenefits
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  values={values}
                />
                <button type='button' onClick={this.prevStep}>Previous</button>
                <button type='button' onClick={this.handleSubmit}>Done</button>
              </div>
            );
          default:
            return (
              <div />
            );
        }
      }
}

export default withRouter(NewOfferForm);
