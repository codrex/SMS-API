module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {},
  );
  User.associate = function associations(models) {
    User.hasMany(models.Message, {
      as: 'sentMessages',
      foreignKey: 'sentMessageId',
    });
    User.hasMany(models.Message, {
      as: 'receivedMessages',
      foreignKey: 'receivedMessageId',
    });
  };
  return User;
};
