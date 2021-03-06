import React from 'react';
import history from '../history';
import {NavLink} from 'react-router-dom';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {stylesBrowseContainer as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const BrowseContainer = (props) => {
  const { children } = props;
  const handleScrollUp = () => {
    history.windowY = 0;
  };

  return (
    <div>
      <div>
        <Toolbar
          style={styles.toolbar}
        >
          <ToolbarGroup
            style={{width: '100%'}}
          >
            <NavLink to="/browse"
              exact={true}
              className="browse-route-link"
              activeClassName="button-active-route"
              style={{flex: 1}}
              onClick={handleScrollUp}
            >
              <FlatButton
                label="Browse"
                style={styles.flatButton}
                icon={<HomeIcon
                  style={{fill: '#c2a661'}}
                />}
                className="button-route-browse"
                data-name="browse"
                hoverColor="transparent"
                rippleColor="#c2a661"
              />
            </NavLink>
            <span style={{borderLeft: '2px solid #c2a661', height: '100%'}} />
            <NavLink to="/browse/favorites"
              className="browse-route-link"
              activeClassName="button-active-route"
              style={{flex: 1}}
              onClick={handleScrollUp}
            >
              <FlatButton
                label="Favorites"
                style={styles.flatButton}
                icon={<FavoriteIcon
                  style={{fill: '#c2a661'}}
                />}
                className="button-route-favorites"
                data-name="favorites"
                hoverColor="transparent"
                rippleColor="#c2a661"
              />
            </NavLink>
            <span style={{borderLeft: '2px solid #c2a661', height: '100%'}} />
            <NavLink to="/browse/search"
              className="browse-route-link"
              activeClassName="button-active-route"
              style={{flex: 1}}
              onClick={handleScrollUp}
            >
              <FlatButton
                label="Search"
                style={styles.flatButton}
                icon={<SearchIcon
                  style={{fill: '#c2a661'}}
                />}
                className="button-route-search"
                data-name="search"
                hoverColor="transparent"
                rippleColor="#c2a661"
              />
            </NavLink>
          </ToolbarGroup>
        </Toolbar>
      </div>
      {children}
    </div>
  );
};

export default BrowseContainer;
