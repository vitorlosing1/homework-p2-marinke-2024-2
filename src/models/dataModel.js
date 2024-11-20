const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const tableName = process.env.NODE_ENV === "test" ? "users_test" : "users";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName,
    timestamps: false,
  }
);

module.exports = User;
