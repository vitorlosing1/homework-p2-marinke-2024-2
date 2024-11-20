require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/dbConfig");
const mysql = require("mysql2/promise");

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.TEST_DB_NAME}`
    );
    console.log("Banco de dados criado com sucesso!");
    await connection.end();
  } catch (error) {
    console.error("Erro ao criar o banco de dados:", error.message);
    throw error;
  }
};

beforeAll(async () => {
  try {
    await initDatabase();

    await sequelize.authenticate();
    console.log("Conexão bem-sucedida!");
    await sequelize.sync({ force: true });
    console.log("Tabelas sincronizadas com sucesso!");
  } catch (error) {
    console.error(
      "Erro ao conectar ou sincronizar com o banco de dados:",
      error.message
    );
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /api/users/upload", () => {
  it("deve fazer upload de um arquivo CSV e salvar no banco", async () => {
    const filePath = "./mocks/users.csv";

    const response = await request(app)
      .post("/api/users/upload")
      .attach("file", filePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Dados processados e salvos com sucesso!"
    );
  });

  it("Deve retornar erro se nenhum arquivo for enviado", async () => {
    const response = await request(app).post("/api/users/upload");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Erro ao processar o arquivo.");
  });
});
