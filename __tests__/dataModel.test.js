const Data = require("../src/models/dataModel");
const sequelize = require("../src/config/dbConfig");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Modelo Data", () => {
  it("deve criar um registro no banco", async () => {
    const record = await Data.create({
      name: "João",
      age: 25,
      cpf: 12345678901,
    });

    expect(record.name).toBe("João");
    expect(record.age).toBe(25);
    expect(record.cpf).toBe(12345678901);
  });

  it("deve retornar erro ao criar registro sem campos obrigatórios", async () => {
    await expect(Data.create({})).rejects.toThrow();
  });
});
