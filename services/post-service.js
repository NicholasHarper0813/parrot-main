'use strict';
const Entities = require('html-entities').XmlEntities;

exports.parseBody = ( content ) => {
    let post = content.substring(0, 240);
    const entities  = new Entities();
    
    post = entities.encode( post );
    post = post.replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    return post;
};
