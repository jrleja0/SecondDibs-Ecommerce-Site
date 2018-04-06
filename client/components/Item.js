import React, {Component} from 'react';
import history from '../history';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchItem, addFavorite, deleteFavorite} from '../store';
import {stylesItem as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class Item extends Component {

  componentDidMount() {
    const { loadItem, match } = this.props;
    loadItem(match.params.key);
  }

  render() {
    const { item, match, toggleFavorite } = this.props;
    const itemLoaded = item.key === match.params.key;

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
          iconElementLeft={
            <FlatButton
              label="Browse"
              secondary={true}
              icon={
                <NavigationChevronLeft
                  style={styles.navbarChevronLeft}
                />
              }
              style={styles.backButton}
              labelStyle={styles.backButtonLabel}
              className="button-back-to-browse"
              hoverColor="#c2a661"
              rippleColor="yellow"
              onClick={() => {
                switch (history.previousPathname) {
                  case '/browse/favorites':
                    history.push('/browse/favorites');
                    break;
                  case '/browse/search':
                    history.push('/browse/search');
                    break;
                  default:
                    history.push('/browse');
                }
              }}
            />
          }
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
                          checked={item.favorite}
                          onCheck={() => toggleFavorite(item.favorite, item.key)}
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
                            className="title-price"
                          >{item.priceUSD || 'Price Upon Request'}
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
                      <FlatButton
                        label="Purchase"
                        style={styles.flatButton}
                        onClick={() => alert('You selected "Purchase".')}
                        className="button-purchase"
                        hoverColor="#c2a661"
                        rippleColor="yellow"
                      />
                      <FlatButton
                        label="Make Offer"
                        style={styles.flatButton}
                        onClick={() => alert('You selected "Make Offer".')}
                        className="button-make-offer"
                        hoverColor="#c2a661"
                        rippleColor="yellow"
                      />
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
});

const mapDispatch = dispatch => ({
  loadItem: key => {
    dispatch(fetchItem(key));
  },
  toggleFavorite: (favorite, key) => {
    if (favorite) {
      dispatch(deleteFavorite(key));
    } else {
      dispatch(addFavorite(key));
    }
  },
});

export default connect(mapState, mapDispatch)(Item);
