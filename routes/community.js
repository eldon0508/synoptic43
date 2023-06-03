var express = require('express');
var router = express.Router();
var communityController = require('../controllers/communityController');

router.get('/index', communityController.index);
router.get('/create', communityController.create);
router.post('/store', communityController.store);
router.get('/:id/edit', communityController.edit);
router.post('/:id/update', communityController.update);
router.post('/:id/destroy', communityController.destroy);

module.exports = router;