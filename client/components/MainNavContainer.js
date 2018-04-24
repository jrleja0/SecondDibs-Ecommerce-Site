import React from 'react';
import history from '../history';
import {Link, NavLink} from 'react-router-dom';
import {Login, Signup, DrawerMainMenu} from './index';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import LoggedInAccountIcon from 'material-ui/svg-icons/action/account-box';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';
import {stylesMainNavContainer as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class MainNavContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signupOpen: false,
      drawerMenuOpen: false,
    };
    this.toggleOpenState = this.toggleOpenState.bind(this);
    this.handleGoToLink = this.handleGoToLink.bind(this);
  }

  toggleOpenState(formType) {
    return (openState) => {
      let nextOpenState = !openState;
      this.setState({[`${formType}Open`]: nextOpenState});
    };
  }

  handleGoToLink() {
    history.windowY = 0;
    history.previousPathname = history.location.pathname;
  }

  render() {
    const { children, user, handleLogOut } = this.props;
    const { loginOpen, signupOpen, drawerMenuOpen } = this.state;

    return (
      <div>
        <Toolbar
          style={styles.toolbar}
          className="main-nav-toolbar"
        >
          <ToolbarGroup>
            <h2 className="titlebar-logo titlebar-logo-large">
              <Link to="/browse"
                onClick={this.handleGoToLink}
              >
                {'< SecondDibs >'}
              </Link>
            </h2>
            <h4 className="titlebar-logo titlebar-logo-small">
              <Link to="/browse"
                onClick={this.handleGoToLink}
              >
                {'< SecondDibs >'}
              </Link>
            </h4>
          </ToolbarGroup>
          <div className="nav-buttons-large-viewport">
          { user.name ?
          (
            <ToolbarGroup>
              <ToolbarTitle
                text={`Welcome, ${user.name.split(' ')[0]}`}
                style={{color: '#c2a661'}}
              />
              <FlatButton
                label="Log Out"
                style={styles.flatButtonNoBorder}
                className="main-nav-button"
                onClick={() => {
                  this.handleGoToLink();
                  handleLogOut();
                }}
                hoverColor="transparent"
                rippleColor="yellow"
              />
              <FlatButton
                label="Cart"
                icon={<CartIcon
                  style={{fill: '#c2a661', top: '2px', position: 'relative'}}
                />}
                style={styles.flatButton}
                labelStyle={{top: '3px'}}
                className="main-nav-button"
                containerElement={<Link to="/cart" />
                  /*<NavLink to="/cart" activeClassName="cart-button-active" />*/
                }
                hoverColor="rgba(0, 0, 0, 0.4)"
                rippleColor="yellow"
                onClick={this.handleGoToLink}
              />
            </ToolbarGroup>
          )
          :
          (
            <ToolbarGroup className="toolbar">
              <div>
                <FlatButton
                  label="Log In"
                  style={styles.flatButtonNoBorder}
                  className="main-nav-button"
                  onClick={() => {
                    this.handleGoToLink();
                    this.toggleOpenState('login')(loginOpen);
                  }}
                  hoverColor="transparent"
                  rippleColor="yellow"
                />
                <span className="span-divider" />
                <FlatButton
                  label="Sign Up"
                  style={styles.flatButtonNoBorder}
                  className="main-nav-button"
                  onClick={() => {
                    this.handleGoToLink();
                    this.toggleOpenState('signup')(signupOpen);
                  }}
                  hoverColor="transparent"
                  rippleColor="yellow"
                />
              </div>
              <FlatButton
                label="Cart"
                icon={<CartIcon
                  style={{fill: '#c2a661', top: '2px', position: 'relative'}}
                />}
                style={styles.flatButton}
                labelStyle={{top: '3px'}}
                className="main-nav-button"
                containerElement={<Link to="/cart" />
                  /*<NavLink to="/cart" activeClassName="cart-button-active" />*/
                }
                hoverColor="rgba(0, 0, 0, 0.4)"
                rippleColor="yellow"
                onClick={this.handleGoToLink}
              />
            </ToolbarGroup>
          )
          }
          </div>
          <div className="nav-button-small-viewport">
            <ToolbarGroup>
              <LoggedInAccountIcon
                style={styles.loggedInAccountIcon}
                className={user.name ? 'logged-in-icon-active' : 'logged-in-icon'}
              />
              <FlatButton
                icon={<NavMenuIcon
                  style={styles.navMenuIcon}
                />}
                style={styles.navMenuIconButton}
                className="main-nav-menu-icon-button"
                onClick={() => {
                  this.toggleOpenState('drawerMenu')(drawerMenuOpen);
                }}
                hoverColor="transparent"
                rippleColor="yellow"
              />
            </ToolbarGroup>
          </div>
        </Toolbar>
        <Login
          isOpen={loginOpen}
          toggleOpenState={this.toggleOpenState('login')}
          user={user}
        />
        <Signup
          isOpen={signupOpen}
          toggleOpenState={this.toggleOpenState('signup')}
          user={user}
        />
        <DrawerMainMenu
          isOpen={drawerMenuOpen}
          toggleOpenState={this.toggleOpenState('drawerMenu')}
          handleLogOut={handleLogOut}
          handleGoToLink={this.handleGoToLink}
          loginOpen={loginOpen}
          signupOpen={signupOpen}
          toggleLogin={this.toggleOpenState('login')}
          toggleSignup={this.toggleOpenState('signup')}
          user={user}
        />
        {children}
      </div>
    );
  }
}

export default MainNavContainer;
