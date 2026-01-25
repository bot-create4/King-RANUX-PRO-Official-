/**
 * 👑 King RANUX PRO – User Configuration
 * Users are allowed to edit ONLY this file
 */

module.exports = {

  // 🔐 WhatsApp Session ID
  // (MEGA file id or base64 session)
  SESSION_ID: process.env.SESSION_ID || "nrQnzQLK#WojexO2O0VxAKBMuJ39KzOkpHId7yZCUrXM8wb7C52M",

  // ===============================
  // 🤖 BOT MODE SYSTEM
  // public  = groups + inbox
  // group   = groups only
  // inbox   = inbox only
  // private = owner + sudo only
  // ===============================
  MODE: process.env.MODE || "public",

  // ===============================
  // 📌 STATUS AUTOMATION
  // ===============================
  AUTO_STATUS_SEEN: true,
  AUTO_STATUS_REACT: false,
  AUTO_STATUS_FORWARD: false,

  // ===============================
  // 🛡️ ANTI DELETE
  // ===============================
  ANTI_DELETE: true,

  // ===============================
  // ⚙️ GENERAL
  // ===============================
  PREFIX: process.env.PREFIX || ".",

  // ===============================
  // 🎬 MOVIE PLUGIN FOOTER
  // ===============================
  MOVIE_FOOTER_TEXT: "𝓜𝓡. 𝓡𝓪𝓷𝓼𝓪𝓻𝓪 𝓓𝓮𝓿𝓷𝓪𝓽𝓱",

  // ===============================
  // 🖼️ ALIVE UI
  // ===============================
  ALIVE_IMG:
    process.env.ALIVE_IMG ||
    "https://raw.githubusercontent.com/ransara-devnath-ofc/-Bot-Accent-/refs/heads/main/King%20RANUX%20PRO%20Bot%20Images/king-ranux-pro-main-logo.png",

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
📡 Connection: WhatsApp Multi-Device
⚙️ Mode      : {MODE}

━━━━━━━━━━━━━━━━━━━━━━
> 𝓜𝓡. 𝓡𝓪𝓷𝓼𝓪𝓻𝓪 𝓓𝓮𝓿𝓷𝓪𝓽𝓱
`
};
