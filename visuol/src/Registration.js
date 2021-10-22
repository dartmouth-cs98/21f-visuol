//Credit to https://ant.design/components/form/
//Component for logging in
import { Form, Input, Button, Switch} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCompanyForm : false,
    }
  }

  
  //OnFinish dictates what happens when submitting a form object
  onFinish = (values) => {
    console.log('Success:', values);
    console.log('Company?', this.state.displayCompanyForm);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onClickSwitch = () => {
    this.setState((state) => {
      return {displayCompanyForm: !state.displayCompanyForm};
    });
  };

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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your full name (First and last)',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your desired username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Company Account" valuePropName="checked">
          <Switch onClick={this.onClickSwitch}/>
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="company"
          rules={[
            {
              required: this.state.displayCompanyForm,
              message: 'Please input your company name',
            },
          ]}
        >
          <Input disabled={!this.state.displayCompanyForm} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default Registration;