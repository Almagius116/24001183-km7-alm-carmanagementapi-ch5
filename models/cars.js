"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.belongsTo(models.Users, { foreignKey: "createdBy", as: "creator" });
      Cars.belongsTo(models.Users, { foreignKey: "updatedBy", as: "updater" });
      Cars.belongsTo(models.Users, { foreignKey: "deletedBy", as: "deleter" });
    }
  }
  Cars.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
