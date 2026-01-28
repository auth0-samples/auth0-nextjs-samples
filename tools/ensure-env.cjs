const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const yamlPath = path.join(__dirname, "../quickstart/quickstart-login.yaml");
const config = yaml.load(fs.readFileSync(yamlPath, "utf8"));
const envFileName = config.envSnippet?.fileName || config.defaultEnvFileName;

const envPath = path.join(__dirname, "..", envFileName);
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, "");
  console.log(`Created ${envFileName}`);
} else {
  console.log(`${envFileName} already exists`);
}
