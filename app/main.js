const { app, BrowserWindow, Menu, ipcMain, net, session } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// ===== Configuración de actualizaciones =====
const SHELL_VERSION = 2;                       // versión del "programa" (no del juego)
const REMOTE = 'https://raw.githubusercontent.com/mariusIA/kage/main/';
const GAME_DIR = path.join(app.getPath('userData'), 'game');

const readJSON = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return null; } };
const cmp = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d; } return 0; };

// Copia el juego que viene con el programa a la carpeta de datos (si es más nuevo que el instalado)
function ensureGame() {
  const bundled = readJSON(path.join(__dirname, 'version.json'));
  const local = readJSON(path.join(GAME_DIR, 'version.json'));
  const has = fs.existsSync(path.join(GAME_DIR, 'index.html'));
  if (!has || !local || cmp(bundled.version, local.version) > 0) {
    fs.mkdirSync(GAME_DIR, { recursive: true });
    fs.writeFileSync(path.join(GAME_DIR, 'index.html'), fs.readFileSync(path.join(__dirname, 'index.html')));
    fs.writeFileSync(path.join(GAME_DIR, 'version.json'), JSON.stringify(bundled, null, 2));
    return bundled;
  }
  return local;
}

let win, current, pending = null;

function createWindow() {
  try { current = ensureGame(); } catch (e) { current = null; }
  win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 800, minHeight: 500,
    backgroundColor: '#000000', title: 'Kage – El camino del ninja',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true,
      backgroundThrottling: false, preload: path.join(__dirname, 'preload.js') }
  });
  Menu.setApplicationMenu(null);
  loadGame();
  win.once('ready-to-show', () => { win.show(); win.focus(); });
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  win.webContents.on('will-navigate', e => e.preventDefault());
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('did-finish-load', () => { if (pending) win.webContents.send('kage:update', pending); });
  setTimeout(checkUpdate, 2500);
}

function loadGame() {
  const f = current ? path.join(GAME_DIR, 'index.html') : path.join(__dirname, 'index.html');
  win.loadFile(f);
}

async function getJSON(url) {
  const r = await net.fetch(url + '?t=' + Date.now(), { cache: 'no-store' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function checkUpdate() {
  try {
    const remote = await getJSON(REMOTE + 'game/version.json');
    if (!remote || !remote.version || !current) return;
    if (cmp(remote.version, current.version) <= 0) return;
    if ((remote.minShell || 1) > SHELL_VERSION) {
      pending = { version: remote.version, notes: remote.notes || [], needsDownload: true, url: remote.downloadPage || 'https://github.com/mariusIA/kage' };
    } else {
      pending = { version: remote.version, notes: remote.notes || [], remote };
    }
    win.webContents.send('kage:update', { version: pending.version, notes: pending.notes, needsDownload: !!pending.needsDownload });
  } catch (e) { /* sin internet o GitHub caído: se juega con la versión actual */ }
}

// ===== Copia de la partida guardada en un archivo (además del localStorage) =====
const SAVE_FILE = path.join(app.getPath('userData'), 'partida.json');
ipcMain.on('kage:loadSave', e => { try { e.returnValue = fs.readFileSync(SAVE_FILE, 'utf8'); } catch (err) { e.returnValue = null; } });
let flushT = null;
ipcMain.on('kage:writeSave', (e, data) => {
  try { if (typeof data !== 'string' || data.length > 2e6) return; JSON.parse(data);
    const tmp = SAVE_FILE + '.tmp'; fs.writeFileSync(tmp, data); fs.renameSync(tmp, SAVE_FILE); } catch (err) {}
  clearTimeout(flushT); flushT = setTimeout(() => { try { session.defaultSession.flushStorageData(); } catch (err) {} }, 300);
});
app.on('before-quit', () => { try { session.defaultSession.flushStorageData(); } catch (err) {} });

ipcMain.handle('kage:info', () => ({ version: current ? current.version : '?', shell: SHELL_VERSION }));
ipcMain.handle('kage:apply', async () => {
  if (!pending || !pending.remote) return { ok: false, error: 'No hay actualización' };
  const rm = pending.remote;
  try {
    const r = await net.fetch(REMOTE + (rm.file || 'game/index.html') + '?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    if (rm.sha256 && sha !== rm.sha256) throw new Error('El archivo descargado no coincide (sha256)');
    if (buf.length < 1000 || !buf.slice(0, 200).toString().includes('<!DOCTYPE html')) throw new Error('Archivo no válido');
    const tmp = path.join(GAME_DIR, 'index.html.new');
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, path.join(GAME_DIR, 'index.html'));
    current = { version: rm.version, notes: rm.notes || [], sha256: sha };
    fs.writeFileSync(path.join(GAME_DIR, 'version.json'), JSON.stringify(current, null, 2));
    pending = null;
    setTimeout(loadGame, 400);
    return { ok: true, version: rm.version };
  } catch (e) { return { ok: false, error: String(e.message || e) }; }
});
ipcMain.handle('kage:open', (e, url) => { if (/^https:\/\/github\.com\/mariusIA\//.test(url)) require('electron').shell.openExternal(url); });

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
