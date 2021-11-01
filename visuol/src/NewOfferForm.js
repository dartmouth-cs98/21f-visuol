import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

class NewOfferForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          companyName : '',
          baseSalary: '',
          stocks: '',
          cashBonus: '',
          matchPercentage: '',
        }
      }



      handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        console.log(name);
        console.log(event.target.value);


        this.setState({
          [name]: target.value
        });
      }

      handleSubmit = () => {
        // make API call
        // clear state
      }


      render() {
          return (
            <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: 'Please input the company name!',
                },
              ]}
            >
              <Input name="companyName" onChange={this.handleInputChange} />
            </Form.Item>
    
            <Form.Item
              label="Base salary"
              name="baseSalary"
              rules={[
                {
                  required: true,
                  message: 'Please add the base salary!',
                },
              ]}
            >                    
              <Input name="baseSalary" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
              {/* <Switch checkedChildren="Yearly" unCheckedChildren="Hourly" defaultChecked /> */}
            </Form.Item>

            <Form.Item
              label="Stocks"
              name="stocks"
            >                    
              <Input name="stocks" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
            </Form.Item>

            <Form.Item
              label="Cash Bonus"
              name="cashBonus"
            >                    
              <Input name="cashBonus" onChange={this.handleInputChange} prefix="$" suffix="USD"/>
            </Form.Item>

            <Form.Item
              label="401K Match Percentage"
              name="matchPercentage"
            >                    
              <Input name="matchPercentage" onChange={this.handleInputChange} prefix="%"/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit"  onClick={this.handleSubmit} style={{ background: "grey", borderColor: "grey" }}>
                Save
              </Button>
            </Form.Item>
          </Form>
          )
      }
};

export default withRouter(NewOfferForm);
