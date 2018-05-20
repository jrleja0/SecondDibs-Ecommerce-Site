import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchItem, addFavorite, deleteFavorite, addItem} from '../store';
import {BackToBrowseButton} from './index';
import {stylesItem as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class Item extends React.Component {

  componentDidMount() {
    const { loadItem, match } = this.props;
    loadItem(match.params.key);
  }

  render() {
    const { item, match, favoriteKeys, toggleFavorite, itemsInCart, addItemToCart } = this.props;
    const itemLoaded = (item.key === match.params.key);
    const itemInCart = itemsInCart && !!itemsInCart.find((cartItem => cartItem.key === item.key));
    const itemPrice = (item) => {
      const price = item.formattedPrice || 'Price Upon Request';
      return item.sold ? `${price} - SOLD` : price;
    };
    const addToCartButtonClassName = (function() {
      if (itemInCart) {
        return 'item-in-cart-button';
      } else if (item.sold || !item.formattedPrice) {
        return 'item-action-button-disabled';
      } else {
        return 'item-action-button';
      }
    }());
    const makeOfferButtonClassName = (function() {
      if (itemInCart || item.sold) {
        return 'item-action-button-disabled';
      } else {
        return 'item-action-button';
      }
    }());

    return (
      item ?
      <div>
        <AppBar
          title={
            itemLoaded ?
            <img
              src={(item.sellerLogo && 'https://a.1stdibscdn.com' + item.sellerLogo)
              || (item.sellerCompany)}
              alt={item.sellerCompany}
            />
            : null
          }
          iconElementLeft={<BackToBrowseButton />}
          style={{backgroundColor: 'white'}}
          titleStyle={styles.titleStyle}
          className="item-navbar"
        />
        <div className="flex-grid card-container-outer">
          <div className="col-1">
            <div className="flex-grid-column">
              <div className="card-container-image">
                <Card
                  style={{height: '100%'}}
                >
                { itemLoaded ?
                  <div>
                    <CardHeader
                      children={
                        <Checkbox
                          className="favorite-checkbox"
                          checkedIcon={<ActionFavorite />}
                          uncheckedIcon={<ActionFavoriteBorder />}
                          iconStyle={{fill: '#c2a661'}}
                          checked={favoriteKeys[item.key]}
                          onCheck={() => toggleFavorite(favoriteKeys[item.key], item.key)}
                        />
                      }
                    />
                    <CardMedia>
                      <img src={item.image} alt="" />
                    </CardMedia>
                    <CardText />
                  </div>
                : <div
                    style={{height: '500px', display: 'flex'}}
                  >
                    <CircularProgress
                      className="spinner"
                      size={80}
                      thickness={4.5}
                      color="#c2a661"
                      style={{margin: 'auto', marginTop: '180px'}}
                    />
                  </div>
                }
                </Card>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="flex-grid-column">
              <div className="card-container">
                <Card>
                { itemLoaded ?
                  <div>
                    <CardTitle
                      title={
                        <span>
                          {item.title}
                          <br />
                          <span
                            className={item.sold ? 'title-price-sold' : 'title-price'}
                          >{itemPrice(item)}
                          </span>
                        </span>
                      }
                      className="card-title"
                    />
                    <CardText
                      style={{paddingTop: 0}}
                    >
                      <span className="description-measurements">
                        <b>Measurements:</b>
                        <br />
                        {item.measurements}
                      </span>
                    </CardText>
                    <CardActions style={{display: 'flex'}}>
                      <div className={addToCartButtonClassName + '-container'}>
                        <FlatButton
                          label={itemInCart ? 'Item Added To Cart' : 'Add To Cart'}
                          onClick={() => addItemToCart(item.id)}
                          style={styles.flatButton}
                          className={addToCartButtonClassName}
                          data-name="addToCart"
                          rippleColor="yellow"
                          disabled={itemInCart || !item.formattedPrice || item.sold}
                        />
                      </div>
                      <div className={makeOfferButtonClassName + '-container'}>
                        <FlatButton
                          label="Make Offer"
                          onClick={() => alert('Thanks for your interest. We regret this service is not yet available. Please check back soon.')}
                          style={styles.flatButton}
                          className={makeOfferButtonClassName}
                          data-name="makeOffer"
                          rippleColor="yellow"
                          disabled={itemInCart || item.sold}
                        />
                      </div>
                    </CardActions>
                  </div>
                  : <div
                      style={{height: '200px'}}
                    />
                }
                </Card>
              </div>
              <div className="card-container-description">
                <Card
                  style={{height: '100%'}}
                >
                { itemLoaded ?
                  <div>
                    <CardText>
                      <p className="p-item-description">
                        {item.description}
                      </p>
                      {item.creators &&
                      <p><b>Creator:</b> {item.creators}</p>
                      }
                    </CardText>
                  </div>
                  : <div
                      style={{height: '200px'}}
                    />
                }
                </Card>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="flex-grid-column">
              <div className="card-container-col3">
                <Card
                  style={{height: '100%'}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      : null
    );
  }
}

/*///
 CONTAINER
*////
const mapState = state => ({
  item: state.itemStore.item,
  favoriteKeys: state.favoriteStore.favoriteItemKeys,
  itemsInCart: state.orderStore.current.items,
});

const mapDispatch = dispatch => ({
  loadItem: itemKey => {
    dispatch(fetchItem(itemKey));
  },
  toggleFavorite: (favorite, itemKey) => {
    if (favorite) {
      dispatch(deleteFavorite(itemKey));
    } else {
      dispatch(addFavorite(itemKey));
    }
  },
  addItemToCart: itemKey => {
    dispatch(addItem(itemKey));
  },
});

export default connect(mapState, mapDispatch)(Item);
