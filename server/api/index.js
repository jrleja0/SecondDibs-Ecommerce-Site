const router = require('express').Router();
module.exports = router;

router.use('/browse', require('./browseRouter'));
router.use('/item', require('./itemRouter'));
router.use('/search', require('./searchRouter'));
router.use('/session', require('./sessionRouter'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
