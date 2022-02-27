// Credit to https://ant.design/components/form/
// Component for logging in
import {
  Form, Input, Button, notification,
} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from './OfferAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // sessionToken: '',
    };
  }

  finishLogin = (response) => {
    localStorage.setItem('token', response.data.session_token);
    localStorage.setItem('expiration', response.data.expiration);

    const { history, match } = this.props;
    // https://stackoverflow.com/questions/63679919/react-router-push-to-history-and-preserve-relative-path
    history.push(`${match.url.substring(0, match.url.lastIndexOf('/') + 1)}`);
    window.location.reload();
  }

  onFinish = (values) => {
    axios.post(`${BASE_URL}api_v1/login`, values).then((response) => {
      if (response.data && response.data.status === 'success') {
        this.finishLogin(response);
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

   render() {
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

export default withRouter(Login);
