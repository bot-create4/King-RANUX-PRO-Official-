/**
 * 👑 King RANUX PRO – Configuration File
 * User Editable Area (Core Safe)
 * Only this file users are allowed to edit
 */

module.exports = {

  // 🔐 WhatsApp Session ID (MEGA or base64)
  SESSION_ID: process.env.SESSION_ID || "",

  // ===============================
  // 🤖 BOT MODE SYSTEM
  // public  = groups + inbox
  // group   = groups only
  // inbox   = inbox only
  // private = owner + sudo only
  // ===============================
  MODE: process.env.MODE || "public",

  // ===============================
  // 📌 STATUS AUTOMATION SYSTEM
  // (DEFAULT: OFF)
  // ===============================
  AUTO_STATUS_SEEN: false,
  AUTO_STATUS_REACT: false,
  AUTO_STATUS_FORWARD: false,

  // ===============================
  // 🛡️ ANTI DELETE SYSTEM
  // (DEFAULT: OFF)
  // ===============================
  ANTI_DELETE: false,

  // ===============================
  // ⚙️ GENERAL SETTINGS
  // ===============================
  PREFIX: process.env.PREFIX || ".",

  // ===============================
  // 🖼️ BRANDING / UI
  // ===============================
  ALIVE_IMG:
    process.env.ALIVE_IMG ||
    "https://raw.githubusercontent.com/ransara-devnath-ofc/-Bot-Accent-/refs/heads/main/King%20RANUX%20PRO%20Bot%20Images/king-ranux-pro-main-logo.png",

  // Alive Message Template
  // Used in alive.js plugin
  ALIVE_MSG: `
👑 𝐊𝐢𝐧𝐠 𝐑𝐀𝐍𝐔𝐗 ᴾʳᵒ
━━━━━━━━━━━━━━━━━━━━━━
🟢 BOT STATUS : ONLINE & ACTIVE ✨

⚡ Fast • Stable • Powerful
🧩 Advanced Plugin-Based WhatsApp Bot
🚀 Built for performance, reliability & automation

━━━━━━━━━━━━━━━━━━━━━━
📊 LIVE SYSTEM STATS

🕒 Time      : {TIME}
⏱️ Uptime    : {UPTIME}
💾 RAM Usage : {RAM}

━━━━━━━━━━━━━━━━━━━━━━
🛡️ Security  : Session Verified
📡 Connection: WhatsApp Multi-Device
⚙️ Mode      : {MODE}

━━━━━━━━━━━━━━━━━━━━━━
> 𝓜𝓡. 𝓡𝓪𝓷𝓼𝓪𝓻𝓪 𝓓𝓮𝓿𝓷𝓪𝓽𝓱
`
};