import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {BackToBrowseButton, ItemsTableForCart} from './index';
import {stylesCart as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const OrderHistory = (props) => {
  const {user, pastOrders} = props;

  return (
    <div>
      <AppBar
        title="Your Order History"
        iconElementLeft={<BackToBrowseButton />}
        style={{backgroundColor: 'white'}}
        titleStyle={styles.titleStyle}
      />
      <div>
      { user && user.name ?
        <h3 className="basic-subheader">
          {`Customer: ${user.name}`}
        </h3>
        : null
      }
      { pastOrders && pastOrders.length ?
        pastOrders.map(order => (
          <div key={order.id}>
            <h3 className="basic-subheader">Order Purchased on {order.formattedSubmitDate} | Ref. #SD-{order.id}</h3>
            <ItemsTableForCart
              items={order.items}
              order={order}
              isCurrentCart={false}
            />
          </div>
        ))
        :
        <h3 className="placeholder-message">
          {user && user.id ? `You haven't placed an order yet.` : 'Please log in to view order history.'}
        </h3>
      }
      </div>
    </div>
  );
};

/*///
 CONTAINER
*////
const mapState = state => ({
  user: state.userStore,
  pastOrders: state.orderStore.history,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(OrderHistory);
