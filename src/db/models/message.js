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
        allowNull: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sentMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      receivedMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Message.associate = function association(models) {
    Message.belongsTo(models.User, { as: 'sender' });
    Message.belongsTo(models.User, { as: 'receiver' });
  };
  return Message;
};
