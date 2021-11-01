// Credit to https://ant.design/components/form/
// Component for logging out
import { Form, Button } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  onFinish = () => { // (values) => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
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
           wrapperCol={{
             offset: 8,
             span: 10,
           }}
         >
           <Button type="primary" htmlType="submit">
             Log Out
           </Button>
         </Form.Item>
       </Form>
     );
   }
}

export default withRouter(Logout);
