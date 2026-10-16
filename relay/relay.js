// Optional WebSocket relay for remote mode.
// Forwards every message from one client to all the others. It stores nothing.
//
//   cd relay && npm install
//   RELAY_TOKEN=pick-a-long-random-string npm start
//
// Then open the console with ?relay=ws://<host>:8080&token=<same token>.
'use strict';

const crypto = require('crypto');
const { WebSocketServer } = require('ws');

const PORT = Number(process.env.PORT || 8080);
const TOKEN = process.env.RELAY_TOKEN || '';

function tokenMatches(given) {
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(TOKEN);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const wss = new WebSocketServer({
  port: PORT,
  maxPayload: 1024 * 1024,
  verifyClient: ({ req }, done) => {
    if (!TOKEN) return done(true);
    const url = new URL(req.url, 'http://relay.local');
    if (tokenMatches(url.searchParams.get('token'))) return done(true);
    done(false, 401, 'Unauthorized');
  }
});

wss.on('connection', (ws, req) => {
  console.log(`client connected (${wss.clients.size} total) from ${req.socket.remoteAddress}`);
  ws.on('message', (data, isBinary) => {
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === 1) client.send(data, { binary: isBinary });
    }
  });
  ws.on('close', () => console.log(`client disconnected (${wss.clients.size} total)`));
});

console.log(`Spot the Breach relay listening on ws://0.0.0.0:${PORT}`);
if (!TOKEN) {
  console.warn('WARNING: RELAY_TOKEN is not set, so anyone who can reach this port can drive the board.');
  console.warn('         Set RELAY_TOKEN and pass the same value as ?token= in the console URL.');
}
