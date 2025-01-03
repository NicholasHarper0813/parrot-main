'use strict';

const userService     = require( '../services/user-service' );
const authService     = require( '../services/auth-service' );
const userRepository  = require( '../repositories/user-repository' );
const postRepository  = require( '../repositories/post-repository' );
const ImageUploader   = require( '../services/image-uploader-service' );

exports.show = async ( req, res, next ) => {
  try 
  {
    const userId          = req.params.id;
    const user            = await userRepository.oneBy( 'id', userId );
    const userPosts       = await postRepository.getPostsByUserId( userId );
    const isFollowedByMe  = await userRepository.isUserFollowedByMe( userId, req.params.id );
    const suggestions     = await userRepository.getFriendshipSuggestions( userId, 3 );

    if ( !user ) res.status( 404 ).render( 'error404' );
    else res.render( 'profile', { 
      user                : req.session.user,
      title               : user.name,
      posts               : userPosts,
      profile             : user,
      isMyFeed            : ( userId == req.session.user.id),
      bodyClass           : 'profile', 
      whoToFollow         : suggestions,
      isFollowedByMe      : isFollowedByMe,
      isUserOwnerProfile  : ( userId == req.session.user.id),        
    });
  } 
  catch (e) 
  {
    console.log(e.message);
    res.render( 'error500' );
  }
};

exports.update = async ( req, res, next ) => {
  try
  {
    req.assert( 'name',     'Nome inválido' ).isLength({ min: 3 });
    req.assert( 'username', 'Username inválido' ).isLength({ min: 3, max: 60 });
    req.assert( 'bio',      'Bio deve ter entre 3 e 160 caracteres' ).optional().isLength({ min: 3, max: 160 });
    req.assert( 'avatar',   'Avatar inválido' ).optional().isLength({min: 10});
    req.assert( 'cover',    'Capa inválido' ).optional().isLength({min: 10});

    const userId    = req.session.user.id;
    const errors    = req.validationErrors();
    const username  = userService.slugfy( req.body.username );
    
    if (errors) 
    {
      res.status( 422 ).json({ status: false, message: errors[0].msg });
      return;
    }

    const user = await userRepository.oneBy( 'username', username );
    if (user && user.id != userId) 
    {
      res.status( 422 ).json({ status: false, message: 'Username já está em uso. Escolha outro' });
      return;
    }

    const avatarName  = userId + '_avatar.png';
    const coverName   = userId + '_cover.png';
    const cover       = ImageUploader.uploadFromBinary( req.body.cover, coverName, 'public/images/covers/' );
    const avatar      = ImageUploader.uploadFromBinary( req.body.avatar, avatarName, 'public/images/avatars/' );
    const profileData = {
      name      : req.body.name,
      bio       : req.body.bio,
      username  : username
    };

    if (cover) profileData.cover    = coverName;
    if (avatar) profileData.avatar  = avatarName;

    await userRepository.update( userId, profileData );
    
    const updatedUser = await userRepository.oneBy( 'id', userId );
    authService.createSessionFor( updatedUser, req );

    res.json({ status: true, data: profileData });
  } 
  catch (e) 
  {
    console.log(e.message);
    res.status(500).json({ status: false, message: 'Erro ao atualizar seu profile.' });
  }
};
