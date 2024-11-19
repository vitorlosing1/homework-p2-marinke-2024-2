const csvService = require("../services/uploadService");

const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    await csvService.processCsv(filePath);
    res
      .status(200)
      .json({ message: "Dados processados e salvos com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao processar o arquivo.", details: error.message });
  }
};

module.exports = { uploadFile };
