var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/news', homeController.newsIndex);
router.get('/courses', homeController.courseIndex);
router.get('/communities', homeController.communityIndex);

module.exports = router;