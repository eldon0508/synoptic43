var express = require('express');
var router = express.Router();
var reviewController = require('../controllers/reviewController');

router.get('/index', reviewController.index);
router.get('/create', reviewController.create);
router.post('/store', reviewController.store);
router.get('/:id/edit', reviewController.edit);
router.post('/:id/update', reviewController.update);
router.post('/:id/destroy', reviewController.destroy);

module.exports = router;