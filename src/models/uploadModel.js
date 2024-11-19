const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Data = sequelize.define("Data", {
  name: { type: DataTypes.STRING },
  age: { type: DataTypes.TINYINT },
  cpf: { type: DataTypes.BIGINT },
});

module.exports = Data;
