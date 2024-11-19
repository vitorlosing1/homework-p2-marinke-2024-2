const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const sequelize = require("./config/dbConfig");

const app = express();

app.use(express.json());

app.use("/api/users", uploadRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");

    await sequelize.sync({ force: false });
    console.log("Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error(
      "Erro ao conectar ou sincronizar com o banco de dados:",
      error.message
    );
  }
})();

module.exports = app;
