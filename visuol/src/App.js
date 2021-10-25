//Css is used from https://ant.design/components/layout/
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import SideMenu from './Menu';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
const App = () => {
  const history = useHistory();
  return (
    <BrowserRouter history={history}>
      <Layout>
        <Layout style={{height:"100vh"}}>
          <Sider style={{backgroundColor: 'black'}} width={256} className="site-layout-background">
            <SideMenu />
          </Sider>
          <Content style={{padding: '48px 24px 24px'}}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
              </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
