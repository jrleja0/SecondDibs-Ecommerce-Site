const router = require('express').Router();
module.exports = router;

router.use('/browse', require('./browseRouter'));
router.use('/favorite', require('./favoriteRouter'));
router.use('/item', require('./itemRouter'));
router.use('/order', require('./orderRouter'));
router.use('/search', require('./searchRouter'));
router.use('/user', require('./userRouter'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
