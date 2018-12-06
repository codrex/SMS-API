const { STATUS } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATUS.UNREAD,
      },

      sentMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receivedMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Message.associate = function association(models) {
    Message.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'sentMessageId',
    });
    Message.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receivedMessageId',
    });
  };
  return Message;
};
