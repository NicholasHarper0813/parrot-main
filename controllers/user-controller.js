'user strict';

const userRepository            = require( '../repositories/user-repository' );
const notificationRepository    = require( '../repositories/notification-repository' );

exports.follow = async ( req, res, next ) => {
    try {
        const myId      = req.session.user.id;
        const friendId  = req.body.user_id;

        notificationRepository.create( myId, friendId, 'Seguiu você' );
        userRepository.follow( myId, friendId );
        userRepository.incrementFollowedCount( friendId );
        userRepository.incrementFollowingCount( myId );

        res.json({ status: true });
    } 
    catch ( e ) 
    {
        console.log( e.message );
        return res.status(500).json({ status: true });
    }

};

exports.unfollow = async ( req, res, next ) => {
    try {
        const myId      = req.session.user.id;
        const friendId  = req.body.user_id;

        userRepository.unfollow( myId, friendId );
        userRepository.decrementFollowedCount( friendId );
        userRepository.decrementFollowingCount( myId );

        res.json({ status: true });
    } 
    catch ( e ) 
    {
        console.log( e.message );
        return res.status(500).json({ status: true });
    }
};
