import React from 'react';
import history from '../history';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchItems, fetchFavorites, addFavorite, deleteFavorite} from '../store';
import {ItemsGrid} from './index';
import {stylesBrowse as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class Browse extends React.Component {

  componentDidMount() {
    if (history.windowY) {
      window.scrollTo(0, history.windowY);
    }
  }

  render() {
    const { items, totalItems, toggleFavorite, handleLoadMoreItems } = this.props;
    return (
      <div>
        <ItemsGrid
          items={items}
          toggleFavorite={toggleFavorite}
        />
        <div style={styles.root}>
        { items && items.length ?
          <FlatButton
            className="button-load-more"
            label="Load More"
            hoverColor="#c2a661"
            rippleColor="yellow"
            style={
              !items || items.length === totalItems ?
              styles.loadMoreButtonDisabled
              : styles.loadMoreButton
            }
            onClick={() => {
              if (items && items.length) {
                handleLoadMoreItems(items.length);
              }
            }}
            disabled={!items || items.length === totalItems}
          />
          : <CircularProgress
              className="spinner"
              size={60}
              thickness={4.5}
              color="#c2a661"
              style={{margin: '20px auto'}}
            />
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
  items: state.itemStore.items,
  totalItems: state.itemStore.totalItems,
});

const mapDispatch = dispatch => ({
  handleLoadMoreItems: start => {
    dispatch(fetchItems({start}));
  },
  toggleFavorite: (favorite, key) => {
    if (favorite) {
      dispatch(deleteFavorite(key));
    } else {
      dispatch(addFavorite(key));
    }
  },
  handleFetchFavorites: () => {
    dispatch(fetchFavorites());
  },
});

export default connect(mapState, mapDispatch)(Browse);
