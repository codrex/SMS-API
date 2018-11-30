const { STATUS } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      status: {
        type: DataTypes.ENUM(STATUS.READ, STATUS.UNREAD),
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {},
  );
  // Message.associate = function association(models) {
  //   Message.hasOne(models.User, { as: 'Sender', foreignKey: 'senderId' });
  //   Message.hasOne(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
  // };
  return Message;
};
