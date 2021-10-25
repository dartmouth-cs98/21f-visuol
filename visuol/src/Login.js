//Credit to https://ant.design/components/form/
//Component for logging in
import { Form, Input, Button} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sessionToken : '',
    }
  }
  

  //OnFinish dictates what happens when submitting a form object
  finishLogin = (response) => {
    this.props.history.push("/home"); //TODO: do more with login
  }
  
  onFinish = (values) => {
    axios.post('http://10.132.14.205:5000/api_v1/login', values).then((response) =>
      {
        console.log(response);
        this.finishLogin(response);
      }).catch(function(error){
        console.log(error);
      });
  };

   onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          label="Email"
          name="email"
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

export default withRouter(Login);
