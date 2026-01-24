const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");


const CORE_URL_B64 = "aHR0cHM6Ly9naXRodWIuY29tL1JhbnNhcmFkZXduYXRoL254LWJyaWRnZS5naXQ=";

const CORE_URL = Buffer.from(CORE_URL_B64, "base64").toString("utf8");
const CORE_DIR = path.join(__dirname, "core");

async function start() {
  if (!fs.existsSync(CORE_DIR)) {
    console.log("⬇️ Downloading King RANUX PRO Core...");
    await simpleGit().clone(CORE_URL, CORE_DIR);
  }

  if (!fs.existsSync(path.join(CORE_DIR, "node_modules"))) {
    console.log("📦 Installing core dependencies...");
    execSync("npm install", { cwd: CORE_DIR, stdio: "inherit" });
  }

  console.log("🚀 Starting King RANUX PRO Bot...");
  require("./core/index.js");
}

start();