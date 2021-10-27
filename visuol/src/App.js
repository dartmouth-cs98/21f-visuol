//Css is used from https://ant.design/components/layout/
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import SideMenu from './Menu';
import NewOfferForm from './NewOfferForm';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import LoadGraphs from './LoadGraphs'
const { Sider, Content } = Layout;
const App = () => {
  const history = useHistory();
  return (
    <BrowserRouter history={history}>
      <Layout>
        <Layout style={{height:"100vh"}}>
          <Sider style={{backgroundColor: '#C1DE9C'}} width={256} className="site-layout-background">
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
                <Route path="/loadGraph">
                  <LoadGraphs/>
                  </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/new-offer">
                  <NewOfferForm/>
                </Route>
              </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
