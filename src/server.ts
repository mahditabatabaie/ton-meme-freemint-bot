import 'dotenv/config';
import express from 'express';
import { Telegraf, Markup } from 'telegraf';
import path from 'node:path';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is missing');
const app = express();
const bot = new Telegraf(token);
const port = Number(process.env.PORT ?? 3000);
const publicAppUrl = process.env.PUBLIC_APP_URL;
const apiKey = process.env.TONCENTER_API_KEY;
const network = process.env.TON_NETWORK === 'testnet' ? 'testnet' : 'mainnet';
const base = network === 'testnet' ? 'https://testnet.toncenter.com/api/v3' : 'https://toncenter.com/api/v3';
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'web')));

bot.start(async ctx => {
  if (!publicAppUrl) return ctx.reply('PUBLIC_APP_URL تنظیم نشده است.');
  return ctx.reply('فری‌مینت TON: کیف پول را فقط با TON Connect وصل کن. Seed Phrase لازم نیست.',
    Markup.inlineKeyboard([Markup.button.webApp('🔗 اتصال Tonkeeper', publicAppUrl)]));
});
bot.command('help', ctx => ctx.reply('هشدار: Seed Phrase یا Private Key را هرگز وارد نکن. هیچ Claim خودکاری بدون تأیید تراکنش در کیف پول انجام نمی‌شود.'));

app.get('/health', (_req,res)=>res.json({ok:true,network}));

app.get('/api/jettons', async (_req,res) => {
  try {
    const url = new URL(base + '/jetton/masters');
    url.searchParams.set('limit','20');
    url.searchParams.set('offset','0');
    const r = await fetch(url, {headers: apiKey ? {'X-API-Key':apiKey} : {}});
    if (!r.ok) return res.status(r.status).json({error:'TON Center request failed'});
    const data:any = await r.json();
    res.json(data);
  } catch { res.status(500).json({error:'Scanner unavailable'}); }
});

bot.launch().then(()=>console.log('Telegram bot started'));
app.listen(port,()=>console.log(`Web app listening on ${port}`));
process.once('SIGINT',()=>bot.stop('SIGINT'));
process.once('SIGTERM',()=>bot.stop('SIGTERM'));
