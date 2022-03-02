// Credit to https://ant.design/components/form/
// Component for logging in
import {
  Form, Input, Button, notification, Radio,
} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import { BASE_URL } from './OfferAPI';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyRegistration: false,
    };
  }

  // OnFinish dictates what happens when submitting a form object
  finishRegistration = () => { // (response) => {
    const { history, match } = this.props;
    console.log('Success!');
    history.push(`${match.url.substring(0, match.url.lastIndexOf('/') + 1)}login`);
  }

  // OnFinish dictates what happens when submitting a form object
  onFinish = (values) => {
    const { companyRegistration } = this.state;

    const info = {
      name: values.name,
      email: values.email,
      password: values.password,
      company: (companyRegistration) ? values.company : null,
    };
    axios.post(`${BASE_URL}api_v1/register_user`, info).then((response) => {
      console.log(response);
      if (response.data && response.data.status === 'success') {
        this.finishRegistration(response);
      } else if (response.data) {
        notification.open({
          message: 'Message',
          description:
            response.data.error,
          onClick: () => {},
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onChange = (e) => {
    this.setState(() => ({ companyRegistration: e.target.value }));
  };

  render() {
    const { companyRegistration } = this.state;

    return (
      <Form
        name='basic'
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
        autoComplete='off'
      >
        <Form.Item
          label='Name'
          name='name'
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
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 0,
          }}
          label='Account Type'
        >
          <Radio.Group onChange={this.onChange} value={companyRegistration}>
            <Radio value={false}>Individual</Radio>
            <Radio value>Recruiter</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Company Name'
          name='company'
          rules={[
            {
              required: companyRegistration,
              message: 'Please input your company name',
            },
          ]}
        >
          <Input disabled={!companyRegistration} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 10,
          }}
        >
          <Button type='primary' htmlType='submit' style={{ background: 'grey', borderColor: 'grey' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(Registration);
