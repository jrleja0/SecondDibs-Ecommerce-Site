const orderRouter = require('express').Router();
const Promise = require('bluebird');
const Order = require('../db/models/order');
const User = require('../db/models/user');

// get query object for current order query (helper function) //
const getCurrentOrderQuery = (user, sessionOrderId) => {
  if (user) {
    return { userId: user.id, submitted: false };
  } else if (sessionOrderId) {
    return { id: sessionOrderId, submitted: false };
  } else {
    return null;
  }
};

// get user's order history //
orderRouter.get('/user/history', (req, res, next) => {
  if (!req.user) {
    res.status(200).json([]);
    return null;
  }
  Order.findAll({
      where: {
        userId: req.user.id,
        submitted: true
      }
    })
    .then(orderHistory => {
      res.status(200).json(orderHistory);
      return null;
    })
    .catch(next);
});

// get user's current order //
orderRouter.get('/', (req, res, next) => {
  const orderQuery = getCurrentOrderQuery(
    req.user,
    req.session.sessionOrderId
  );

  if (orderQuery) {
    Order.findOrCreate({ where: orderQuery })
      .spread(order => {
        req.session.orderId = order.id;
        res.status(200).json(order);
        return null;
      })
      .catch(next);
  } else {
    Order.create({submitted: false})
      .then(order => {
        req.session.sessionOrderId = order.id;
        res.status(200).json(order);
        return null;
      })
      .catch(next);
  }
});

// add item to order -- first finds or creates current order //
orderRouter.post('/item/:itemId', (req, res, next) => {
  const orderQuery = getCurrentOrderQuery(
    req.body.user || req.user,
    req.body.orderId || req.session.sessionOrderId
  );

  Order.findOrCreate({
      where: orderQuery
    })
    .spread(order => {
      req.session.orderId = order.id;
      return order.addItem(req.params.itemId);
    })
    .then(() => {
      return Order.findById(req.session.orderId);
    })
    .then((updatedOrder) => {
      res.status(201).json(updatedOrder);
      return null;
    })
    .catch(next);
});

// remove item from order //
orderRouter.delete('/item/:itemId', (req, res, next) => {
  Order.findById(req.session.orderId)
    .then(order => {
      if (!order) res.status(404).send('Order not found');
      else return order.removeItem(req.params.itemId);
    })
    .then(result => {
      if (!result) res.status(404).send('Nothing to delete');
      else return Order.findById(req.session.orderId);
    })
    .then(updatedOrder => {
      if (!updatedOrder) res.status(404).send('Order not found');
      else res.status(200).json(updatedOrder);
      return null;
    })
    .catch(next);
});

// delete order //
orderRouter.delete('/cart/:orderId', (req, res, next) => {
  Order.destroy({ where: {id: req.params.orderId} })
    .then(result => {
      if (result) res.status(204).send('Order deleted');
      else res.status(204).send('Nothing to delete');
      return null;
    })
    .catch(next);
});

// submit order //
orderRouter.put('/cart/:orderId/', (req, res, next) => {
  let order;
  const paymentInfo = req.body.token.card;
  Order.update({
      submitted: true
    }, {
      where: {id: req.params.orderId},
      returning: true
    })
    .spread((orderUpdatedCount, orderRow) => {
      if (!orderUpdatedCount) {
        res.status(404).send('Order not found');
        return null;
      } else {
        return Order.findById(orderRow[0].id);
      }
    })
    .then(updatedOrderWithItems => {
      order = updatedOrderWithItems;
      return Promise.map(order.items, (item) => {
        return item.update({sold: true});
      });
    })
    .then(() => {
      return User.update({
        billingName: paymentInfo.name,
        address: paymentInfo['address_line1'],
        city: paymentInfo['address_city'],
        state: paymentInfo['address_state'],
        zipcode: paymentInfo['address_zip'],
        country: paymentInfo['address_country'],
      }, {
        where: {id: order.userId}
      });
    })
    .then(() => {
      req.session.orderId = null;
      res.status(200).json(order);
      return null;
    })
    .catch(next);
});

module.exports = orderRouter;
