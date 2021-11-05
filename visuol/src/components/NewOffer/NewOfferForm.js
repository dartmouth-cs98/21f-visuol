import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { postOffer } from '../../OfferAPI.js';
import CompanyDetails from './CompanyDetails.js';
import Salary from './Salary.js';
import Stocks from './Stocks.js';
import AdditionalBenefits from './AdditionalBenefits.js';

// export default?
class NewOfferForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          step: 1,
          companyName : '',
          baseSalary: '',
          stocks: '',
          cashBonus: '',
          matchPercentage: '',
        }
      }

      prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
      }

      nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
      }



      handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
          [name]: target.value
        });
      }

      handleSubmit = () => {
        console.log(this.state);
        postOffer(this.state);
        // clear state
        // this.setState
      }

      render() {
        const { step } = this.state;
        const { companyName, baseSalary, stocks, cashBonus, matchPercentage } = this.state;
        const values = { companyName, baseSalary, stocks, cashBonus, matchPercentage }

        switch (step) {
          case 1: 
            return (
              <CompanyDetails 
              nextStep = {this.nextStep} 
              handleChange = {this.handleChange} 
              values = { values }
              />
            )
          case 2: 
            return (
              <Salary 
              nextStep = {this.nextStep} 
              prevStep = {this.prevStep}
              handleChange = {this.handleChange} 
              values = { values }
              />
            )
          case 3: 
            return (
              <Stocks 
              nextStep = {this.nextStep} 
              prevStep = {this.prevStep}
              handleChange = {this.handleChange} 
              values = { values }
              />
            )
          case 4:
            return (
              <AdditionalBenefits 
              prevStep = {this.prevStep}
              handleChange = {this.handleChange} 
              handleSubmit = {this.handleSubmit}
              values = { values }
              />
            )
          // never forget the default case, otherwise VS code would be mad!
          default: 
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
      //         <Button type="primary" htmlType="submit"  onClick={this.handleSubmit} style={{ background: "grey", borderColor: "grey" }}>
      //           Save
      //         </Button>
      //       </Form.Item>
      //     </Form>
      //     )
      // }
};

export default withRouter(NewOfferForm);
