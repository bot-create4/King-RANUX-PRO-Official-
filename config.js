/**
 * 👑 King RANUX PRO – User Configuration
 * Users are allowed to edit ONLY this file
 */

module.exports = {

  // 🔐 WhatsApp Session ID
  SESSION_ID: process.env.SESSION_ID || "e7hHSBba#V4SKDvLzGlCPbGx3biy_MhaAupipqpgAP9Y5b5sf9ek",

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
  
};
