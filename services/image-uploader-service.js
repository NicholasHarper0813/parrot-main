'use strict';
const fs = require('fs');

exports.uploadFromBinary = ( data, filename, destination ) => {
    const imageData = data ? data.replace('data:image/png;base64,', '') : '';
    const filepath  = destination + filename;
    const buffer    = Buffer.from( imageData, 'base64' );
      
    if ( imageData.length ) 
    {
        fs.writeFileSync( filepath, buffer);
        return true;
    }
    
    return false;
};
