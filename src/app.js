const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const sequelize = require("./config/dbConfig");

const app = express();

app.use(express.json());

app.use("/api", uploadRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

module.exports = app;
