import React from 'react';
import {connect} from 'react-redux';
import history from './history';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { MainNavContainer, BrowseContainer, Browse, BrowseFavorites, BrowseSearch, Item, Cart, OrderSuccessPage, OrderErrorPage, OrderHistory } from './components';
import {fetchItems, me, fetchFavorites, fetchCurrentOrder, fetchOrderHistory, logOut} from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*///
 COMPONENT
*////
class App extends React.Component {

  componentDidMount() {
    return Promise.all([
      this.props.loadInitialItems(),
      this.props.loadUserData(),
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.props.user) {
      if (nextProps.user.id !== this.props.user.id) {
        this.props.loadUserData();
      }
    }
    if (history.location.pathname === '/order/success') {
      this.props.getOrderHistory();
    }
  }

  render() {
    const { user, handleLogOut } = this.props;

    return (
      <MuiThemeProvider>
        <MainNavContainer user={user} handleLogOut={handleLogOut} >
          <Switch>
            <Route path="/item/:key" component={Item}
              handleBackToBrowseButton={this.handleBackToBrowseButton}
            />
            <Route path="/cart" component={Cart}
              handleBackToBrowseButton={this.handleBackToBrowseButton}
            />
            <Route path="/order/success" component={OrderSuccessPage} />
            <Route path="/order/unsuccessful" component={OrderErrorPage} />
            <Route path="/order/history" component={OrderHistory} />
            <BrowseContainer>
              <Switch>
                <Route path="/browse" exact component={Browse} />
                <Route path="/browse/favorites" component={BrowseFavorites} />
                <Route path="/browse/search" component={BrowseSearch} />
                <Redirect to="/browse" />
              </Switch>
            </BrowseContainer>
          </Switch>
        </MainNavContainer>
      </MuiThemeProvider>
    );
  }
}

/*///
 CONTAINER
*////
const mapState = state => ({
  user: state.userStore,
});

const mapDispatch = dispatch => ({
  loadUserData: () =>
    Promise.all([
      dispatch(me()),
      dispatch(fetchFavorites()),
      dispatch(fetchCurrentOrder()),
      dispatch(fetchOrderHistory()),
    ]),
  loadInitialItems: () =>
    dispatch(fetchItems({start: 0})),
  getOrderHistory: () =>
    dispatch(fetchOrderHistory()),
  handleLogOut: () =>
    dispatch(logOut()),
});

export default withRouter(connect(mapState, mapDispatch)(App));
