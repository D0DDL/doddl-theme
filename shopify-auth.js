#!/usr/bin/env node
'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const SHOP = 'doddl-ltd.myshopify.com';
const CLIENT_ID = 'bfe9374a66542af9fccbaeafc8a455e4';
const REDIRECT_URI = 'http://localhost:3000/callback';
const PORT = 3000;
const SCOPES = [
  'read_products', 'write_products',
  'read_collections', 'write_collections',
  'read_content', 'write_content',
  'read_navigations', 'write_navigations',
  'read_metafields', 'write_metafields',
  'read_themes', 'write_themes',
].join(',');

const ENV_PATH = path.join(__dirname, '.env');

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function appendEnv(filePath, key, value) {
  let prefix = '';
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing.length > 0 && !existing.endsWith('\n')) prefix = '\n';
  }
  fs.appendFileSync(filePath, `${prefix}${key}=${value}\n`, 'utf8');
}

function openBrowser(url) {
  const platform = process.platform;
  let cmd;
  if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }
  exec(cmd, (err) => {
    if (err) {
      console.log('Could not open browser automatically. Open this URL manually:');
      console.log(url);
    }
  });
}

function exchangeCodeForToken(code, clientSecret) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      code,
    });
    const req = https.request({
      method: 'POST',
      hostname: SHOP,
      path: '/admin/oauth/access_token',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept': 'application/json',
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Token exchange failed (${res.statusCode}): ${data}`));
        }
        try {
          const parsed = JSON.parse(data);
          if (!parsed.access_token) {
            return reject(new Error(`No access_token in response: ${data}`));
          }
          resolve(parsed.access_token);
        } catch (e) {
          reject(new Error(`Could not parse token response: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function buildAuthorizeUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  });
  return `https://${SHOP}/admin/oauth/authorize?${params.toString()}`;
}

async function main() {
  const env = loadEnv(ENV_PATH);
  const clientSecret = env.SHOPIFY_CLIENT_SECRET;
  if (!clientSecret) {
    console.error('Error: SHOPIFY_CLIENT_SECRET not found in .env');
    console.error(`Expected file: ${ENV_PATH}`);
    process.exit(1);
  }

  const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
    if (reqUrl.pathname !== '/callback') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const code = reqUrl.searchParams.get('code');
    const shopParam = reqUrl.searchParams.get('shop');
    const error = reqUrl.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`OAuth error: ${error}`);
      console.error(`OAuth error: ${error}`);
      server.close();
      process.exit(1);
    }

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing authorization code');
      console.error('Missing authorization code in callback');
      server.close();
      process.exit(1);
    }

    if (shopParam && shopParam !== SHOP) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Shop mismatch');
      console.error(`Shop mismatch: expected ${SHOP}, got ${shopParam}`);
      server.close();
      process.exit(1);
    }

    try {
      const token = await exchangeCodeForToken(code, clientSecret);
      appendEnv(ENV_PATH, 'SHOPIFY_ACCESS_TOKEN', token);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!doctype html><html><body style="font-family:system-ui;padding:2rem"><h1>Authorized</h1><p>Access token saved to .env. You can close this tab.</p></body></html>');

      console.log('Success: SHOPIFY_ACCESS_TOKEN appended to .env');
      server.close(() => process.exit(0));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Token exchange failed: ${err.message}`);
      console.error(err.message);
      server.close();
      process.exit(1);
    }
  });

  server.listen(PORT, () => {
    const authorizeUrl = buildAuthorizeUrl();
    console.log(`Listening on http://localhost:${PORT}`);
    console.log('Opening Shopify authorization page in your browser...');
    console.log(authorizeUrl);
    openBrowser(authorizeUrl);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the other process and retry.`);
    } else {
      console.error(`Server error: ${err.message}`);
    }
    process.exit(1);
  });
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
