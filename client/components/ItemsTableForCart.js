import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ContentClearIcon from 'material-ui/svg-icons/content/clear';
import {stylesCart as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const ItemsTableForCart = (props) => {
  const { items, order, removeItemFromOrder, isCurrentCart } = props;

  return (
    <Table className="cart-table">
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn
            style={styles.imageColumn}
            className="item-image-column"
          >
            <h4 className="cart-item-header-small">Item</h4>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={styles.itemNameColumn}
            className="item-name-column"
          >
            <h4 className="cart-item-header-large">Item</h4>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={styles.itemPriceColumn}
            className="item-price-column"
          >
            <h4>Price</h4>
          </TableHeaderColumn>
          <TableHeaderColumn
            style={styles.removeItemColumn}
            className="remove-item-column"
          />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      { items.map(item => (
        <TableRow key={item.key}>
          <TableRowColumn
            style={styles.imageColumn}
            className="item-image-column"
          >
            <img src={item.image} width="100px" alt="" />
          </TableRowColumn>
          <TableRowColumn
            style={styles.itemNameColumn}
            className="item-name-column"
          >
            <h4>{item.title}</h4>
          </TableRowColumn>
          <TableRowColumn
            style={styles.itemPriceColumn}
            className="item-price-column"
          >
            <h4>{item.formattedPriceWithCents}</h4>
          </TableRowColumn>
          <TableRowColumn
            style={styles.removeItemColumn}
            className="remove-item-column"
          >
          { isCurrentCart &&
            <FlatButton
              key="removeItem"
              style={styles.flatButtonNoBorder}
              className="remove-item-button"
              hoverColor="transparent"
              rippleColor="yellow"
              onClick={() => removeItemFromOrder(item.id)}
              icon={<ContentClearIcon
                style={{fill: null}}
              />}
            />
          }
          </TableRowColumn>
        </TableRow>
        ))
      }
      </TableBody>
      <TableFooter adjustForCheckbox={false}>
        <TableRow>
          <TableRowColumn
            style={styles.imageColumn}
            className="item-image-column"
          />
          <TableRowColumn
            style={styles.itemNameColumn}
            className="item-name-column"
          />
          <TableRowColumn
            style={styles.itemPriceColumn}
            className="item-price-column"
          >
            <h4>Total: {order.formattedTotalPrice}</h4>
          </TableRowColumn>
          <TableRowColumn
            style={styles.removeItemColumn}
            className="remove-item-column"
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ItemsTableForCart;
