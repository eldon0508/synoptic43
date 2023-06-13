var express = require('express');
var router = express.Router();
var courseController = require('../controllers/courseController');

router.get('/index', courseController.index); //index
router.get('/create', courseController.create); //create, GET
router.post('/store', courseController.store); //store, POST
router.get('/:id/edit', courseController.edit); //edit, GET
router.post('/:id/update', courseController.update); //update, POST
router.post('/:id/destroy', courseController.destroy); //destroy, POST

module.exports = router;