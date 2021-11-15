// import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { postOffer } from '../../OfferAPI';
import CompanyDetails from './CompanyDetails';
import Stocks from './Stocks';
import AdditionalBenefits from './AdditionalBenefits';
import './NewOfferForm.css';

// export default?
class NewOfferForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      companyName: '',
      baseSalary: '',
      stocks: '',
      cashBonus: '',
      matchPercentage: '',
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
        // console.log(this.state);
        postOffer(this.state);
        // clear state
        // this.setState
      }

      render() {
        const { step } = this.state;
        const {
          companyName, baseSalary, stocks, cashBonus, matchPercentage,
        } = this.state;
        const values = {
          companyName, baseSalary, stocks, cashBonus, matchPercentage,
        };

        switch (step) {
          case 1:
            return (
              <div>
                <CompanyDetails
                  handleChange={this.handleChange}
                  values={values}
                />
                <button type='button' onClick={this.nextStep}>Next</button>
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
             // do nothing
        }
      }

  // render() {
  //     return (
  //       <Form
  //       name="basic"
  //       labelCol={{
  //         span: 8,
  //       }}
  //       wrapperCol={{
  //         span: 10,
  //       }}
  //       initialValues={{
  //         remember: true,
  //       }}
  //       onFinish={this.onFinish}
  //       onFinishFailed={this.onFinishFailed}
  //       autoComplete="off"
  //     >
  //       <Form.Item
  //         label="Company Name"
  //         name="companyName"
  //         rules={[
  //           {
  //             required: true,
  //             message: 'Please input the company name!',
  //           },
  //         ]}
  //       >
  //         <Input name="companyName" onChange={this.handleInputChange} />
  //       </Form.Item>

  //       <Form.Item
  //         label="Base salary"
  //         name="baseSalary"
  //         rules={[
  //           {
  //             required: true,
  //             message: 'Please add the base salary!',
  //           },
  //         ]}
  //       >
  //         <Input name="baseSalary" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
  //         {/* <Switch checkedChildren="Yearly" unCheckedChildren="Hourly" defaultChecked /> */}
  //       </Form.Item>

  //       <Form.Item
  //         label="Stocks"
  //         name="stocks"
  //       >
  //         <Input name="stocks" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
  //       </Form.Item>

  //       <Form.Item
  //         label="Cash Bonus"
  //         name="cashBonus"
  //       >
  //         <Input name="cashBonus" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
  //       </Form.Item>

  //       <Form.Item
  //         label="401K Match Percentage"
  //         name="matchPercentage"
  //       >
  //         <Input name="matchPercentage" onChange={this.handleInputChange} prefix="%"/>
  //       </Form.Item>

  //       <Form.Item
  //         wrapperCol={{
  //           offset: 12,
  //           span: 10,
  //         }}
  //       >
  //         <Button type="primary" htmlType="submit"  onClick={this.handleSubmit}
  // style={{ background: "grey", borderColor: "grey" }}>
  //           Save
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //     )
  // }
}

export default withRouter(NewOfferForm);
