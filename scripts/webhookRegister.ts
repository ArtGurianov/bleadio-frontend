import "dotenv/config";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
if (!TG_BOT_TOKEN) throw new Error("Token not provided in env vars");
const APP_DOMAIN = process.env.APP_DOMAIN;
if (!APP_DOMAIN) throw new Error("App domain not provided in env vars");

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;
const WEBHOOK_URL = `${APP_DOMAIN}/api/webhook/${TG_BOT_TOKEN}`;

fetch(
  `${TELEGRAM_API_URL}/setWebhook?url=${WEBHOOK_URL}&drop_pending_updates=true`
)
  .then(() => {
    console.log("Successfully registered webhook");
  })
  .catch(() => {
    console.error("An error occured while registering webhook");
  });
