//Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

class SideMenu extends Component {

  handleClick = e => {
    console.log('click ', e);
  };

  constructor(props) {
    super(props);
    const href = window.location.href
    const lastToken = href.substring(href.lastIndexOf('/')+1)
    this.state = {'defaultSelectedKey': lastToken, 'loggedIn': props.loggedIn}
  }

  display = () => {
    if(this.props.loggedIn) {
      return (
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Navigation</span>
            </span>
          }
        >
          <Menu.Item key="new-offer">
            <NavLink to="/new-offer">
                New Offer
            </NavLink>
          </Menu.Item>
          <Menu.Item key="loadGraph">
            <NavLink to="/loadGraph">
                Display Offer
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout">
            <NavLink to="/logout">
                Log Out
            </NavLink>
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return(
        <SubMenu
        key="sub1"
        title={
          <span>
            <span>Navigation</span>
          </span>
        }
        >
          <Menu.Item key="login">
            <NavLink to="/login">
                Login
            </NavLink>
          </Menu.Item>
          <Menu.Item key="register">
              <NavLink to="/register">
                  Register
              </NavLink>
          </Menu.Item>
        </SubMenu>
      );
    }
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, borderRight: 0}}
        defaultSelectedKeys={[this.state.defaultSelectedKey]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme='dark'
      >
        {/* Menu Item keys must match the last part of their url (text behind last /) */}
        {this.display()}
      </Menu>
    );
  }
};

export default SideMenu;
