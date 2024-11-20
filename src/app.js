require("dotenv").config();
const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const sequelize = require("./config/dbConfig");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());
app.use("/api/users", uploadRoutes);

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log("Banco de dados criado com sucesso!");
    await connection.end();
  } catch (error) {
    console.error("Erro ao criar o banco de dados:", error.message);
    throw error;
  }
};

(async () => {
  try {
    await initDatabase();

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");

    await sequelize.sync({ force: true });
    console.log("Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error(
      "Erro ao conectar ou sincronizar com o banco de dados:",
      error.message
    );
  }
})();

module.exports = app;
