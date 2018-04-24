import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RemoveShoppingCartIcon from 'material-ui/svg-icons/action/remove-shopping-cart';
import StripeCheckout from 'react-stripe-checkout';
import {stripeAPITestKey} from '../../secrets';
import {removeItem, updateDeleteOrder, updateSubmitOrder} from '../store';
import {BackToBrowseButton, ItemsTableForCart} from './index';
import {stylesCart as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    this.props.submitOrder(
      this.props.currentCart.id,
      token
    );
  }

  render () {
    const { user, currentCart, removeItemFromOrder, deleteCart } = this.props;
    const cartButtonsDisabled = currentCart.items ? !currentCart.items.length : true;

    return (
      <div>
        <AppBar
          title="Your Cart"
          iconElementLeft={<BackToBrowseButton />}
          style={{backgroundColor: 'white'}}
          titleStyle={styles.titleStyle}
          iconElementRight={
            <FlatButton
              key="emptyCart"
              label="Empty"
              style={cartButtonsDisabled ? styles.emptyCartButtonDisabled : styles.flatButtonNoBorderEmptyCart}
              className={cartButtonsDisabled ? 'button-disabled' : 'cart-actions-button'}
              hoverColor="transparent"
              rippleColor={cartButtonsDisabled ? 'transparent' : 'yellow'}
              labelPosition="before"
              disabled={cartButtonsDisabled}
              onClick={() => deleteCart(currentCart.id)}
              icon={<RemoveShoppingCartIcon
                style={cartButtonsDisabled ? {fill: 'rgba(0, 0, 0, 0.4)'} : {fill: '#c2a661'}}
              />}
            />
          }
        />
        <div>
        { currentCart.items && currentCart.items.length ?
          <ItemsTableForCart
            items={currentCart.items}
            order={currentCart}
            removeItemFromOrder={removeItemFromOrder}
            isCurrentCart={true}
          />
          :
          <h3 className="placeholder-message">Your cart is empty.</h3>
        }
        </div>
        <div>
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup>
              <StripeCheckout
                token={this.onToken}
                stripeKey={stripeAPITestKey}
                name="SecondDibs" // form title
                description="Please enter your info below" // form subtitle
                image="/assets/seconddibs.png"
                ComponentClass="span"
                panelLabel="Submit Order" // label prepended to payment amount
                amount={currentCart.unformattedTotalPrice * 100} // cents
                currency="USD"
                shippingAddress
                billingAddress
                zipCode={false}
                disabled={cartButtonsDisabled}
                email={user.email}
              >
                <FlatButton
                  key="checkout"
                  label="Proceed to Checkout"
                  type="button"
                  style={cartButtonsDisabled ? styles.checkoutButtonDisabled : styles.flatButton}
                  className={cartButtonsDisabled ? 'button-disabled' : 'cart-actions-button'}
                  hoverColor={cartButtonsDisabled ? 'transparent' : 'rgba(0, 0, 0, 0.4)'}
                  rippleColor={cartButtonsDisabled ? 'transparent' : 'yellow'}
                />
              </StripeCheckout>
              <FlatButton
                key="orderHistory"
                label="View Order History"
                type="button"
                containerElement={<Link to="/order/history" />}
                style={styles.flatButtonNoBorder}
                labelStyle={{top: '4px'}}
                className="cart-actions-button"
                hoverColor="transparent"
                rippleColor="yellow"
              />
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    );
  }
}

/*///
 CONTAINER
*////
const mapState = state => ({
  user: state.userStore,
  currentCart: state.orderStore.current,
});

const mapDispatch = dispatch => ({
  removeItemFromOrder: itemId => {
    dispatch(removeItem(itemId));
  },
  deleteCart: cartId => {
    dispatch(updateDeleteOrder(cartId));
  },
  submitOrder: (cartId, token) => {
    dispatch(updateSubmitOrder(cartId, token));
  }
});

export default connect(mapState, mapDispatch)(Cart);
