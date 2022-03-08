/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// Referenced https://3x.ant.design/components/menu/, creates side menu
import { Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { myOffers, myAccount, myShared } from './OfferAPI';

const { SubMenu } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    const { href } = window.location;
    const lastToken = href.substring(href.lastIndexOf('/') + 1);
    this.state = {
      defaultSelectedKey: lastToken,
      offers: [],
      recruiterCompany: '',
      shared: [],
    };
  }

  componentDidMount() {
    const retrieved = myOffers()
      .then((response) => {
        this.setState({
          // defaultSelectedKey: this.state.defaultSelectedKey,
          offers: response,
        });
      });
    myAccount()
      .then((response) => {
        this.setState({
          recruiterCompany: response,
        });
      });
    myShared()
      .then((response) => {
        this.setState({
          shared: response,
        });
      });
    return retrieved;
  }

  display = (offers) => {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (
        <SubMenu
          key='sub1'
          title={(
            <span>
              <img src={companyLogo} alt='VisuOL' width='50%' height='50%' />
            </span>
        )}
        >
          <Menu.Item key='home'>
            <NavLink to='/21f-visuol'>
              <span className='black'>Home</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='new-offer'>
            <NavLink to='/21f-visuol/new-offer'>
              <span className='black'>New Offer</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key='offers'
            title={
                  (this.state.recruiterCompany)
                    ? <span className='black'>My Clients</span>
                    : <span className='black'>My Offers</span>
                }
          >
            {offers.map((offer) => (
              // eslint-disable-next-line no-underscore-dangle
              <Menu.Item key={`${offer.company}/${offer._id}`}>
                {/* eslint-disable-next-line no-underscore-dangle */}
                <NavLink to={`/21f-visuol/LoadGraphs/${offer.company}/${offer._id}`}>
                  <span className='black'>{offer.company}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu
            key='shared'
            title={(
              <span>
                <span className='black'>Shared With Me</span>
              </span>
            )}
          >
            {this.state.shared.map((offer) => (
              // eslint-disable-next-line no-underscore-dangle
              <Menu.Item key={`${offer.user}/${offer._id}`}>
                {/* eslint-disable-next-line no-underscore-dangle */}
                <NavLink to={`/21f-visuol/LoadGraphs/${offer.company}/${offer._id}`}>
                  <span className='black'>{offer.user}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key='compare'>
            <NavLink to='/21f-visuol/compare'>
              <span className='black'>Compare Offers</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='health'>
            <NavLink to='/21f-visuol/health'>
              <span className='black'>Health FAQ</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='logout'>
            <NavLink to='/21f-visuol/logout'>
              <span className='black'>Log Out</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
      );
    }
    return (
      <SubMenu
        key='sub1'
        title={(
          <span>
            <span className='black'>Navigation</span>
          </span>
        )}
      >
        <Menu.Item key='home'>
          <NavLink to='/21f-visuol/'>
            <span className='black'>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='login'>
          <NavLink to='/21f-visuol/login'>
            <span className='black'>Login</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='register'>
          <NavLink to='/21f-visuol/register'>
            <span className='black'>Register</span>
          </NavLink>
        </Menu.Item>
      </SubMenu>
    );
  }

  render() {
    const {
      defaultSelectedKey, offers, recruiterCompany, shared,
    } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, borderRight: 0 }}
        defaultSelectedKeys={[defaultSelectedKey]}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
      >
        {/* Menu Item keys must match the last part of their url (text behind last /) */}
        {this.display(offers, recruiterCompany, shared)}
      </Menu>
    );
  }
}

export default SideMenu;
