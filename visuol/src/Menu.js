//Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

class SideMenu extends Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, borderRight: 0}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme='dark'
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Navigation</span>
            </span>
          }
        >
        <Menu.Item key="1">
            <NavLink to="/login">
                Login
            </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
            <NavLink to="/register">
                Register
            </NavLink>
        </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
};

export default SideMenu;
