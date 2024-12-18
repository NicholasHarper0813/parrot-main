const express     = require( 'express' );
const router      = express.Router();
const controller  = require( '../controllers/user-controller' );
const auth        = require( '../middlewares/auth' );

router.post( '/follow',    auth, controller.follow );
router.post( '/unfollow',  auth, controller.unfollow );

module.exports = router;
