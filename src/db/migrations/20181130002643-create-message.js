module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sentMessageId: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    receivedMessageId: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Messages'),
};
