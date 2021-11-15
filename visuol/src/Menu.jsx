// Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { myOffers } from './OfferAPI';

const { SubMenu } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    const { href } = window.location;
    const lastToken = href.substring(href.lastIndexOf('/') + 1);
    this.state = { 
      defaultSelectedKey: lastToken,
      offers: []
     };
  }

  handleClick = (e) => {
    console.log('click ', e);
  };

  componentDidMount() {
    const retrieved = myOffers()
    .then(response => {
      this.setState({
        defaultSelectedKey: this.state.defaultSelectedKey,
        offers: response
      })
    });
    return retrieved
  };

  display = (offers) => {
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
          <SubMenu key="offers" title={<span className="black">My Offers</span>}>
            {offers.map(offer => (
              <Menu.Item key={offer.company}>
                <NavLink to="/loadGraph">
                  <span className="black">{offer.company}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
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
    const { defaultSelectedKey, offers } = this.state;
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
        {this.display(offers)}
      </Menu>
    );
  }
}

export default SideMenu;
