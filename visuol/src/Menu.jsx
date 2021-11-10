// Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const { SubMenu } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    const { href } = window.location;
    const lastToken = href.substring(href.lastIndexOf('/') + 1);
    this.state = { defaultSelectedKey: lastToken };
  }

  handleClick = (e) => {
    console.log('click ', e);
  };

  display = () => {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return (
        <SubMenu
          key="sub1"
          title={(
            <span>
              <span className="black">Navigation</span>
            </span>
          )}
        >
          <Menu.Item key="new-offer">
            <NavLink to="/new-offer">
              <span className="black">New Offer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="loadGraph">
            <NavLink to="/loadGraph">
              <span className="black">Display Offer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout">
            <NavLink to="/logout">
              <span className="black">Log Out</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
      );
    }
    return (
      <SubMenu
        key="sub1"
        title={(
          <span>
            <span className="black">Navigation</span>
          </span>
        )}
      >
        <Menu.Item key="login">
          <NavLink to="/login">
            <span className="black">Login</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="register">
          <NavLink to="/register">
            <span className="black">Register</span>
          </NavLink>
        </Menu.Item>
      </SubMenu>
    );
  }

  render() {
    const { defaultSelectedKey } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, borderRight: 0 }}
        defaultSelectedKeys={[defaultSelectedKey]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        {/* Menu Item keys must match the last part of their url (text behind last /) */}
        {this.display()}
      </Menu>
    );
  }
}

export default SideMenu;
