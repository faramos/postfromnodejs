const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs/promises");
const https = require("https");

const fileName = "sample.tiff";
const unitId = "611c44482c44395f56cdeba2";
const apiKey = "?";
const url =
  "	https://app-hub-shared-dev-southcentralus-001.azurewebsites.net/Functions/UserDefined/TestMultipartPost/FromForm";

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

fs.readFile(`./${fileName}`)
  .then((buffer) => {
    const formData = new FormData();
    formData.append("k1", "hey");
    formData.append("sample", buffer, fileName);

    instance
      .post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": apiKey,
          "unit-id": unitId,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  })
  .catch((error) => error);
