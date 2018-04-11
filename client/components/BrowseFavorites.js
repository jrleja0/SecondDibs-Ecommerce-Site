import React from 'react';
import history from '../history';
import {connect} from 'react-redux';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchFavorites, addFavorite, deleteFavorite} from '../store';
import {ItemsGrid} from './index';
import {stylesBrowseFavorites as styles} from '../styling/inlineStyles';

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
    const { items, favoriteKeys, toggleFavorite } = this.props;

    const toggleFavoriteOnFavorites = (favorite, itemKey, evt) => {
      const tileContainer = $(evt.target).closest('.tile-container');
      const toggleOpacity = favorite ? 0.3 : 1;
      const toggleFlexOrder = favorite ? 1 : 0;
      tileContainer.css('opacity', toggleOpacity);
      tileContainer.css('order', toggleFlexOrder);

      toggleFavorite(favorite, itemKey);
    };

    return (
      <div>
        <ItemsGrid
          items={items}
          favoriteKeys={favoriteKeys}
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
  items: state.favoriteStore.favoriteItems,
  favoriteKeys: state.favoriteStore.favoriteItemKeys,
});

const mapDispatch = dispatch => ({
  handleFetchFavorites: () => {
    dispatch(fetchFavorites());
  },
  toggleFavorite: (favorite, itemKey) => {
    if (favorite) {
      dispatch(deleteFavorite(itemKey));
    } else {
      dispatch(addFavorite(itemKey));
    }
  },
});

export default connect(mapState, mapDispatch)(BrowseFavorites);
