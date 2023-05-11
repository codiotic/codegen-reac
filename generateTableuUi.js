const fs = require("fs");
const path = require("path");
const { tableUiTemplate } = require("./templates/table/ui");

const basePath = process.cwd();

const getCapitalizedword = (word) => {
  return word[0].toUpperCase() + word?.substring(1);
};

const moduleName = getCapitalizedword(process.argv[2]);
const sliceName = process.argv[2].toLowerCase();

let table = tableUiTemplate.replaceAll("__MODULE_NAME__", moduleName);
table = table.replaceAll("__SLICE_NAME__", sliceName);

try {
  if (!fs.existsSync("src")) {
    fs.mkdirSync("src");
  }
} catch (err) {
  console.error(err);
}

try {
  if (!fs.existsSync("src/screens")) {
    fs.mkdirSync("src/screens");
  }
} catch (err) {
  console.error(err);
}

try {
  if (!fs.existsSync(`src/screens/${moduleName}`)) {
    fs.mkdirSync(`src/screens/${moduleName}`);
  }
} catch (err) {
  console.error(err);
}

try {
  if (!fs.existsSync(`src/screens/${moduleName}/List`)) {
    fs.mkdirSync(`src/screens/${moduleName}/List`);
  }
} catch (err) {
  console.error(err);
}

let filePath = path.join(
  basePath,
  `src/screens/${moduleName}/List`,
  `${moduleName}Listing.tsx`
);

fs.writeFileSync(filePath, table);
