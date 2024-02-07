const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/sign_up',userController.user_sign_up_get);
router.post('/sign_up',userController.user_sign_up_post);

module.exports = router;
