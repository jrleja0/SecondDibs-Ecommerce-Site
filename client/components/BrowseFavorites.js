import React from 'react';
import history from '../history';
import {connect} from 'react-redux';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchFavorites, addFavorite, deleteFavorite} from '../store';
import {ItemsGrid} from './index';

/*///
 COMPONENT
*////
class BrowseFavorites extends React.Component {

  componentDidMount() {
    if (history.windowY) {
      window.scrollTo(0, history.windowY);
    }
    if (history.location.pathname === '/browse/favorites') {
      this.props.handleFetchFavorites();
    }
  }

  render() {

    const { items, toggleFavorite } = this.props;

    const toggleFavoriteOnFavorites = (favorite, id, evt) => {
      const tileContainer = $(evt.target).closest('.tile-container');
      const toggleOpacity = favorite ? 0.3 : 1;
      const toggleFlexOrder = favorite ? 1 : 0;
      tileContainer.css('opacity', toggleOpacity);
      tileContainer.css('order', toggleFlexOrder);

      toggleFavorite(favorite, id);
    };

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'relative',
      },
    };

    return (
      <div>
        <ItemsGrid
          items={items}
          toggleFavorite={toggleFavoriteOnFavorites}
        />
        <div style={styles.root}>
        { items && items.length === 0 &&
          <h3> Your favorites will display here. </h3>
        }
        { !items ?
          <CircularProgress
            className="spinner"
            size={60}
            thickness={4.5}
            color="#c2a661"
            style={{margin: '20px auto'}}
          />
          : null
        }
        </div>
      </div>
    );
  }
}

/*///
 CONTAINER
*////

const mapState = state => ({
  items: state.itemStore.favoriteItems,
});

const mapDispatch = dispatch => ({
  toggleFavorite: (favorite, id) => {
    if (favorite) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  },
  handleFetchFavorites: () => {
    dispatch(fetchFavorites());
  },
});

export default connect(mapState, mapDispatch)(BrowseFavorites);
