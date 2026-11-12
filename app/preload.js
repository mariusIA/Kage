const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('kageUpdater', {
  info: () => ipcRenderer.invoke('kage:info'),
  apply: () => ipcRenderer.invoke('kage:apply'),
  open: url => ipcRenderer.invoke('kage:open', url),
  loadSave: () => ipcRenderer.sendSync('kage:loadSave'),
  writeSave: data => ipcRenderer.send('kage:writeSave', data),
  onUpdate: cb => ipcRenderer.on('kage:update', (e, d) => cb(d))
});
