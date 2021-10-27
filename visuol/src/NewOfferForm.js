import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

class NewOfferForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          companyName : '',
        }
      }

        onInputChange = (event) => {
            this.setState({ companyName: event.target.value });
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
              name="companyname"
              rules={[
                {
                  required: true,
                  message: 'Please input the company name!',
                },
              ]}
            >
                {/* change to on submit */}
              <Input onChange={this.onInputChange} value={this.state.companyName} />
            </Form.Item>
    
            <Form.Item
              label="Base salary"
              name="Base salary"
              rules={[
                {
                  required: true,
                  message: 'Please add the base salary!',
                },
              ]}
            >                    
              <Input prefix="$" suffix="USD"/>
              {/* <Switch checkedChildren="Yearly" unCheckedChildren="Hourly" defaultChecked /> */}
            </Form.Item>

            <Form.Item
              label="Stocks"
              name="Stocks"
            >                    
              <Input prefix="$" suffix="USD"/>
              {/* <Switch checkedChildren="RSU" unCheckedChildren="Stock Options" defaultChecked /> */}
            </Form.Item>

            <Form.Item
              label="Cash Bonus"
              name="Cash Bonus"
            >                    
              <Input prefix="$" suffix="USD"/>
              {/* <Switch checkedChildren="RSU" unCheckedChildren="Stock Options" defaultChecked /> */}
            </Form.Item>

            <Form.Item
              label="401K Match Percentage"
              name="401K Match Percentage"
            >                    
              <Input prefix="%"/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit" style={{ background: "grey", borderColor: "grey" }}>
                Save
              </Button>
            </Form.Item>
          </Form>
          )
      }
};

export default withRouter(NewOfferForm);
