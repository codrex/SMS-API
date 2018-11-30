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
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
    },
    {},
  );
  User.associate = function (models) {};
  return User;
};
