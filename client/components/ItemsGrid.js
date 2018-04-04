import React from 'react';
import {Link} from 'react-router-dom';
import history from '../history';
import {GridTile} from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

/*///
 COMPONENT
*////
const ItemsGrid = (props) => {

  const {items, toggleFavorite} = props;

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
    <div className="items-grid" style={styles.root}>
      <div>
      { items && items.length ?
        items.map(item => (
          <div className="tile-container" key={item.id}>
            <GridTile
              title={item.price ? item.price.amounts.USD : 'Price Upon Request'}
              subtitle={item.title}
              actionIcon={
                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  iconStyle={{fill: '#c2a661'}}
                  checked={item.favorite}
                  onCheck={(evt) => {toggleFavorite(item.favorite, item.id, evt)}}
                />
              }
            >
              <Link to={`/item/${item.id}`}
                onClick={() => {
                  history.windowY = window.scrollY;
                  history.previousPathname = history.location.pathname;
                }}
              >
                <div className="div-img-background" />
                <img src={item.image} alt="" />
              </Link>
            </GridTile>
          </div>
        ))
        : null
      }
      </div>
    </div>
  );
};

export default ItemsGrid;
