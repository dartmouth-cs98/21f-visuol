/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
// import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import axios from 'axios';

import { withRouter } from 'react-router-dom';
import CompanyDetails from './CompanyDetails';
import Stocks from './Stocks';
import AdditionalBenefits from './AdditionalBenefits';
import './NewOfferForm.css';
import { myAccount, BASE_URL } from '../../OfferAPI';

class NewOfferForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiterCompany: '',
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
      hours: '',
      weeks: '',
      state: 'Alabama',
    };
  }

  componentDidMount() {
    myAccount()
      .then((response) => {
        this.setState({
          recruiterCompany: response,
        });
      });
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
        if (input !== 'total') {
          this.setState({ [input]: e.target.value });
        } else {
          this.setState({ base: this.state.base * this.state.weeks * this.state.hours });
        }
      }

      handleSubmit = () => {
        this.postOffer(this.state);
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

      // Calls the backend api to post the offer in the database
      postOffer = (offer) => {
        const data = Object.assign(offer);
        data.base = Number.parseInt(offer.base, 10);
        data.bonus = Number.parseInt(offer.bonus, 10);
        data.matchPercentage = Number.parseInt(offer.matchPercentage, 10);
        data.stocks = Number.parseInt(offer.stocks, 10);
        data.PTO = Number.parseInt(offer.PTO, 10);
        data.state = offer.state;
        const tokenString = localStorage.getItem('token');
        const headers = {
          Authorization: tokenString,
          // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        };

        console.log('createOfferData', data);
        axios.post(`${BASE_URL}api_v1/create_offer`, offer, {
          headers,
        })
          .then((response) => {
            console.log('submitted', response);
            if (response.data.id) {
              const { history, match } = this.props;
              // eslint-disable-next-line react/destructuring-assignment
              history.push(`${match.url.substring(0, match.url.lastIndexOf('/') + 1)}LoadGraphs/${this.state.company}/${response.data.id}`);
              window.location.reload();
            }
            return response;
          });
      }

      render() {
        const {
          recruiterCompany, company, askStocks, showStocks, askAdditionalBenefits,
          showAdditionalBenefits, showSubmit, baseSalary, stocks, bonus, matchPercentage, state,
        } = this.state;
        const values = {
          recruiterCompany,
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
          state,
        };

        return (
          <div>
            <CompanyDetails handleChange={this.handleChange} values={values} />
            <h3>STOCKS</h3>
            <hr width='10%' align='left' />

            <div>
              <Stocks handleChange={this.handleChange} values={values} />
            </div>

            <div>
              <h3>ADDITIONAL BENEFITS</h3>
              <hr width='10%' align='left' />
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
