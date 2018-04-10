module.exports = (sequelize, DataTypes) => {
  var Operator = sequelize.define('Operator', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'First name should contain only letters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    roleId: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {});
  Operator.associate = function(models) {
    // associations can be defined here
  };
  return Operator;
};
