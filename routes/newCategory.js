var express = require('express');
var router = express.Router();
var newsCategoryController = require('../controllers/newsCategoryController');

router.get('/index', newsCategoryController.index);
router.get('/create', newsCategoryController.create);
router.post('/store', newsCategoryController.store);
router.get('/:id/edit', newsCategoryController.edit);
router.post('/:id/update', newsCategoryController.update);
router.post('/:id/destroy', newsCategoryController.destroy);

module.exports = router;