import React from 'react';
import history from '../history';
import {Link} from 'react-router-dom';
import {GridTile} from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {stylesItemsGrid as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const ItemsGrid = (props) => {
  const {items, favoriteKeys, toggleFavorite} = props;
  const itemPrice = (item) => {
    const price = item.formattedPrice || 'Price Upon Request';
    return item.sold ? `${price} - SOLD` : price;
  };

  return (
    <div className="items-grid" style={styles.root}>
      <div>
      { items && items.length ?
        items.map(item => (
          <div className="tile-container" key={item.key}>
            <GridTile
              title={itemPrice(item)}
              titleStyle={item.sold ? {color: 'red'} : {}}
              subtitle={item.title}
              actionIcon={
                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  iconStyle={{fill: '#c2a661'}}
                  checked={favoriteKeys[item.key]}
                  onCheck={(evt) => {toggleFavorite(favoriteKeys[item.key], item.key, evt);}}
                />
              }
            >
              <Link to={`/item/${item.key}`}
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
