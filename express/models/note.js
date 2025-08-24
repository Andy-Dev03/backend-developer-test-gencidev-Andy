"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Note.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Title is required",
          },
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Content is required",
          },
          notEmpty: {
            args: true,
            msg: "Content is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "User is required",
          },
          notEmpty: {
            args: true,
            msg: "User is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
