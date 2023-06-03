var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsController');

router.get('/index', newsController.index);
router.get('/create', newsController.create);
router.post('/store', newsController.store);
router.get('/:id/edit', newsController.edit);
router.post('/:id/update', newsController.update);
router.post('/:id/destroy', newsController.destroy);

module.exports = router;