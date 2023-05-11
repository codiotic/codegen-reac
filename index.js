const fs = require("fs");
const path = require("path");
const sliceTemplate = require("./templates/slice");
console.log(process.cwd());

let serviceName = process.argv[2];

console.log(serviceName);

const basePath = process.cwd();

serviceName = serviceName[0].toUpperCase() + serviceName.substring(1);

let sliceTemplateCpy = sliceTemplate.sliceTemplate.replaceAll(
  "__MODULE_NAME__",
  serviceName
);
sliceTemplateCpy = sliceTemplateCpy.replaceAll(
  "__SLICE_NAME__",
  serviceName.toLocaleLowerCase()
);

try {
  if (!fs.existsSync("src")) {
    fs.mkdirSync("src");
  }
} catch (err) {
  console.error(err);
}
try {
  if (!fs.existsSync("src/redux")) {
    fs.mkdirSync("src/redux");
  }
} catch (err) {
  console.error(err);
}

try {
  if (!fs.existsSync("src/redux/slices")) {
    fs.mkdirSync("src/redux/slices");
  }
} catch (err) {
  console.error(err);
}

let filePath = path.join(
  basePath,
  "src/redux/slices",
  `${serviceName}Slice.ts`
);

fs.writeFileSync(filePath, sliceTemplateCpy);
