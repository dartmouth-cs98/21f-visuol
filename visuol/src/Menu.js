//Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
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
              <span class="black">Navigation</span>
            </span>
          }
        >
          <Menu.Item key="new-offer">
            <NavLink to="/new-offer">
              <span class = "black">New Offer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="loadGraph">
            <NavLink to="/loadGraph">
              <span class="black">Display Offer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout">
            <NavLink to="/logout">
              <span class="black">Log Out</span>
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
              <span class="black">Login</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="register">
              <NavLink to="/register">
                <span class="black">Register</span>
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
