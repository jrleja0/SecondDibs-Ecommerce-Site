import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import {stylesMainNavContainer as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const DrawerMainMenu = (props) => {
  const { user, isOpen, toggleOpenState, handleLogOut, handleGoToLink, loginOpen, signupOpen, toggleLogin, toggleSignup } = props;
  const handleDrawerClose = () => {
    toggleOpenState(isOpen);
  };
  const handleLoginOpen = () => {
    toggleLogin(loginOpen);
  };
  const handleSignupOpen = () => {
    toggleSignup(signupOpen);
  };

  return (
    <Drawer
      className="drawer-menu-container"
      containerStyle={styles.drawerMenuContainer}
      docked={false}
      width={250}
      openSecondary
      open={isOpen}
      onRequestChange={handleDrawerClose}
    >
    { user.name ?
    (
      <div>
        <h3>{`Welcome, ${user.name.split(' ')[0]}`}</h3>
        <Divider style={styles.divider} />
        <MenuItem
          style={styles.menuItem}
          className="drawer-menu-item"
          onClick={() => {
            handleGoToLink();
            handleLogOut();
            handleDrawerClose();
          }}
        >Log Out
        </MenuItem>
        <Divider style={styles.divider} />
        <MenuItem
          style={styles.menuItem}
          className="drawer-menu-item"
          onClick={() => {
            handleGoToLink();
            handleDrawerClose();
          }}
          containerElement={<Link to="/cart" />
            /*<NavLink to="/cart" activeClassName="drawer-menu-item-active" />*/
          }
          rightIcon={
            <CartIcon style={{fill: '#c2a661'}} />
          }
        >Cart
        </MenuItem>
      </div>
    )
    :
    (
      <div>
        <h3>Welcome</h3>
        <Divider style={styles.divider} />
        <MenuItem
          style={styles.menuItem}
          className="drawer-menu-item"
          onClick={() => {
            handleGoToLink();
            handleDrawerClose();
            handleLoginOpen();
          }}
        >Log In
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          className="drawer-menu-item"
          onClick={() => {
            handleGoToLink();
            handleDrawerClose();
            handleSignupOpen();
          }}
        >Sign Up
        </MenuItem>
        <Divider style={styles.divider} />
        <MenuItem
          style={styles.menuItem}
          className="drawer-menu-item"
          onClick={() => {
            handleGoToLink();
            handleDrawerClose();
          }}
          containerElement={<Link to="/cart" />
            /*<NavLink to="/cart" activeClassName="drawer-menu-item-active" />*/
          }
          rightIcon={
            <CartIcon style={{fill: '#c2a661'}} />
          }
        >Cart
        </MenuItem>
      </div>
    )
    }
    </Drawer>
  );
};

export default DrawerMainMenu;
