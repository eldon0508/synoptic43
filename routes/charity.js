var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get('/index', charityController.index);
router.get('/create', charityController.create);
router.post('/store', charityController.store);
router.get('/:id/edit', charityController.edit);
router.post('/:id/update', charityController.update);
router.post('/:id/destroy', charityController.destroy);

module.exports = router;