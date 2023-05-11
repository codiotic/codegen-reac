const fs = require("fs");
const path = require("path");
const serviceTemplate = require("./templates/service");
const serviceData = require("./json/service.json");

const basePath = process.cwd();

const endpointTemplate = `
__NAME__: builder.__TYPE__({
    __TYPE_TAGS__: __TAGS__,
    query: (__ARGS__: __ARG_TYPE__) => ({
      url: __URL__,
      method: "__METHOD__",
      __BODY__
    }),
  }),`;

let serviceName = serviceData.moduleName.toLowerCase();

// Endpoints
let endPoints = serviceData.endPoints.reduce((acc, ele) => {
  let endpoint = endpointTemplate.replaceAll("__NAME__", ele.name);
  endpoint = endpoint.replaceAll("__TYPE__", ele.type.toLowerCase());
  endpoint = endpoint.replaceAll(
    "__TYPE_TAGS__",
    ele.type === "QUERY" ? "providesTags" : "invalidatesTags"
  );
  endpoint = endpoint.replaceAll("__TAGS__", JSON.stringify(ele.tags));
  endpoint = endpoint.replaceAll("__ARGS__", ele.args);
  endpoint = endpoint.replaceAll("__ARG_TYPE__", ele.argTypes);
  endpoint = endpoint.replaceAll("__URL__", ele.url);
  endpoint = endpoint.replaceAll("__METHOD__", ele.method.toUpperCase());
  endpoint = endpoint.replaceAll("__BODY__", ele.args === "body" ? "body" : "");

  return acc + endpoint;
}, ``);

// Hooks
const hooks = serviceData.endPoints
  ?.map(
    (endpoint) =>
      `use${endpoint.name[0].toUpperCase() + endpoint.name.substring(1)}${
        endpoint.type === "QUERY" ? "Query" : "Mutation"
      }`
  )
  .join(" , ");

let service = serviceTemplate.serviceTemplate.replaceAll(
  "__SERVICE_NAME__",
  serviceName
);
service = service.replaceAll("__ENDPOINTS__", endPoints);
service = service.replaceAll("__HOOKS__", hooks);

try {
  if (!fs.existsSync("src")) {
    fs.mkdirSync("src");
  }
} catch (err) {
  console.error(err);
}
try {
  if (!fs.existsSync("src/service")) {
    fs.mkdirSync("src/service");
  }
} catch (err) {
  console.error(err);
}

let filePath = path.join(
  basePath,
  "src/service",
  `${serviceName[0].toUpperCase() + serviceName.substring(1)}Service.ts`
);

fs.writeFileSync(filePath, service);
