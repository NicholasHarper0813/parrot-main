const express     = require('express');
const router      = express.Router();
const noauth      = require('../middlewares/noauth');
const auth        = require('../middlewares/auth');
const controller  = require( '../controllers/auth-controller' );

router.get( '/',        noauth, controller.loginForm );
router.post( '/',       noauth, controller.login );
router.get( '/logout',  auth,   controller.logout );

module.exports = router;
