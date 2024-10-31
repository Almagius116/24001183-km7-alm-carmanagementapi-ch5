"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Cars, { foreignKey: "createdBy", as: "createdCar" });
      Users.hasMany(models.Cars, { foreignKey: "updatedBy", as: "updatedCar" });
      Users.hasMany(models.Cars, { foreignKey: "deletedBy", as: "deletedCar" });
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
