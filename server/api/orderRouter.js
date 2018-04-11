const orderRouter = require('express').Router();
const Order = require('../db/models/order');

// get user's order history //
orderRouter.get('/user/:userId/history', (req, res, next) => {
  Order.findAll({
      where: {
        userId: req.params.userId,
        submitted: true
      }
    })
    .then(orderHistory => {
      res.status(200).json(orderHistory);
    })
    .catch(next);
});

// get user's current order //
orderRouter.get('/', (req, res, next) => {
  Order.findOne({ where: {id: req.session.orderId} })
    .then(order =>
      res.status(200).json(order))
    .catch(next);
});

// add item to order -- first creates or finds current order //
orderRouter.post('/item/:itemId', (req, res, next) => {
    let currentOrder;
    Order.findOrCreate({
        where: {
          id: req.body.orderId || req.session.orderId,
          submitted: false
        }
      })
      .spread((order, ifCreated) => {
        req.session.orderId = order.id;
        if (ifCreated) {
          return order.update({
            userId: req.body.userId || req.session.userId
          });
        }
      })
      .then(order => {
        return order.addItem(req.params.itemId);
      })
      .then(updatedOrder => {
        res.status(201).json(currentOrder);
      })
      .catch(next);
});

// remove item from order //
orderRouter.delete('/item/:itemId', (req, res, next) => {
  let currentOrder;
  Order.findById(req.session.orderId)
    .then(order => {
      if (!order) res.status(404).send('Order not found');
      else {
        currentOrder = order;
        return currentOrder.removeItem(req.params.itemId);
      }
    })
    .then(result => {
      if (!result) res.status(404).send('Nothing to delete');
      else return Order.findById(currentOrder.id);
    })
    .then(updatedOrder => {
      if (!updatedOrder) res.status(404).send('Order not found');
      else return res.status(200).json(updatedOrder);
    })
    .catch(next);
});

// delete order //
orderRouter.delete('/cart/:orderId', (req, res, next) => {
  Order.destroy({ where: {id: req.params.orderId} })
    .then(result => {
      if (result) res.status(204).send('Order deleted');
      else res.status(204).send('Nothing to delete');
    })
    .catch(next);
});

// submit order //
orderRouter.put('/cart/:orderId/:userId', (req, res, next) => {
  Order.update({
      submitted: true
    }, {
      where: {id: req.params.orderId},
      returning: true
    })
    .spread((orderUpdatedCount, orderRow) => {
      if (!orderUpdatedCount) {
        res.status(404).send('Order not found');
      } else {
        const order = orderRow[0];
        req.session.orderId = null;
        res.status(200).json(order);
      }
    })
    .catch(next);
});

module.exports = orderRouter;
