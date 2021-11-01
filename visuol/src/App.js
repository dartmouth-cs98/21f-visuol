//Css is used from https://ant.design/components/layout/
import './App.css';
import 'antd/dist/antd.css';
import SideMenu from './Menu';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from './Routes';
const { Sider, Content } = Layout;
const App = () => {
  const history = useHistory();

  return (
    <BrowserRouter history={history}>
      <Layout>
        <Layout style={{height:"100vh"}}>
          <Sider style={{backgroundColor: 'black'}} width={256} className="site-layout-background">
            <SideMenu loggedIn={"token" in localStorage && localStorage.getItem("expiration") > Date.now()/1000}/>
          </Sider>
          <Content style={{padding: '48px 24px 24px'}}>
            <Routes loggedIn={"token" in localStorage && localStorage.getItem("expiration") > Date.now()/1000} />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
