const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { detect } = require("detect-port");
const { spawn } = require("child_process");

// Read the YAML config to get the env file name
const yamlPath = path.join(__dirname, "../quickstart", "quickstart-login.yaml");
const quickstartConfig = yaml.load(fs.readFileSync(yamlPath, "utf8"));
const envFileName = quickstartConfig.envSnippet?.fileName || ".env.local";

require("dotenv").config({ path: path.join(__dirname, "..", envFileName) });

// Parse --port from command line args
function getPortArg() {
  const portIndex = process.argv.indexOf('--port');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    return process.argv[portIndex + 1];
  }
  return null;
}

const PORT = getPortArg() || 3000;

const portNum = parseInt(PORT, 10);
if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
  console.error(`Invalid PORT: ${PORT}. Must be a number between 1 and 65535.`);
  process.exit(1);
}

detect(portNum)
  .then((port) => {
    if (port !== portNum) {
      console.error(`
❌ The port ${portNum} that is configured in Auth0 is currently in use.

To resolve this issue:
1. Free up port ${portNum} by stopping the application using it, OR
2. Configure URLs with a new port in your Auth0 application settings:
   - Allowed Callback URLs
   - Allowed Logout URLs
   Then update the PORT environment variable accordingly
`);
      process.exit(1);
    }
    console.log(`✅ Port ${portNum} is available.`);

    // Start Next.js dev server
    const child = spawn("next", ["dev", "-p", String(portNum)], {
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      process.exit(code);
    });
  })
  .catch((err) => {
    console.error("Error checking port availability:", err);
    process.exit(1);
  });
