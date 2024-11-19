const fs = require("fs");
const fastCsv = require("fast-csv");
const Data = require("../models/dataModel");

const processCsv = async (filePath) => {
  const dataToInsert = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(fastCsv.parse({ headers: true }))
      .on("data", (row) => {
        dataToInsert.push(row);
      })
      .on("end", async () => {
        try {
          await Data.bulkCreate(dataToInsert);
          fs.unlinkSync(filePath);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = { processCsv };
