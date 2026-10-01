// Online-only app: never cache authenticated responses or replay writes.
const OFFLINE = `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b63a5"><title>回数券管理アプリ</title><style>body{margin:0;background:#eef3f8;color:#17202a;font-family:system-ui,sans-serif}main{max-width:380px;margin:15vh auto;padding:24px;background:white;border-radius:16px}h1{font-size:22px}p{line-height:1.8}button{background:#0b63a5;color:white;border:0;border-radius:10px;padding:14px;font-size:16px}</style><main><h1>インターネットに接続してください</h1><p>回数券の確認・登録には通信が必要です。接続を確認してから、もう一度開いてください。</p><button onclick="location.reload()">もう一度開く</button></main></html>`;
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
 const req=event.request,url=new URL(req.url);
 // Supabase, CDN requests, POSTs, and other apps on this origin pass through.
 if(req.method!=='GET'||req.mode!=='navigate'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>new Response(OFFLINE,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})));
});
