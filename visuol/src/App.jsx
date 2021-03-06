// Css is used from https://ant.design/components/layout/
import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import SideMenu from './Menu';
import Routes from './Routes';

const { Sider, Content } = Layout;
const App = () => {
  const history = useHistory();

  return (
    <BrowserRouter history={history}>
      <Layout>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ backgroundColor: '#C1DE9C' }} width={256} className='site-layout-background'>
            <SideMenu loggedIn={'token' in localStorage && localStorage.getItem('expiration') > Date.now() / 1000} />
          </Sider>
          <Content style={{ padding: '48px 24px 24px' }}>
            <Routes loggedIn={'token' in localStorage && localStorage.getItem('expiration') > Date.now() / 1000} />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
