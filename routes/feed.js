const express       = require( 'express' );
const router        = express.Router();
const controller    = require( '../controllers/feed-controller' );
const auth          = require( '../middlewares/auth' );

router.get( '/',    auth, controller.index );
router.post( '/',   auth, controller.create );

module.exports = router;
