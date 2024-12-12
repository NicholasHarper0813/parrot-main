'user strict';

const notificationRepository    = require( '../repositories/notification-repository' );
const userRepository            = require( '../repositories/user-repository' );

exports.follow = async ( req, res, next ) => {
    try 
    {
        const myId      = req.session.user.id;
        const friendId  = req.body.user_id;

        notificationRepository.create( myId, friendId, 'Seguiu você' );
        userRepository.incrementFollowedCount( friendId );
        userRepository.incrementFollowingCount( myId );
        userRepository.follow( myId, friendId );
        res.json({ status: true });
    } 
    catch (e) 
    {
        console.log(e.message);
        return res.status(500).json({ status: true });
    }

};

exports.unfollow = async ( req, res, next ) => {
    try 
    {
        const myId      = req.session.user.id;
        const friendId  = req.body.user_id;

        userRepository.unfollow( myId, friendId );
        userRepository.decrementFollowingCount( myId );
        userRepository.decrementFollowedCount( friendId );
        res.json({ status: true });
    } 
    catch (e) 
    {
        console.log(e.message);
        return res.status(500).json({ status: true });
    }
};
