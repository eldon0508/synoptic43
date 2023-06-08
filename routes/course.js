var express = require('express');
var router = express.Router();
var courseController = require('../controllers/courseController');

router.get('/index', courseController.index);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/:id/update', courseController.update);
router.post('/:id/destroy', courseController.destroy);

module.exports = router;