const { Sequelize } = require("sequelize");
require("dotenv").config();

const database =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;

const sequelize = new Sequelize(
  database,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    logging: process.env.NODE_ENV !== "test",
  }
);

module.exports = sequelize;
