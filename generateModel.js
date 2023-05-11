const fs = require("fs");
const path = require("path");
const modelData = require("./json/model.json");
const JsonToTS = require("json-to-ts");

const basePath = process.cwd();

let modelName = process.argv[2];

try {
  if (!fs.existsSync("src")) {
    fs.mkdirSync("src");
  }
} catch (err) {
  console.error(err);
}

try {
  if (!fs.existsSync("src/models")) {
    fs.mkdirSync("src/models");
  }
} catch (err) {
  console.error(err);
}

let filePath = path.join(
  basePath,
  "src/models",
  `${modelName[0].toUpperCase() + modelName.substring(1)}.model.ts`
);

let result = "";
JsonToTS(modelData)
  .reverse()
  .forEach((typeInterface, index) => {
    result += "\n" + " " + typeInterface;
  });

fs.writeFileSync(
  filePath,
  result.replaceAll(
    "RootObject",
    modelName[0].toUpperCase() + modelName.substring(1) + "ResponseType"
  )
);
