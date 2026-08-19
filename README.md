# TON Meme Freemint Bot v0.2

اسکلت قابل اجرا برای Telegram Bot + Mini App + TON Connect + Jetton scanner.

## راه‌اندازی
1. Node.js 20+ نصب کن.
2. `npm install`
3. `.env.example` را به `.env` کپی کن.
4. `BOT_TOKEN` را از BotFather بگذار.
5. `PUBLIC_APP_URL` را روی دامنه HTTPS واقعی بگذار.
6. داخل `web/tonconnect-manifest.json` همان دامنه و آیکون را تنظیم کن.
7. اگر API key تون‌سنتر داری، `TONCENTER_API_KEY` را در `.env` قرار بده؛ هرگز در frontend نگذار.
8. `npm run dev`

## مهم
این نسخه عمداً Claim خودکار یا نگهداری کلید خصوصی ندارد. تشخیص قطعی «فری‌مینت» نیازمند بررسی قرارداد/منطق claim هر پروژه است و صرفاً از روی فهرست Jettonها قابل اثبات نیست.

منبع API اسکن: TON Center API v3.
