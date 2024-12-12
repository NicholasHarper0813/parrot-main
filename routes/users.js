const express     = require( 'express' );
const router      = express.Router();
const auth        = require( '../middlewares/auth' );
const controller  = require( '../controllers/user-controller' );

router.post( '/follow',    auth, controller.follow );
router.post( '/unfollow',  auth, controller.unfollow );

module.exports = router;
