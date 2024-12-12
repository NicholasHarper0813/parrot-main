'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});

  Post.associate = function(models) 
  {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return Post;
};
