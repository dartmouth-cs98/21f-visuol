// import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
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

      render() {
        const { step } = this.state;
        const {
          company, baseSalary, stocks, onus, matchPercentage,
        } = this.state;
        const values = {
          company, baseSalary, stocks, onus, matchPercentage,
        };

        switch (step) {
          case 1:
            return (
              <div>
                <CompanyDetails
                  handleChange={this.handleChange}
                  values={values}
                />
                <button type="button" onClick={this.nextStep}>Next</button>
              </div>
            );
          case 2:
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
                <button type="button" onClick={this.nextStep}>Next</button>
                <button type="button" onClick={this.prevStep}>Previous</button>
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
                <button type="button" onClick={this.prevStep}>Previous</button>
                <button type="button" onClick={this.handleSubmit}>Done</button>
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
