const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Data = sequelize.define("Data", {
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
});

module.exports = Data;
