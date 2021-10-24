//Css is used from https://ant.design/components/layout/
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login';
import Registration from './Registration';
import SideMenu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Sider width={256} className="site-layout-background">
          <SideMenu />
        </Sider>
        <Layout style={{padding: '48px 24px 24px'}}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Registration />
              </Route>
            </Switch>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
